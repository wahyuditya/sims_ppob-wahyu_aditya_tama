function transactionHistory() {
  return (
    <>
      <div className="flex w-full border-1 border-gray-300 py-[8px] px-[18px] rounded-sm">
        <div className="w-full">
          <p className="text-[20px] text-green-400 font-bold">
            <span>+ </span>Rp.10.000
          </p>
          <div className="text-[14px] text-gray-400 flex gap-[8px]">
            <p>17 agustus 2023</p>
            <p>12:30</p>
          </div>
        </div>
        <div className="w-full">
          <p className=" text-right text-[14px]">Top Up Saldo</p>
        </div>
      </div>
    </>
  );
}

export default transactionHistory;
