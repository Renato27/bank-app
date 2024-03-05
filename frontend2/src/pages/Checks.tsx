import { Card, Space, Tabs, TabsProps } from "antd";
import ScrollableList from "../components/scroll/ScrollableList";
import ButtunPlus from "../components/buttons/ButtonPlus";
import { DataType } from "./types/balance-type";
import { transactionsByUserAndStatus } from "../api/api";
import DatePickerScroll from "../components/datepicker/DatePickerScroll";
import { useEffect, useState } from "react";
import './css/Checks.css';
import { getErrorMessage } from "../helpers/helpers";
import { useMessage } from "../context/MessageContext";

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
    const [status, setStatus] = useState('pending');
    const [data, setData] = useState<DataType[]>([]);
    const [page, setPage] = useState(1);
    const { showMessage } = useMessage();
    const [dateValue, setDateValue] = useState('');
    const onChange = (key: string) => {
        const tab = items.find(item => item.key === key);
        if (tab) setStatus(String(tab.label).toLowerCase());
    };

    const handleAddClick = () => {

    };

    const reloadData = async () => {
        setLoading(true);
        try {
            const results: DataType[] = await transactionsByUserAndStatus(status);
            setData(results);
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            showMessage(errorMessage, 'error');
        } finally {
            setLoading(false);
        }
    };

    const onLoadMore = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const results: DataType[] = await transactionsByUserAndStatus(status, String(page));

            if (!results.length) {
                setLoading(false);
                return;
            }

            setData(prevData => [...prevData, ...results]);
            setPage(prevPage => prevPage + 1);
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            showMessage(errorMessage, 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        reloadData();
        setPage(1);
    }, [status]);

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
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} className="tabs-check" />;
            <Card style={{ backgroundColor: '#addaf0' }}>
                <div className="container-card">
                    <div >
                        <DatePickerScroll setDateValue={setDateValue}/>
                    </div>
                </div>
            </Card>
            <ScrollableList data={data} loading={loading} onLoadMore={onLoadMore} setValue={setValue} />
            <ButtunPlus handleAddClick={handleAddClick} path="/deposit-check" />
        </Space>
    )
};

export default Checks;