import { Link, NavLink, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const menuItems = [
    { name: "Top Up", path: "/topup" },
    { name: "Transaction", path: "/transaction" },
    { name: "Akun", path: "/akun" },
  ];

  return (
    <>
      <div className="flex w-full justify-center items-center border-b-1 border-gray-300 px-[100px] h-[80px]">
        <div className="w-full">
          <Link to="/" className="flex w-full items-center gap-[8px]">
            <img src="src/assets/images/Logo.png" alt="" />
            <h1 className="font-extrabold">SIMS PPOB</h1>
          </Link>
        </div>
        <nav className="flex gap-[18px] justify-end items-center w-full ">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={`font-bold ${
                location.pathname === item.path
                  ? "text-[#F42619]"
                  : "hover:text-[#F42619]"
              }`}
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
