import { Form, Input, InputNumber, Button } from 'antd';
import {route} from "next/dist/next-server/server/router";

import Router from "next/router";
const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 12,
    },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
/* eslint-enable no-template-curly-in-string */

export  default function RegisterPage() {
    const handleSubmit = async (values) => {
        console.log(values);


        const {key,password,amount}=values.user;
        const url='http://localhost:3000/withdrawmoney'
        const requestBody={
            key: key,
            password : password,
            amount: amount,
        };

        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(requestBody) // body data type must match "Content-Type" header


        });
        const data = await response.json();
        if ('error' in data) {
            alert("Money withdrawl Failed\n Possible reasons \n1.You dont have that much money \n2.Password doesnt match");
        } else {
            alert("Money withdrawll Successfull");

            await Router.push('/');
        }
    };

    return (
        <Form {...layout} name="nest-messages" onFinish={handleSubmit} validateMessages={validateMessages}>
            <Form.Item
                name={['user', 'key']}
                label="Account No"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name={['user', 'password']}
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name={['user', 'amount']}
                label="Amount"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>



            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                <Button type="primary" htmlType="submit">
                    Withdraw
                </Button>
            </Form.Item>
        </Form>
    );
};
