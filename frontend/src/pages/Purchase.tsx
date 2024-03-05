import { Button } from "antd";
import CurrentBalanceCard from "../components/card-balance/CurrentBalanceCard";
import { BalanceType } from "./types/balance-type";
import FloatInput from "../components/float-input/FloatInput";
import { ChangeEvent, useState } from "react";
import { createTransaction } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useMessage } from "../context/MessageContext";
import { getErrorMessage } from "../helpers/helpers";

const Purchase = () => {
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const navigate = useNavigate();
  const [description, setDescription] = useState<string>("");
  const { showMessage } = useMessage();

  const dispatchData = async () => {
    try {
      const payload = {
        amount: parseFloat(amount),
        description: description,
        date: date,
        type: 'debit' as BalanceType
      }
      const response = await createTransaction(payload);

      if (!response) throw new Error("Error to create purchase");

      navigate('/');
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      showMessage(errorMessage, 'error');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;

    if (id === "amount") setAmount(value);
    if (id === "date") setDate(value);
    if (id === "description") setDescription(value);
  };

  return (
    <>
      <CurrentBalanceCard date={false} />
      <div className="purchase-form">
        <FloatInput
          labelText="Amount"
          type="text"
          id="amount"
          inputText={amount}
          handleChange={handleChange}
          autoFocus
        />

        <FloatInput
          labelText=""
          type="date"
          id="date"
          inputText={date}
          handleChange={handleChange}
          autoFocus
        />

        <FloatInput
          labelText="Description"
          type="text"
          id="description"
          inputText={description}
          handleChange={handleChange}
          autoFocus
        />

        <Button type="primary" htmlType="button" style={{ width: '100%', padding: 20 }} onClick={dispatchData}>
          Add Purchase
        </Button>
      </div>
    </>
  );
};

export default Purchase;