import { MdOutlineMoney } from "react-icons/md";
import Input from "../components/Input";
import UserInfo from "../components/UserInfo";
import Button from "../components/Button";
import NominalCard from "../components/NominalCard";
import { FormEvent, FormEventHandler, useState } from "react";
import axios from "axios";
import Popup from "../components/Popup";

function Topup() {
  const [nominal, setNominal] = useState<number | undefined>(undefined);
  const [nominalError, setNominalError] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [isConfirming, setIsConfirming] = useState(false);

  const [showPopup, setShowPopup] = useState(false);

  const handleTopup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nominal === undefined || nominal <= 0 || nominal >= 1000000) {
      setNominalError(
        "Nominal harus lebih dari Rp. 0 dan maksimal Rp. 1.000.000"
      );
      return;
    }
  };
  // Allow only numbers and set nominal
  const handleNominalChange = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    setNominal(numericValue ? parseInt(numericValue, 10) : undefined);
  };

  return (
    <>
      <div className=" flex px-[100px] flex-col gap-[68px] my-[20px]">
        <UserInfo />

        <div className="flex flex-col gap-[20px]">
          <form onSubmit={handleTopup}>
            <p className="text-[20px]">Silahkan masukan</p>
            <p className="text-[32px] font-extrabold">Nominal Top Up</p>

            <div className="flex gap-[20px]">
              <div className=" flex flex-col gap-[20px] w-full">
                <Input
                  leadingIcon={<MdOutlineMoney />}
                  type="text"
                  label="Masukan nominal top up"
                  value={nominal !== undefined ? nominal.toString() : ""}
                  onChange={(e) => handleNominalChange(e.target.value)}
                  error={!!nominalError}
                  feedback={nominalError}
                />
                <Button lable="Top Up" type="submit" disabled={!nominal} />
              </div>

              <div className="flex w-[800px] flex-col gap-[20px]">
                <div className="flex gap-[20px] w-full ">
                  <NominalCard label="RP 10.000" />
                  <NominalCard label="RP 20.000" />
                  <NominalCard label="RP 50.000" />
                </div>
                <div className="flex gap-[20px] w-full ">
                  <NominalCard label="RP 100.000" />
                  <NominalCard label="RP 250.000" />
                  <NominalCard label="RP 500.000" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Topup;
