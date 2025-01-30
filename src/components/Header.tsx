import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { name: "Top Up", path: "/topup" },
    { name: "Transaction", path: "/transaction" },
    { name: "Akun", path: "/akun" },
  ];

  return (
    <>
      <div className="flex w-full justify-center items-center border-b-1 border-gray-300 px-[100px] h-[80px] max-md:px-[18px]">
        <div className="w-full ">
          <Link to="/" className="flex w-full items-center gap-[8px]">
            <img src="/images/Logo.png" alt="" />
            <h1 className="font-extrabold">SIMS PPOB</h1>
          </Link>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <nav
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } flex-col md:flex md:flex-row gap-[18px] justify-end items-center w-full md:w-full absolute md:relative top-[80px] md:top-0 left-0 md:left-auto bg-white md:bg-transparent p-4 md:p-0 z-50`}
        >
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={`font-bold ${
                location.pathname === item.path
                  ? "text-[#F42619]"
                  : "hover:text-[#F42619]"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}

export default Header;
