import { Card, Space } from "antd";
import DatePickerScroll from "../components/datepicker/DatePickerScroll";
import ScrollableList from "../components/scroll/ScrollableList";
import { useState } from "react";
import { DataType } from "./types/balance-type";
import { debitTransactionsByUser } from "../api/api";
import { mockData } from "../helpers/helpers";
import ButtunPlus from "../components/buttons/ButtonPlus";

const dataMock: DataType[] = mockData(30, 'debit');

const Expenses = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>(dataMock);

    const handleAddClick = () => {
        // Implemente a lógica de adição aqui
        console.log('Add button clicked');
    };

    const onLoadMore = async () => {
        try {
            if (loading) return;

            setLoading(true);
            const results: DataType[] = await debitTransactionsByUser(1);

            if (!results) setLoading(false);

            const newData = data.concat(results);
            setData(newData);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const setValue = (item: DataType) => {
        return <div style={{ color: 'red' }}>-${item.value}</div>;
    };


    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Card style={{ backgroundColor: '#addaf0' }}>
                <div className="container-card">
                    <div >
                        <DatePickerScroll />
                    </div>
                </div>
            </Card>
            <ScrollableList data={data} loading={loading} onLoadMore={onLoadMore} setValue={setValue} />
            <ButtunPlus handleAddClick={handleAddClick} path="/purchase"/>
        </Space>
    );
};

export default Expenses;