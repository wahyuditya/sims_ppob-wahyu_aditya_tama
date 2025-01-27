import { FiEye } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

function UserInfo() {
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

  return (
    <>
      <div className="flex w-full py-[18px]">
        <div className="w-full">
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
            {balance?.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </p>
          <div className="flex items-center gap-[8px]">
            <p>Lihat Saldo</p>
            <FiEye className="cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserInfo;
