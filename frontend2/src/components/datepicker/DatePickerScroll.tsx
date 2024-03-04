import { DatePicker, Space } from 'antd';
import moment, { Moment } from 'moment';
import {
    CaretDownOutlined
} from '@ant-design/icons';
import { useState } from 'react';

const DatePickerScroll = () => {
    const [date, setDate] = useState(moment());

    const handleChange = (value: Moment) => {
        console.log(value);
        setDate(value);
    };

    return (
        <Space direction="vertical">
            <DatePicker
                value={date}
                onChange={() => handleChange}
                picker="month"
                format="MMMM YYYY"
                popupClassName="custom-month-year-picker-dropdown"
                suffixIcon={<CaretDownOutlined />}
                inputReadOnly
                style={{
                    width: '100%',
                    backgroundColor: '#addaf0',
                    borderColor: 'transparent',
                    color: '#000',
                    borderRadius: '4px',
                }}
            />
        </Space>
    );
};

export default DatePickerScroll;