import React, { useContext, useEffect, useState } from 'react';
import { Form, Input, Button, Card, Anchor } from 'antd';
import { AuthType } from './types/auth-type';
import 'antd/dist/reset.css'
import './css/SignUp.css'
import { login } from '../../api/auth';
import { useForm } from 'antd/es/form/Form';
import AuthContext from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { getErrorMessage } from '../../helpers/helpers';
import { useMessage } from '../../context/MessageContext';

const Login = () => {
    const authContext = useContext(AuthContext);
    const [form] = useForm();
    const [admin, setAdmin] = useState(false);
    const [title, setTitle] = useState('BNB Bank');
    const [path, setPath] = useState('/');
    const { showMessage } = useMessage();
    const navigate = useNavigate();
    const location = useLocation();
    const onFinish = async (values: AuthType) => {
        try {

            const response = await login(values);

            if (!response) throw new Error('Error logging in');

            const token = response.access_token;
            const expriresIn = response.expires_in;
            if (!authContext) throw new Error('Error logging in');

            authContext.login(token, expriresIn);
            navigate(path);
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            showMessage(errorMessage, 'error')

            console.error('Error logging in', error);
        }
    };

    useEffect(() => {
        const pathname = location.pathname;
        const parts = pathname.split('/');
        const pathPart = parts.length > 1 ? parts[1] : null;
        const path = pathPart === 'admin' ? '/admin' : '/';
        setPath(path);
        if (path === '/admin') {
            setTitle('BNB Bank Admin');
            setAdmin(true);
        }
    }, [location.pathname]);

    return (
        <div className='card-div'>
            <Card className='card' title={title} styles={{ header: { backgroundColor: '#337AFF', borderRadius: '23px 23px 0 0', color: '#FFFFFF', padding: '60px 0 10px 0' } }}>
                <Form
                    form={form}
                    name="signup"
                    onFinish={onFinish}
                    layout="vertical"
                    className='form'
                >

                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input placeholder="Username" className='form-input' />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input.Password placeholder="Password" className='form-input' />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className='form-button' block>
                            Login
                        </Button>
                    </Form.Item>
                    {!admin &&
                        <Form.Item style={{ textAlign: 'center' }}>
                            <Anchor items={[
                                {
                                    key: 'signup',
                                    href: '/signup',
                                    title: 'register'
                                }
                            ]} />
                        </Form.Item>
                    }
                </Form>
            </Card>
        </div>
    );
};

export default Login;
