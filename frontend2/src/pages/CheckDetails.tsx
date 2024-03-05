import { Button, Form } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { DataType } from "./types/balance-type";
import FloatInput from "../components/float-input/FloatInput";
import UploadButton from "../components/buttons/UploadButton";
import './css/CheckDetails.css';
import { useParams } from "react-router-dom";
import { checkById, updateTransaction } from "../api/api";

const CheckDetails = () => {
    const { id } = useParams();
    const [value, setValue] = useState(0);
    const [image, setImage] = useState("");
    const [user, setUser] = useState<string>("");

    const dispatchData = (status: string) => {
        try {
            const response =  updateTransaction(String(id), { status: status});
        } catch (error) {
            
        }
    };

    const loadData = async () => {
        try {
            if (!id) return;

            const response: DataType = await checkById(id);

            if (!response) throw new Error('Error loading data');

            if (response.image) setImage(response.image);
            if (response.value) setValue(response.value);
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
                    inputText={String(value)}
                    handleChange={handleChange}
                    value={value}
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