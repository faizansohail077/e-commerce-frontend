import { useState } from 'react'
import { auth } from '../../firebase'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Button } from 'antd'
import { MailOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux'

function Login({ history }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const LoginForm = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await auth.signInWithEmailAndPassword(email, password)
            const { user } = result
            const idToken = await user.getIdTokenResult()
            dispatch({
                type: 'LOGGED_IN_USER', payload: {
                    email: user.email,
                    token: idToken.token
                }
            })
            history.push('/')
        } catch (e) {
            console.log(e.message)
            toast.error(e.message)
        }
    }
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Login</h4>
                    <ToastContainer />
                    <form onSubmit={LoginForm}>
                        <div className="form-group">
                            <input placeholder="Login" className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
                        </div>
                        <div className="form-group">
                            <input placeholder="Your Password" className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <Button icon={<MailOutlined />} disabled={!email || password.length < 6} size="large" type="primary" shape="round" block onClick={LoginForm} className="mb-3">
                            Login with Email/Password
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
