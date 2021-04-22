import { useState } from 'react';
import { useDispatch } from 'react-redux'
import firebase from 'firebase'
import { Menu } from 'antd';
import { LogoutOutlined, AppstoreOutlined, UserOutlined, UserAddOutlined, SettingOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
const { SubMenu, Item } = Menu;

const Navbar = () => {
    const history = useHistory()
    const [current, setCurrent] = useState('home')
    const dispatch = useDispatch()

    const handleClick = (e) => {
        setCurrent(e.key)
    }

    const logout = () => {
        firebase.auth().signOut()
        dispatch({ type: "LOGOUT", payload: null })
        history.push("/Login")
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
                <Item icon={<LogoutOutlined />} onClick={() => logout()}>Logout</Item>
            </SubMenu>
        </Menu>
    )
}
export default Navbar