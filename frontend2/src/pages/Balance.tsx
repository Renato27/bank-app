import { Space } from "antd";
import Card from "antd/es/card/Card";
import { useState } from "react";
import { DataType } from "./types/balance-type";
import { transactionsByUser } from "../api/api";
import ScrollableList from "../components/scroll/ScrollableList";
import './css/Balance.css';
import {
    PlusOutlined
} from '@ant-design/icons';
import { mockData } from "../helpers/helpers";
import CurrentBalanceCard from "../components/card-balance/CurrentBalanceCard";
import { Link } from "react-router-dom";

const dataMock: DataType[] = mockData(10);

const Balance = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>(dataMock);

    const onLoadMore = async () => {
        try {
            if(loading) return;

            setLoading(true);
            const results: DataType[] = await transactionsByUser(1);

            if (!results) setLoading(false);

            const newData = data.concat(results);
            setData(newData);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
        

    };

    // useEffect(() => {
    //     onLoadMore();
    // }, []);
    

    const setValue = (item: DataType) => {
        if(item.type === 'credit'){
            return <div style={{ color: 'green' }}>${item.value}</div>;
        } else {
            return <div style={{ color: 'red' }}>-${item.value}</div>;
        }
    };

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <CurrentBalanceCard date />
            <Card title='Incomes' style={{ backgroundColor: '#c1e5f5', color: '#4cbef7' }} styles={{ header: { color: '#4cbef7' } }}>
                <div className="container-card">
                    <h1>$500</h1>
                    <Link to={'/deposit-check'} className="plus-icon">
                        <PlusOutlined style={{ fontSize: '24px' }} />
                        <span>DEPOSIT A CHECK</span>
                    </Link>
                </div>
            </Card>
            <Card title='Expenses' style={{ backgroundColor: '#d4eefa', color: '#4cbef7' }} styles={{ header: { color: '#4cbef7' } }}>
                <div className="container-card">
                    <h1>$200</h1>
                    <Link to={'/purchase'} className="plus-icon" style={{marginRight: 23}}>
                        <PlusOutlined style={{ fontSize: '24px' }} />
                        <span>PURCHASE</span>
                    </Link>
                </div>
            </Card>
            <Card title='TRANSACTIONS'>
                <ScrollableList data={data} loading={loading} onLoadMore={onLoadMore} setValue={setValue}/>
            </Card>
        </Space>
    );
}

export default Balance;