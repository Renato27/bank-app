import { DatePicker, Space } from 'antd';
import { Dispatch, SetStateAction, useState } from 'react';
import './css/DatePickerScroll.css';
import dayjs, { Dayjs } from 'dayjs';

type DatePickerScrollProps = {
    setDateValue: Dispatch<SetStateAction<string>>;
}

const DatePickerScroll = ({setDateValue}: DatePickerScrollProps) => {
    const [date, setDate] = useState(dayjs());
    const format = 'MMMM YYYY';
    const handleChange = (date: Dayjs, dateString: string | string[]) => {
        if(!date) return;

        const formattedDate = date.format('YYYY-MM');
        console.log(formattedDate);
        setDate(date);
        setDateValue(String(date));
    };

    return (
        <Space direction="vertical">
            <DatePicker onChange={handleChange} defaultValue={dayjs()} format={format} picker="month" />
        </Space>
    );
};

export default DatePickerScroll;