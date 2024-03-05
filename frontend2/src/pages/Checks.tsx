import { Card, Space, Tabs, TabsProps } from "antd";
import ScrollableList from "../components/scroll/ScrollableList";
import ButtunPlus from "../components/buttons/ButtonPlus";
import { DataType } from "./types/balance-type";
import { checksByUser, debitTransactionsByUser } from "../api/api";
import DatePickerScroll from "../components/datepicker/DatePickerScroll";
import { useState } from "react";
import { mockData } from "../helpers/helpers";
import './css/Checks.css';

const dataMock: DataType[] = mockData(30, 'credit');

const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'PENDING',
    },
    {
      key: '2',
      label: 'ACCEPTED',
    },
    {
      key: '3',
      label: 'REJECTED',
    },
  ];

const Checks = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>(dataMock);
    const onChange = (key: string) => {
        console.log(key);
      };

    const handleAddClick = () => {
        // Implemente a lógica de adição aqui
        console.log('Add button clicked');
    };

    const onLoadMore = async () => {
        try {
            if (loading) return;

            setLoading(true);
            const results: DataType[] = await checksByUser();

            if (!results) setLoading(false);

            const newData = data.concat(results);
            setData(newData);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const setValue = (item: DataType) => {
        return <div style={{ color: '#096dd9' }}>-${item.value}</div>;
    };
    return (

    <Space direction="vertical" style={{ width: '100%' }}>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} className="tabs-check"/>;
            <Card style={{ backgroundColor: '#addaf0' }}>
                <div className="container-card">
                    <div >
                        <DatePickerScroll />
                    </div>
                </div>
            </Card>
            <ScrollableList data={data} loading={loading} onLoadMore={onLoadMore} setValue={setValue} />
            <ButtunPlus handleAddClick={handleAddClick} path="/deposit-check"/>
        </Space>
    )
};

export default Checks;