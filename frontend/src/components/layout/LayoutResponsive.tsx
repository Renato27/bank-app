import { Button, Layout, Menu, MenuProps } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import './css/LayoutResponsive.css'

import {
    QuestionCircleOutlined,
    PieChartOutlined,
    SettingOutlined,
    UserOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    CreditCardOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import { DirectionContentType, SpaceJustifyType } from './types/layout-types';
import AuthContext from '../../context/AuthContext';
import { decodeToken } from '../../helpers/helpers';

type MenuItem = Required<MenuProps>['items'][number] & {
    url?: string;
    label: string
};

function getItem(
    label: string,
    key: React.Key,
    icon?: React.ReactNode,
    url?: string,
): MenuItem {
    return {
        key,
        icon,
        label,
        url, 
    } as MenuItem;
}

const itemsUser: MenuItem[] = [
    getItem('Balance', '1', <PieChartOutlined />, '/'),
    getItem('Incomes', '2', <ArrowUpOutlined />, '/incomes'),
    getItem('Expenses', '3', <ArrowDownOutlined />, '/expenses'),
    getItem('Checks', '4', <CreditCardOutlined />, '/checks'),
    getItem('Profile', '5', <UserOutlined />),
    getItem('Setting', '6', <SettingOutlined />),
    getItem('Help', '7', <QuestionCircleOutlined />),
];

const adminItems: MenuItem[] = [
    getItem('Check List', '1', <CreditCardOutlined />, '/admin'),
    getItem('Profile', '2', <UserOutlined />),
    getItem('Setting', '3', <SettingOutlined />),
    getItem('Help', '4', <QuestionCircleOutlined />),

];

const { Content, Footer, Header, Sider } = Layout;

const LayoutResponsive = () => {
    const [selectedKey, setSelectedKey] = useState('1')
    const [items, setItems] = useState<MenuItem[]>([]);
    const [selectedLabel, setSelectedLabel] = useState<string>('BNB Bank');
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const [direction, setDirection] = useState<DirectionContentType>('horizontal');
    const [cardSize, setCardSize] = useState(300);
    const [spaceJustify, setSpaceJustify] = useState<SpaceJustifyType>('flex-start');
   
    const handleLogout = () => {
        authContext?.logout();
        navigate('/')
    };

    const onMenuClick: MenuProps['onClick'] = (info) => {
        setSelectedKey(info.key);
        const item = items.find((i) => i.key === info.key);
        if (item && item.url) {
          navigate(item.url);
        }
      };


    const menuByType = () =>{
        const decode = decodeToken();
        if(decode?.userType === 'admin')
            return setItems(adminItems);

        return setItems(itemsUser);
    }

    useEffect(() => {
        menuByType();
        const selectedItem = items.find(item => item.key === selectedKey);
        if (selectedItem) {
          setSelectedLabel(typeof selectedItem.label === 'string' ? selectedItem.label : 'BNB Bank');
        }
    }, [selectedKey, items]);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {

                }}
                onCollapse={(collapsed, type) => {
   
                    if (type === 'clickTrigger' && !collapsed) {
                        setDirection('vertical')
                        setSpaceJustify('space-around');
                        setCardSize(100);
                    }else{
                        setDirection(collapsed ? 'vertical' : 'horizontal');
                        setSpaceJustify(collapsed ? 'space-around' : 'flex-start');
                        setCardSize(300);
                    } 
                }}
            >
                <div className="logo-vertical">BNB Bank</div>
                <Menu theme="dark" selectedKeys={[selectedKey]} mode="inline" items={items} onClick={onMenuClick}/>
            </Sider>
            <Layout>
            <Header style={{ padding: 0, backgroundColor: '#337AFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}></div>
                <h1 className='header-title'>{selectedLabel}</h1>
                <div style={{ flex: 1 }}></div>
                <Button icon={<LogoutOutlined />} onClick={handleLogout} style={{ marginRight: 20}}/>
            </Header>
                <Content style={{ margin: '0 16px' }}>
                   <Outlet context={{ spaceJustify, cardSize, direction }} />
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Bank BNB ©{new Date().getFullYear()} Created by Renato Maldonado
                </Footer>
            </Layout>
        </Layout>
    )
}
export default LayoutResponsive;

