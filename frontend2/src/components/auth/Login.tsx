import React, { useContext } from 'react';
import { Form, Input, Button, Card, Anchor } from 'antd';
import { AuthType } from './types/auth-type';
import 'antd/dist/reset.css'
import './css/SignUp.css'
import { login } from '../../api/auth';
import { useForm } from 'antd/es/form/Form';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const authContext = useContext(AuthContext);
    const [form] = useForm();
    const navigate = useNavigate();
    const onFinish = async (values: AuthType) => {
        try {
            console.log('Received values of form: ', values);
            const response = await login(values);

            if (!response) throw new Error('Error logging in');

            const token = response.access_token;
            if(!authContext) throw new Error('Error logging in');

            authContext.login(token);
            navigate('/');
            
        } catch (error) {
            console.error('Error logging in', error);
        }
    };

    return (
        <div className='card-div'>
            <Card className='card' title="BNB Bank" styles={{ header: { backgroundColor: '#337AFF', borderRadius: '23px 23px 0 0', color: '#FFFFFF', padding: '60px 0 10px 0' } }}>
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

                    <Form.Item style={{ textAlign: 'center' }}>
                        <Anchor items={[
                            {
                                key: 'signup',
                                href: '/signup',
                                title: 'register'
                            }
                        ]} />
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
