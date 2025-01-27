import TransactionHistory from "../components/TransactionHistory";
import UserInfo from "../components/UserInfo";

function Transaction() {
  return (
    <>
      <div className=" flex px-[100px] flex-col gap-[68px] my-[20px]">
        <UserInfo />

        <div className="flex flex-col gap-[20px]">
          <p className="text-[20px] font-bold">Semua Transaksi</p>

          <TransactionHistory />
        </div>
      </div>
    </>
  );
}

export default Transaction;
