import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "../pages/Home/home.tsx";
import Navbar from "../components/user/navbar.tsx";
import Footer from "../components/user/footer.tsx";
import Login from "../pages/Login.tsx"
import { AuthProvider } from "@/context/AuthProvider.tsx";
// import { ToastContainer } from 'react-toastify';

function AppRouter() {
  return (
    <AuthProvider>
     <BrowserRouter>
      <Navbar />
      <div className="container mt-2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
      {/* <ToastContainer position="bottom-right" /> */}
    </BrowserRouter>

    </AuthProvider>
  );
}

export default AppRouter;
