import { Card } from "antd";
import DatePickerScroll from "../datepicker/DatePickerScroll";
import { useEffect, useState } from "react";
import { balanceByUser } from "../../api/api";

const CurrentBalanceCard = ({ date }: { date: boolean }) => {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        try {
            const fetchBalance = async () => {
                const results = await balanceByUser(1);

                if (!results) return setBalance(0);

                setBalance(results);
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