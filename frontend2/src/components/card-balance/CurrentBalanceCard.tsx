import { Card } from "antd";
import DatePickerScroll from "../datepicker/DatePickerScroll";
import { useEffect, useState } from "react";
import { transactionsByUserAndStatus } from "../../api/api";
import { DataType } from "../../pages/types/balance-type";

const CurrentBalanceCard = ({ date }: { date: boolean }) => {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        try {
            const fetchBalance = async () => {
                const results: DataType[] = await transactionsByUserAndStatus('accepted');

                if (!results) return setBalance(0);

                const balance = results.reduce((acc, item) => {
                    const value = parseFloat(String(item.value));
                    return item.type === 'credit' ? acc + value : acc - value;
                }, 0.0);
                setBalance(balance);
            };

            fetchBalance();
        } catch (error) {
            setBalance(0);
        }

    }, []);


    return (
        <Card title='Current Balance' style={{ backgroundColor: '#addaf0', color: '#4cbef7' }} styles={{ header: { color: '#4cbef7' } }}>
            <div className="container-card">
                <h1>${balance}</h1>
                {date && (
                    <div >
                        <DatePickerScroll />
                    </div>
                )}
            </div>
        </Card>
    )
};

export default CurrentBalanceCard;