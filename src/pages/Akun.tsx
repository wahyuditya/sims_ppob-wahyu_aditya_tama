import { HiPencil } from "react-icons/hi";
import Input from "../components/Input";
import Button from "../components/Button";
import { FiAtSign } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

function Akun() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    dispatch(logout());

    navigate("/login");
  };

  return (
    <>
      <div className="flex px-[300px] flex-col gap-[68px] my-[8px]">
        <div className="flex justify-center items-center flex-col gap-[8px]">
          <div className="relative inline-block">
            <img
              src="images/Profile-Photo.png"
              alt="Profile"
              className="w-36 h-36 rounded-full"
            />
            <div className="absolute rounded-full border-1 bottom-0 right-0 bg-white p-1">
              <HiPencil />
            </div>
          </div>
          <div>
            <p className="text-[32px] font-extrabold">Kristatnto Wibowo</p>
          </div>
        </div>
        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[8px]">
            <p>Email</p>
            <Input
              label=""
              type="text"
              leadingIcon={<FiAtSign />}
              disabled
              value="walet@nutech.com"
            />
          </div>

          <div className="flex flex-col gap-[8px]">
            <p>Nama Depan</p>
            <Input
              label=""
              type="text"
              leadingIcon={<FaRegUser />}
              disabled
              value="Kristanto"
            />
          </div>

          <div className="flex flex-col gap-[8px]">
            <p>Nama Belakang</p>
            <Input
              label="Aditya Tama"
              type="text"
              leadingIcon={<FaRegUser />}
              disabled
              value="Wibowo"
            />
          </div>
          <div className="flex flex-col gap-[28px]">
            <Button lable="Edit" secondary />
            <Button lable="Logout" onClick={handleLogout} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Akun;
