import { Button, Form } from "antd";
import CurrentBalanceCard from "../components/card-balance/CurrentBalanceCard";
import FloatInput from "../components/float-input/FloatInput";
import { ChangeEvent, useState } from "react";
import { DataType } from "./types/balance-type";
import UploadButton from "../components/buttons/UploadButton";
import { createTransaction } from "../api/api";
import { useNavigate } from "react-router-dom";

const DepositCheck = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [value, setValue] = useState<string>("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState<string>("");

    const onFinish = (values: DataType) => {
        try {
          values.image = image;
          values.type = "credit";
          const response = createTransaction(values);

          if(!response) throw new Error("Error to create check");

          form.resetFields();
          navigate('/');
        } catch (error) {
          throw error;
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, id } = e.target;

        if (id === "amount") setValue(value);
        if (id === "date") setImage(value);
        if (id === "description") setDescription(value);
      };
    return (
        <>
        <CurrentBalanceCard date={false}/>
        <Form form={form} layout="vertical" onFinish={onFinish} className="purchase-form">
        <Form.Item name="amount">
             <FloatInput 
                labelText="Amount"
                type="text"
                id="amount"
                inputText={value}
                handleChange={handleChange}
                autoFocus
            />
        </Form.Item>

  
        <Form.Item name="description">
          <FloatInput 
            labelText="Description"
            type="text"
            id="description"
            inputText={description}
            handleChange={handleChange}
            autoFocus
        />
        </Form.Item>

        <Form.Item name="image">
           <UploadButton setImage={setImage}/> 
  
        </Form.Item>
          <Button type="primary" htmlType="submit" style={{width: '100%', padding: 20}}>
            DEPOSIT CHECK
          </Button>
      </Form>
      </>
      );
};
export default DepositCheck;