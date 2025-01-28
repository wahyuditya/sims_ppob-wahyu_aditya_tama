import { MdOutlineMoney } from "react-icons/md";
import Input from "../components/Input";
import UserInfo from "../components/UserInfo";
import Button from "../components/Button";
import Notification from "../components/Notification";
import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

function Pembayaran() {
  const [notification, setNotification] = useState(false);

  const service_name = useSelector(
    (state: RootState) => state.selectedService.service_name
  );
  const service_icon = useSelector(
    (state: RootState) => state.selectedService.service_icon
  );
  const service_tariff = useSelector(
    (state: RootState) => state.selectedService.service_tariff
  );

  const service_code = useSelector(
    (state: RootState) => state.selectedService.service_code
  );

  const handlePembayaran = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setNotification(true);
  };

  return (
    <>
      <div className="flex px-[100px] flex-col gap-[68px] my-[20px]">
        <UserInfo />

        <div className="flex flex-col gap-[20px]">
          <p className="text-[20px] font-bold">Pembayaran</p>
          <div className="flex gap-[20px] justify-start items-center">
            <img src={service_icon ?? ""} alt="" />
            <p className="text-[20px] font-extrabold">{service_name}</p>
          </div>
          <form
            className="flex flex-col gap-[24px]"
            onSubmit={handlePembayaran}
          >
            <Input
              leadingIcon={<MdOutlineMoney />}
              label={""}
              value={service_tariff ?? ""}
              type={"text"}
              disabled
            />
            <Button lable="Bayar" onClick={() => handlePembayaran} />
          </form>
        </div>
      </div>

      {notification && (
        <Notification
          service_name={service_name ?? undefined}
          amount={service_tariff ?? undefined}
          onCancel={() => setNotification(false)}
          service_code={service_code ?? undefined}
        />
      )}
    </>
  );
}

export default Pembayaran;
