import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface notificationProps {
  onCancel?: () => void;
  amount: number | undefined;
}

function Notification({ onCancel, amount }: notificationProps) {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleTopup = async () => {
    try {
      const topUpResponse = await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/topup",
        {
          top_up_amount: amount,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      if (topUpResponse.status == 200) {
        setSuccess(true);
      } else {
        setError(false);
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  const handleClose = () => {
    setError(false);
    setSuccess(false);
    navigate("/");
  };

  // Convert amount to IDR
  const IdrAmount = amount
    ?.toLocaleString("id-ID", { style: "currency", currency: "IDR" })
    .replace(/,00$/, "");

  const confirm = (
    <div className=" w-[300px] h-[300px]fit bg-white p-[34px] rounded-sm flex flex-col justify-center items-center gap-[22px]">
      <img className="w-[50px]" src="/images/Logo.png" alt="" />
      <div className="gap-[4px] flex flex-col justify-center items-center">
        <p className="text-[16px]">Anda yakin untuk Top Up sebesar</p>
        <p className="font-extrabold text-[20px]">{IdrAmount} ?</p>
      </div>
      <button
        className="font-bold text-[#F42619] cursor-pointer"
        onClick={handleTopup}
      >
        Ya, lanjutkan Topup
      </button>
      <button
        className="font-bold text-gray-400 cursor-pointer"
        onClick={onCancel}
      >
        Batalkan
      </button>
    </div>
  );

  const berhasil = (
    <div className=" w-[300px] h-[300px] bg-white p-[34px] rounded-sm flex flex-col justify-center items-center gap-[22px]">
      <img className="w-[50px]" src="/images/Check.png" alt="" />
      <div className="gap-[4px] flex flex-col justify-center items-center">
        <p className="text-[16px]">Top Up sebesar</p>
        <p className="font-extrabold text-[20px]">{IdrAmount} ?</p>
        <p className="text-[16px]">Berhasil!</p>
      </div>
      <button
        className="font-bold text-[#F42619] cursor-pointer"
        onClick={handleClose}
      >
        Kembali ke beranda
      </button>
    </div>
  );

  const gagal = (
    <div className=" w-[300px] h-[300px] bg-white p-[34px] rounded-sm flex flex-col justify-center items-center gap-[22px]">
      <img className="w-[50px]" src="/images/Failed.png" alt="" />
      <div className="gap-[4px] flex flex-col justify-center items-center">
        <p className="text-[16px]">Top Up sebesar</p>
        <p className="font-extrabold text-[20px]">{IdrAmount}</p>
        <p className="text-[16px]">Gagal</p>
      </div>
      <button
        className="font-bold text-[#F42619] cursor-pointer"
        onClick={handleClose}
      >
        Kembali ke beranda
      </button>
    </div>
  );

  return (
    <>
      <div className="fixed z-50 inset-0 w-screen h-screen flex justify-center items-center bg-black/[30%]">
        {success ? berhasil : error ? gagal : confirm}
      </div>
    </>
  );
}

export default Notification;
