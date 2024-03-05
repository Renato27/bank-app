import { Space } from "antd";
import Card from "antd/es/card/Card";
import { useEffect, useState } from "react";
import { DataType } from "./types/balance-type";
import { transactionsByUser, transactionsByUserAndStatus } from "../api/api";
import ScrollableList from "../components/scroll/ScrollableList";
import './css/Balance.css';
import {
    PlusOutlined
} from '@ant-design/icons';
import CurrentBalanceCard from "../components/card-balance/CurrentBalanceCard";
import { Link } from "react-router-dom";
import { useMessage } from "../context/MessageContext";
import { getErrorMessage } from "../helpers/helpers";
import { useOnLoadMore } from "../hooks/useOnLoadMore";

const Balance = () => {
    const { showMessage } = useMessage();
    const [incomes, setIncomes] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [page, setPage] = useState(1);
    const { loading, data, onLoadMore } = useOnLoadMore<DataType>({
        apiFunc: transactionsByUser,
        statusDiferent: 'rejected'
    });

    useEffect(() => {
        onLoadMore().catch(error => {
            const errorMessage = getErrorMessage(error);
            showMessage(errorMessage, 'error');
        });

        if (!data) return;

        const incomes = data.filter(item => item.type === 'credit' && item.status === 'accepted')
            .reduce((acc, item) => acc + parseFloat(String(item.amount)), 0.0);
        const expenses = data.filter(item => item.type === 'debit' && item.status === 'accepted')
            .reduce((acc, item) => acc - parseFloat(String(item.amount)), 0.0);

        setIncomes(incomes);
        setExpenses(Math.abs(expenses));
        setPage(page + 1);
    }, [data]);


    const setValue = (item: DataType) => {

        if (item.status === 'pending') {
            return <div style={{ color: '#096dd9' }}>${item.amount}</div>;
        }

        if (item.type === 'credit') {
            return <div style={{ color: 'green' }}>${item.amount}</div>;
        }

        return <div style={{ color: 'red' }}>-${item.amount}</div>;

    };

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <CurrentBalanceCard date />
            <Card title='Incomes' style={{ backgroundColor: '#c1e5f5', color: '#4cbef7' }} styles={{ header: { color: '#4cbef7' } }}>
                <div className="container-card">
                    <h1>${incomes}</h1>
                    <Link to={'/deposit-check'} className="plus-icon">
                        <PlusOutlined style={{ fontSize: '24px' }} />
                        <span>DEPOSIT A CHECK</span>
                    </Link>
                </div>
            </Card>
            <Card title='Expenses' style={{ backgroundColor: '#d4eefa', color: '#4cbef7' }} styles={{ header: { color: '#4cbef7' } }}>
                <div className="container-card">
                    <h1>${expenses}</h1>
                    <Link to={'/purchase'} className="plus-icon" style={{ marginRight: 23 }}>
                        <PlusOutlined style={{ fontSize: '24px' }} />
                        <span>PURCHASE</span>
                    </Link>
                </div>
            </Card>
            <Card title='TRANSACTIONS'>
                <ScrollableList data={data} loading={loading} onLoadMore={onLoadMore} setValue={setValue} />
            </Card>
        </Space>
    );
}

export default Balance;