import 'antd/dist/antd.css';
import '../styles/globals.css';
import { Layout, Menu } from 'antd';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import {useRouter} from 'next/router';

const { Header, Content, Footer, Sider } = Layout;


function MyApp({ Component, pageProps }) {
  const router =useRouter();
  //return <Component {...pageProps} />
  return  <Layout>
  <Sider
    style={{
      overflow: 'auto',
      height: '100vh',
      position: 'fixed',
      left: 0,
    }}
  >
    <h2 className="logo">BANK_ABC</h2>
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
      <Menu.Item key="1" icon={<UserOutlined />} onClick={()=> router.push('/register')}>
        Create Account
      </Menu.Item>
      <Menu.Item key="3" icon={<UploadOutlined />} onClick={()=> router.push('/deposit')}>
        Deposit Money
      </Menu.Item>
      <Menu.Item key="6" icon={<AppstoreOutlined />} onClick={()=> router.push('/withdraw')}>
        Withdraw Money 
      </Menu.Item>
      <Menu.Item key="7" icon={<TeamOutlined />} onClick={()=> router.push('/send')}>
        Send Money
      </Menu.Item>
      
     
    </Menu>
  </Sider>
  <Layout className="site-layout" style={{ marginLeft: 200 }}>
    <Header className="site-layout-background" style={{ padding: 0 }} />
    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
      <div className="site-layout-background" style={{ padding: 24}}>
        {/*--------*/}
        <Component{...pageProps}/>
        {/*--------*/}

      </div>
    </Content>
  </Layout>
</Layout>
}

export default MyApp
/////////////////////////////////


