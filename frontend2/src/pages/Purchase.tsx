import { Button, Form } from "antd";
import CurrentBalanceCard from "../components/card-balance/CurrentBalanceCard";
import {
    DollarOutlined,
    CalendarOutlined,
    EditOutlined
} from '@ant-design/icons';
import { DataType } from "./types/balance-type";
import FloatInput from "../components/float-input/FloatInput";
import { ChangeEvent, useState } from "react";

const Purchase = () => {
    const [form] = Form.useForm();
    const [value, setValue] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const onFinish = (values: DataType) => {
        console.log('Received values of form: ', values);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, id } = e.target;

        if (id === "value") setValue(value);
        if (id === "date") setDate(value);
        if (id === "description") setDescription(value);
      };
      
    return (
        <>
        <CurrentBalanceCard date={false}/>
        <Form form={form} layout="vertical" onFinish={onFinish} className="purchase-form">
        <Form.Item name="value">
             <FloatInput 
                labelText="Amount"
                type="text"
                id="value"
                inputText={value}
                handleChange={handleChange}
                autoFocus
                icon={<DollarOutlined />}
            />
        </Form.Item>
  
        <Form.Item name="date">
         <FloatInput 
            labelText=""
            type="date"
            id="date"
            inputText={date}
            handleChange={handleChange}
            autoFocus
            icon={<CalendarOutlined />}
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
            icon={<EditOutlined />}
        />
        </Form.Item>
  
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{width: '100%', padding: 20}}>
            Add Purchase
          </Button>
        </Form.Item>
      </Form>
      </>
    );
};

export default Purchase;