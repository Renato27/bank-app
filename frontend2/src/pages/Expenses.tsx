import { Card, Space } from "antd";
import DatePickerScroll from "../components/datepicker/DatePickerScroll";
import ScrollableList from "../components/scroll/ScrollableList";
import { useEffect, useState } from "react";
import { DataType } from "./types/balance-type";
import { debitTransactionsByUser } from "../api/api";
import ButtunPlus from "../components/buttons/ButtonPlus";
import { getErrorMessage } from "../helpers/helpers";
import { useMessage } from "../context/MessageContext";
import { useOnLoadMore } from "../hooks/useOnLoadMore";

const Expenses = () => {
    const { showMessage } = useMessage();
    const [dateValue, setDateValue] = useState('');
    const { loading, data, onLoadMore } = useOnLoadMore<DataType>({
        apiFunc: debitTransactionsByUser,
    });

    useEffect(() => {
        onLoadMore().catch(error => {
            const errorMessage = getErrorMessage(error);
            showMessage(errorMessage, 'error');
        });
    }, []);

    const handleAddClick = () => {
        
    };

    const setValue = (item: DataType) => {
        return <div style={{ color: 'red' }}>-${item.amount}</div>;
    };


    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Card style={{ backgroundColor: '#addaf0' }}>
                <div className="container-card">
                    <div >
                        <DatePickerScroll setDateValue={setDateValue}/>
                    </div>
                </div>
            </Card>
            <ScrollableList data={data} loading={loading} onLoadMore={onLoadMore} setValue={setValue} />
            <ButtunPlus handleAddClick={handleAddClick} path="/purchase"/>
        </Space>
    );
};

export default Expenses;