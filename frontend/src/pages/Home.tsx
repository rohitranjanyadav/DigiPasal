import { Button } from "@/components/ui/button";
import logo from "../assets/logo.png";
import { useState } from "react";
import { X, Menu, LogOut } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/utils/firebase";
import api from "@/utils/axios";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { logoutUser, setUser } from "@/redux/userSlice";

function Home() {
  const [openMenu, setOpenMenu] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { user } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();

  const googleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const token = await result.user?.getIdToken();

      const response = await api.post("/api/auth/login", { token });

      dispatch(setUser(response.data.user));
      setModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await api.get("/api/auth/logout");

      if (response.data.success) {
        dispatch(logoutUser());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt=""
              className="h-6 w-6 rounded-sm object-contain"
            />
            <span className="text-lg font-semibold tracking-tight">
              DigiPasal
            </span>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-indigo-100 text-xs font-medium text-indigo-600">
                      {user?.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-slate-700">
                    {user?.name}
                  </span>
                </div>
                <Button
                  onClick={handleLogout}
                  className="gap-1.5 "
                  variant="outline"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setModalOpen(!modalOpen)}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                SignIn
              </Button>
            )}
          </div>

          <button className="md:hidden " onClick={() => setOpenMenu(!openMenu)}>
            {openMenu ? (
              <X className="h-6 w-6 " />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {openMenu && (
          <div className="flex flex-col gap-4 border-t border-slate-100 px-4 py-4 sm:px-6 md:hidden">
            {user ? (
              <>
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-indigo-100 text-xs font-medium text-indigo-600">
                      {user?.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-slate-700">
                    {user?.name}
                  </span>
                </div>
                <Button
                  onClick={handleLogout}
                  className="gap-1.5 w-full"
                  variant="outline"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setModalOpen(!modalOpen)}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >
                SignIn
              </Button>
            )}
          </div>
        )}
      </header>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader className="items-center text-center">
            <img
              src={logo}
              alt="logo"
              className="h-10 w-10 rounded-md object-contain"
            />
            <DialogTitle className="mt-2 text-lg font-semibold">
              DigiPasal
            </DialogTitle>
          </DialogHeader>
          <Button
            onClick={googleAuth}
            variant="outline"
            className="mt-2 w-full gap-2"
          >
            <FcGoogle className="w-4 h-4 " />
            Continue with Google
          </Button>
          <p className="mt-4 text-center text-xs text-slate-400 ">
            Secure authentication by Firebase
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Home;
