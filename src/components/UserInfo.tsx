import { FiEye, FiEyeOff } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useState } from "react";

function UserInfo() {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const first_name = useSelector(
    (state: RootState) => state.auth.user?.firstName
  );
  const last_name = useSelector(
    (state: RootState) => state.auth.user?.lastName
  );
  const profileImage = useSelector(
    (state: RootState) => state.auth.user?.profilePhoto
  );

  const balance = useSelector((state: RootState) => state.auth?.balance);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  return (
    <>
      <div className="flex w-full py-[18px] max-md:flex-col max-md:gap-[18px]">
        <div className="w-full flex flex-col gap-[8px] max-md:justify-center max-md:items-center max-md:text-center">
          <img
            className="w-[100px]"
            src={profileImage ?? ""}
            alt="Profile photo"
          />
          <p className="text-[20px]">Selamat datang,</p>
          <h1 className="text-[32px] font-extrabold">{`${first_name} ${last_name}`}</h1>
        </div>

        <div className=" flex flex-col gap-[8px] justify-center rounded-[28px] text-white p-[30px] w-full h-full bg-[url(src/assets/images/Background%20Saldo.png)] bg-cover bg-no-repeat">
          <p className="text-[20px]">Saldo anda</p>
          <p className="text-[32px] font-medium">
            {isBalanceVisible
              ? balance?.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })
              : " Rp ******"}
          </p>
          <div className="flex items-center gap-[8px]">
            <p>{isBalanceVisible ? "Sembunyikan Saldo" : "Lihat Saldo"}</p>
            {isBalanceVisible ? (
              <FiEyeOff
                className="cursor-pointer"
                onClick={toggleBalanceVisibility}
              />
            ) : (
              <FiEye
                className="cursor-pointer"
                onClick={toggleBalanceVisibility}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserInfo;
