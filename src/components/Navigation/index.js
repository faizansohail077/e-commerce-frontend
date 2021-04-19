import { useState } from 'react';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, UserOutlined, UserAddOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { SubMenu, Item } = Menu;


const Navbar = () => {
    const [current, setCurrent] = useState('home')
    const handleClick = (e) => {
        setCurrent(e.key)
    }
    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<AppstoreOutlined />}>
                <Link to="/">Home</Link>
            </Item>
            <Item key="login" icon={<UserOutlined />} className="float-right">
                <Link to="/Login">   Login</Link>
            </Item>
            <Item key="signup" icon={<UserAddOutlined />} className="float-right">
                <Link to="/Signup">
                    Register
                    </Link>
            </Item>
            <SubMenu key="SubMenu" icon={<SettingOutlined />} title="username">
                <Item key="sign" >Signup</Item>
                <Item key="log" >Login</Item>
            </SubMenu>
        </Menu>
    )
}
export default Navbar