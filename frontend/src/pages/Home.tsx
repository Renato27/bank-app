import React from 'react'
import { Card, Space } from 'antd';
import './css/Home.css'
import { useOutletContext } from 'react-router-dom';
import { ContextType } from './types/home-types';

const Home = () => {
    const { spaceJustify, cardSize, direction } = useOutletContext() as ContextType;
    return (
        <div className='content-div'>
            <Space direction={direction} style={{ width: '100%', justifyContent: spaceJustify }}>              
                <Card title="Balance" bordered hoverable style={{ minWidth: cardSize, flex: 1 }}>
                    <p>Balance: $1000</p>
                </Card>
                <Card title="Transactions" bordered hoverable style={{ minWidth: cardSize, flex: 1 }}>
                    <p>Transactions: 10</p>
                </Card>
            </Space>
        </div>
    )
}
export default Home;

