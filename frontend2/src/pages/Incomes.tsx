import { Card, Space } from "antd";
import DatePickerScroll from "../components/datepicker/DatePickerScroll";
import ScrollableList from "../components/scroll/ScrollableList";
import { DataType } from "./types/balance-type";
import { useState } from "react";
import { mockData } from "../helpers/helpers";
import { creditTransactionsByUser } from "../api/api";

const dataMock: DataType[] = mockData(30, 'credit');

const Incomes = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>(dataMock);

    const onLoadMore = async () => {
        try {
            if(loading) return;

            setLoading(true);
            const results: DataType[] = await creditTransactionsByUser(1);

            if (!results) setLoading(false);

            const newData = data.concat(results);
            setData(newData);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        } 
    };

    const setValue = (item: DataType) => {
        return <div style={{ color: 'green' }}>-${item.value}</div>;
    };


    return (
        <Space direction="vertical" style={{ width: '100%' }}>
        <Card style={{ backgroundColor: '#addaf0'}}>
            <div className="container-card">
                <div >
                    <DatePickerScroll />
                </div>
            </div>
        </Card>
        <ScrollableList data={data} loading={loading} onLoadMore={onLoadMore} setValue={setValue}/>
    </Space>
    );
};

export default Incomes;