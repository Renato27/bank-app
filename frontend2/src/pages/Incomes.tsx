import { Card, Space } from "antd";
import DatePickerScroll from "../components/datepicker/DatePickerScroll";
import ScrollableList from "../components/scroll/ScrollableList";
import { DataType } from "./types/balance-type";
import { useEffect, useState } from "react";
import { creditTransactionsByUser } from "../api/api";
import { useOnLoadMore } from "../hooks/useOnLoadMore";
import { getErrorMessage } from "../helpers/helpers";
import { useMessage } from "../context/MessageContext";


const Incomes = () => {
    const { showMessage } = useMessage();
    const [dateValue, setDateValue] = useState('');
    const { loading, data, onLoadMore } = useOnLoadMore<DataType>({
        apiFunc: creditTransactionsByUser,
    });

    useEffect(() => {
        onLoadMore().catch(error => {
            const errorMessage = getErrorMessage(error);
            showMessage(errorMessage, 'error');
        });
    }, []);

    const setValue = (item: DataType) => {
        return <div style={{ color: 'green' }}>${item.amount}</div>;
    };


    return (
        <Space direction="vertical" style={{ width: '100%' }}>
        <Card style={{ backgroundColor: '#addaf0'}}>
            <div className="container-card">
                <div >
                    <DatePickerScroll setDateValue={setDateValue}/>
                </div>
            </div>
        </Card>
        <ScrollableList data={data} loading={loading} onLoadMore={onLoadMore} setValue={setValue}/>
    </Space>
    );
};

export default Incomes;