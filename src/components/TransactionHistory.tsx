import axios from "axios";
import { useEffect, useState } from "react";

interface Transaction {
  id: string;
  total_amount: number;
  invoice_number: number;
  created_on: string;
  description: string;
  transaction_type: string;
}

function transactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);

  const fetchTransactionHistory = async () => {
    try {
      const transactionHistoryResponse = await axios(
        "https://take-home-test-api.nutech-integrasi.com/transaction/history",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
          params: {
            limit: limit,
            offset: offset,
          },
        }
      );

      const transactionHistoryResponseData =
        transactionHistoryResponse.data.data.records;

      setTransactions(transactionHistoryResponseData);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransactionHistory();
  }, [offset]);

  const handleShowMore = () => {
    const tempOffset = offset + 1;
    setOffset(tempOffset);
  };

  // Convert amount to IDR
  const IdrAmount = (amount: number) => {
    const convert = amount
      ?.toLocaleString("id-ID", { style: "currency", currency: "IDR" })
      .replace(/,00$/, "");

    return convert;
  };

  // Convert Date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString("id-ID", { month: "long" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  return (
    <>
      <ul className="flex flex-col gap-[24px]">
        {transactions.map((transaction, index) => (
          <li key={index}>
            <div className="flex w-full border-1 border-gray-300 py-[8px] px-[18px] rounded-sm">
              <div className="w-full">
                {transaction.transaction_type === "TOPUP" ? (
                  <p className="text-[20px] text-green-600 font-extrabold">
                    <span>+ </span>
                    {IdrAmount(transaction.total_amount)}
                  </p>
                ) : (
                  <p className="text-[20px] font-extrabold text-red-600">
                    <span>- </span>
                    {IdrAmount(transaction.total_amount)}
                  </p>
                )}

                <div className="text-[14px] text-gray-300 flex gap-[18px]">
                  <p>{formatDate(transaction.created_on)}</p>
                  <p>{formatTime(transaction.created_on)} WIB</p>
                </div>
              </div>

              <div className="w-full">
                <p className=" text-right text-[14px] text-gray-500 font-bold">
                  {transaction.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <p className="mb-[100px] cursor-pointer text-center text-[#F42619] hover:text-[#f42819f3] text-[16px] font-bold">
        <button onClick={handleShowMore} className="cursor-pointer">
          Show more
        </button>
      </p>
    </>
  );
}

export default transactionHistory;
