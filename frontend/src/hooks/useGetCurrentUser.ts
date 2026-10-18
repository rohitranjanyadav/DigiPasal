import api from "@/utils/axios";
import { useEffect } from "react";

export const useGetCurrentUser = () => {
  useEffect(() => {
    const fetchUser = async () => {
      const response = await api.get("/api/me");

      if (!response.data.success) {
        return;
      }

      console.log(response.data);
    };
    fetchUser();
  }, []);
};
