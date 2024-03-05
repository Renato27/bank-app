import { useEffect, useState } from "react";
import ScrollableList from "../components/scroll/ScrollableList";
import { mockData } from "../helpers/helpers";
import { DataType } from "./types/balance-type";
import { checkList } from "../api/api";

const CheckList = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>([]);
    const onLoadMore = async () => {
        try {
            if (loading) return;

            setLoading(true);
            const results: DataType[] = await checkList();

            if (!results) setLoading(false);

            const newData = data.concat(results);
            console.log(newData);
            setData(newData);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        onLoadMore();
    }, []);

    const setValue = (item: DataType) => {
        return <div style={{ color: '#096dd9' }}>${item.value}</div>;
    };

    return (
        <ScrollableList data={data} loading={loading} onLoadMore={onLoadMore} setValue={setValue} admin />
    );
};

export default CheckList;