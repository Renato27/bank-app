import { Button, Form } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { DataType } from "./types/balance-type";
import FloatInput from "../components/float-input/FloatInput";
import UploadButton from "../components/buttons/UploadButton";
import './css/CheckDetails.css';
import { useNavigate, useParams } from "react-router-dom";
import { checkById, updateTransaction } from "../api/api";

const CheckDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [amount, setAmount] = useState(0);
    const [image, setImage] = useState("");
    const [user, setUser] = useState<string>("");

    const dispatchData = (status: string) => {
        try {
            const response =  updateTransaction(String(id), { status: status });

            if (!response) throw new Error('Error updating data');

            navigate('/admin');
        } catch (error) {
            throw error;
        }
    };

    const loadData = async () => {
        try {
            if (!id) return;

            const response: DataType = await checkById(id);

            if (!response) throw new Error('Error loading data');

            if (response.image) setImage(response.image);
            if (response.amount) setAmount(response.amount);
            if (response.user) setUser(response.user);

        } catch (error) {
            console.error('Error loading data', error);
        }
    }

    const handleChange = () => {

    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <div className="purchase-form">
                <FloatInput
                    labelText="Customer"
                    type="text"
                    id="user"
                    inputText={user}
                    value={user}
                    handleChange={handleChange}
                    autoFocus
                />
                <FloatInput
                    labelText="Account"
                    type="text"
                    id="id"
                    inputText={String(id)}
                    handleChange={handleChange}
                    autoFocus
                />
                <FloatInput
                    labelText="Amount"
                    type="text"
                    id="value"
                    inputText={String(amount)}
                    handleChange={handleChange}
                    value={amount}
                />
                <UploadButton setImage={setImage} image={image} />
                <div className="buttons">
                    <Button type="default" htmlType="button" style={{ color: '#4096ff' }} onClick={() => dispatchData('rejected')}>
                        REJECT
                    </Button>
                    <Button type="primary" htmlType="button" onClick={() => dispatchData('accepted')}>
                        ACCEPT
                    </Button>
                </div>
            </div>
        </>
    );
};

export default CheckDetails;