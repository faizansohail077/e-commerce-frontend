import { useEffect, useState } from 'react'
import { auth, googleProvider } from '../../firebase'
import { toast, ToastContainer } from 'react-toastify'
import { Button } from 'antd'
import { GoogleOutlined, MailOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Login({ history }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const state = useSelector(state => state.userReducer)

    useEffect(() => {
        if (state?.email) {
            history.push('/')
        }
    }, [state])

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
    const googleLogin = async () => {
        setLoading(true)
        await auth.signInWithPopup(googleProvider)
            .then(async (res) => {
                const { user } = res
                const idToken = await user.getIdTokenResult()
                dispatch({
                    type: 'LOGGED_IN_USER', payload: {
                        email: user.email,
                        token: idToken.token
                    }
                })
                history.push('/')
            })
            .catch(error => {
                console.log(error.message)
            })
    }
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {!loading ? <h4>Login</h4> : <h4 className="text-danger">Loading....</h4>}
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
                        <Button icon={<GoogleOutlined />} size="large" type="danger" shape="round" block onClick={googleLogin} className="mb-3">
                            Login with Google
                        </Button>
                        <Link to="forgot/password" className="float-right text-danger">Forgot Password</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
