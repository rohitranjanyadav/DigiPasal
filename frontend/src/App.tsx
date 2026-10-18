import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { useGetCurrentUser } from "./hooks/useGetCurrentUser";

function App() {
  useGetCurrentUser();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
