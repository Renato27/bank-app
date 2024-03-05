import { useEffect, useState } from "react";
import ScrollableList from "../components/scroll/ScrollableList";
import { getErrorMessage, mockData } from "../helpers/helpers";
import { DataType } from "./types/balance-type";
import { checkList } from "../api/api";
import { useMessage } from "../context/MessageContext";

const CheckList = () => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [data, setData] = useState<DataType[]>([]);
    const { showMessage } = useMessage();
    const param = 'pending';

    const reloadData = async () => {
        setLoading(true);
        
        try {
            const results: DataType[] = await checkList(String(page), param);
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
            const results: DataType[] = await checkList(String(page), param);
            setData(prevData => [...prevData, ...results]);
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            showMessage(errorMessage, 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        reloadData();
    }, []);

    const setValue = (item: DataType) => {
        return <div style={{ color: '#096dd9' }}>${item.amount}</div>;
    };

    return (
        <ScrollableList data={data} loading={loading} onLoadMore={onLoadMore} setValue={setValue} admin />
    );
};

export default CheckList;