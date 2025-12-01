import { Facebook, Github, Heart, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "/images/logo.png";

const footer = () => {
  return (
    <div className="bg-background py-5 px-4 sm:px-6 lg:px-8  w-full mt-5 border-t border-gray-200">
      <div className="grid lg:grid-cols-5 grid-cols-3 gr gap-5 max-w-7xl py-5 mx-auto">
        <div className="col-span-2">
          <div className="flex gap-2 text-xl font-bold text-primary">
            <img src={logo} className="h-[1.5rem]"></img>
            CTevent
          </div>
          <p className="mt-3 text-muted-foreground">
            Nơi tìm kiếm các sự kiện và lễ hội tại Việt Nam.
          </p>
        </div>
        <div className="discover">
          <h3 className="text-primary text-base mb-2 font-bold">Khám phá</h3>
          <ul className="flex flex-col">
            <li className="mb-2">
              <Link
                to="#"
                className="text-muted-foreground font-medium hover:text-primary transition"
              >
                Sự kiện
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="#"
                className="text-muted-foreground font-medium hover:text-primary transition"
              >
                Yêu thích
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="#"
                className="text-muted-foreground font-medium hover:text-primary transition"
              >
                Thể loại
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="#"
                className="text-muted-foreground font-medium hover:text-primary transition"
              >
                Thành phố
              </Link>
            </li>
          </ul>
        </div>
        <div className="discover">
          <h3 className="text-primary text-base mb-2 font-bold">Trợ giúp</h3>
          <ul className="flex flex-col">
            <li className="mb-2">
              <Link
                to="#"
                className="text-muted-foreground font-medium hover:text-primary transition"
              >
                Trợ giúp
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="#"
                className="text-muted-foreground font-medium hover:text-primary transition"
              >
                FAQs
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="#"
                className="text-muted-foreground font-medium hover:text-primary transition"
              >
                Chính Sách
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="#"
                className="text-muted-foreground font-medium hover:text-primary transition"
              >
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>
        <div className="">
          <h3 className="text-primary text-base mb-2 font-bold">Follow chúng tôi</h3>
          <ul className="flex gap-5">
            <li className="border-1 border-primary p-2 rounded-[50%] transition">
              <a href="#">
                <Facebook />
              </a>
            </li>
            <li className="border-1 border-primary p-2 rounded-[50%]">
              <a href="#" className="">
                <Linkedin />
              </a>
            </li>
            <li className="border-1 border-primary p-2 rounded-[50%]">
              <a href="#">
                <Github />
              </a>
            </li>
            <li className="border-1 border-primary p-2 rounded-[50%]">
              <a href="#">
                <Youtube />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr className="text-gray-100 font-bold"></hr>
      <div className="flex justify-between items-center py-3">
        <p className="text-muted-foreground ">© 2025 CTevent</p>
        <p className="flex items-center space-x-2 gap-2 text-muted-foreground ">Made <Heart size={16}></Heart> by Tran Ngan</p>
      </div>
    </div>
  );
};

export default footer;
