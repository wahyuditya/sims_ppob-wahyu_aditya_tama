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
  const [limit, setLimit] = useState(2);
  const [offset, setOffset] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // const fetchTransactionHistory = async (limit: number, offset: number) => {
  //   try {
  //     const transactionHistoryResponse = await axios(
  //       "https://take-home-test-api.nutech-integrasi.com/transaction/history",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
  //         },
  //         params: {
  //           limit: 2,
  //           offset: 0,
  //         },
  //       }
  //     );

  //     const transactionHistoryResponseData =
  //       transactionHistoryResponse.data.data.records;
  //     console.log(transactionHistoryResponseData);

  //     setTransactions((prevTransactions) => [
  //       ...prevTransactions,
  //       ...transactionHistoryResponseData,
  //     ]);
  //   } catch (error: any) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchTransactionHistory(limit, 0);
  // }, []);

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const transactionHistoryResponse = await axios(
          "https://take-home-test-api.nutech-integrasi.com/transaction/history",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            params: {
              limit: 5,
              offset: 0,
            },
          }
        );

        const transactionHistoryResponseData =
          transactionHistoryResponse.data.data.records;
        console.log(transactionHistoryResponseData);
      } catch (e: any) {
        console.log("error");
      }
    };

    fetchTransactionHistory();
  }, []);

  return (
    <>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            <div className="flex w-full border-1 border-gray-300 py-[8px] px-[18px] rounded-sm">
              <div className="w-full">
                <p className="text-[20px] font-bold">
                  <span>+ </span>
                  {transaction.total_amount}
                </p>
                <div className="text-[14px] text-gray-400 flex gap-[8px]">
                  <p>{transaction.created_on}</p>
                </div>
              </div>

              <div className="w-full">
                <p className=" text-right text-[14px]">
                  {transaction.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default transactionHistory;
