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


        const {key,email,password,name}=values.user;
        const url='http://localhost:3000/register'
        const requestBody={
            key: key,
            email : email,
            password : password,
            name : name,
        };
        console.log("requestbody");
        //alert("successfull"+values.user.name+" Added successfull");
        console.log(requestBody);


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
        console.log("data");
        console.log(data);
        if ('error' in data) {
            alert("Registration Failed\n Possible reasons \n1.The key doesnt match with Our citizen Database \n2.The person is not 18 years old\n3.The account already exists");
        } else {
            alert("Registration Successfull \nName:"+values.user.name+"\nAccount No :"+values.user.key+"\n Please remember your password and Account No.");

            await Router.push('/');
        }

    };

    return (
        <Form {...layout} name="nest-messages" onFinish={handleSubmit} validateMessages={validateMessages}>
            <Form.Item
                name={['user', 'key']}
                label="NID"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={['user', 'email']}
                label="Email"
                rules={[
                    {
                        type: 'email',
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
                name={['user', 'name']}
                label="Name"
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
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};
