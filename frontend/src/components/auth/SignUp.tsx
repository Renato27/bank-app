import React from 'react';
import { Form, Input, Button, Card, Anchor } from 'antd';
import { AuthType } from './types/auth-type';
import 'antd/dist/reset.css'
import './css/SignUp.css'
import { signup } from '../../api/auth';
import { useForm } from 'antd/es/form/Form';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../../context/MessageContext';
import { getErrorMessage } from '../../helpers/helpers';

const SignupForm = () => {
    const [form] = useForm();
    const navigate = useNavigate();
    const { showMessage } = useMessage();
    const onFinish = async (values: AuthType) => {
        try {
            const response = await signup(values);

            if (!response) throw new Error('Error signing up');

            form.resetFields();
            navigate('/login');
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            showMessage(errorMessage, 'error');
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
                            Sign Up
                        </Button>
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'center' }}>
                        <Anchor items={[
                            {
                                key: 'login',
                                href: '/login',
                                title: 'Already have an account?'
                            }
                        ]} />
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default SignupForm;
