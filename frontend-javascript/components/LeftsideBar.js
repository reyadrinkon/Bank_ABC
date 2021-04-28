import {Layout, Menu} from "antd";
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined, ShopOutlined, TeamOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined
} from "@ant-design/icons";
import {useRouter} from "next/router";
import Router from "next/router";
import {router} from "next/client";


const { Sider } = Layout;

export default function LeftsideBar(){

    //const router=useRouter()
    return(
        <Sider
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
            }}
        >


            <div className="logo" >BANK_ABC</div>
            <Menu theme="dark" mode="inline" >
                <Menu.Item key="1" icon={<UserOutlined />}onClick={()=> router.push('/register')}>
                    Register
                </Menu.Item>
                <Menu.Item key="2" icon={<TeamOutlined />}onClick={()=> router.push('/deposit')}>
                    Deposit
                </Menu.Item>
                <Menu.Item key="3" icon={<UploadOutlined />}onClick={()=> router.push('/withdraw')}>
                    Withdraw
                </Menu.Item>
                <Menu.Item key="4" icon={<TeamOutlined />}onClick={()=> router.push('/send')}>
                    Send
                </Menu.Item>
                <Menu.Item key="5" icon={<CloudOutlined />}>
                    nav 5
                </Menu.Item>
                <Menu.Item key="6" icon={<AppstoreOutlined />}>
                    nav 6
                </Menu.Item>
                <Menu.Item key="7" icon={<TeamOutlined />}>
                    nav 7
                </Menu.Item>
                <Menu.Item key="8" icon={<ShopOutlined />}>
                    nav 8
                </Menu.Item>
            </Menu>
        </Sider>
    )
}