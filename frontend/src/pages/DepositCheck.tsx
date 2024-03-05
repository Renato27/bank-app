import { Button, Form } from "antd";
import CurrentBalanceCard from "../components/card-balance/CurrentBalanceCard";
import FloatInput from "../components/float-input/FloatInput";
import { ChangeEvent, useState } from "react";
import { BalanceType, DataType } from "./types/balance-type";
import UploadButton from "../components/buttons/UploadButton";
import { createTransaction } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useMessage } from "../context/MessageContext";
import { getErrorMessage } from "../helpers/helpers";

const DepositCheck = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [amount, setAmount] = useState<string>("");
  const { showMessage } = useMessage();
  const [image, setImage] = useState("");
  const [description, setDescription] = useState<string>("");

  const dispatchData = async () => {
    try {
      const payload = {
        amount: parseFloat(amount),
        image: image,
        description: description,
        type: 'credit' as BalanceType
      }
      const response = await createTransaction(payload);

      if (!response) throw new Error("Error to create check");

      form.resetFields();
      navigate('/');
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      showMessage(errorMessage, 'error');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;

    if (id === "amount") setAmount(value);
    if (id === "date") setImage(value);
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
          labelText="Description"
          type="text"
          id="description"
          inputText={description}
          handleChange={handleChange}
          autoFocus
        />

        <UploadButton setImage={setImage} />
        <Button type="primary" htmlType="button" style={{ width: '100%', padding: 20 }} onClick={dispatchData}>
          DEPOSIT CHECK
        </Button>
      </div>
    </>
  );
};
export default DepositCheck;