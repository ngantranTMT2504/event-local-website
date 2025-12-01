import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../ui/mode-toggle";
import logo from "/images/logo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "@/context/authContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen(!open);
  const auth = useContext(AuthContext);

  return (
    <nav className="bg-background border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex gap-2 text-xl font-bold text-primary">
            <img src={logo} className="h-[1.5rem]"></img>
            CTevent
          </div>
          <div className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="text-muted-foreground font-medium hover:text-primary transition"
            >
              Trang chủ
            </Link>
            <a
              href="#"
              className="text-muted-foreground font-medium hover:text-primary transition "
            >
              Sự kiện
            </a>
            <a
              href="#"
              className="text-muted-foreground font-medium hover:text-primary transition"
            >
              Yêu thích
            </a>
            <a
              href="#"
              className="text-muted-foreground font-medium hover:text-primary transition"
            >
              Liên hệ
            </a>
          </div>

          <div className="hidden md:flex gap-4">
          <div className="flex items-center">
            <ModeToggle></ModeToggle>
          </div>
            {auth?.isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link to="/create-event" className="hover:underline">
                  Đăng bài
                </Link>
                <Button onClick={auth.logout} variant="default">
                  Đăng xuất
                </Button>
              </div>
            ) : (
              <>
                <Link
                  to="/"
                  className="w-full text-primary underline-offset-4 hover:underline inline-flex items-center justify-center"
                >
                  Đăng ký
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap rounded-md text-base font-medium transition-colors bg-primary text-primary-foreground hover:bg-red-600 hover:shadow-md h-9 px-4 py-2"
                >
                  Đăng nhập
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {open ? <X size="24" /> : <Menu size="24" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden bg-white border-t border-gray-100 flex flex-col items-start px-4 py-3 space-y-2 transition-all duration-300",
          open ? "block" : "hidden"
        )}
      >
        <Link
          to="/"
          className="block text-muted-foreground font-medium hover:text-primary w-full"
        >
          Trang chủ
        </Link>
        <a
          href="#"
          className="block text-muted-foreground font-medium hover:text-primary w-full"
        >
          Sự kiện
        </a>
        <a
          href="#"
          className="block text-muted-foreground font-medium hover:text-primary w-full"
        >
          Yêu thích
        </a>
        <a
          href="#"
          className="block text-muted-foreground font-medium hover:text-primary w-full"
        >
          Liên hệ
        </a>

        <div>
          {auth?.isAuthenticated ? (
            <>
              <Link to="/create-event" className="hover:underline">
                Đăng bài
              </Link>
              <Button onClick={auth.logout} variant="default">
                Đăng xuất
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="w-full text-primary underline-offset-4 hover:underline inline-flex items-center justify-center"
              >
                Đăng ký
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap rounded-md text-base font-medium transition-colors bg-primary text-primary-foreground hover:bg-red-600 hover:shadow-md h-9 px-4 py-2"
              >
                Đăng nhập
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
