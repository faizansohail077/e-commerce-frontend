import { useEffect, useState } from 'react'
import { auth, googleProvider } from '../../firebase'
import { toast, ToastContainer } from 'react-toastify'
import { Button } from 'antd'
import { GoogleOutlined, MailOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function ForgotPassword({ history }) {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const state = useSelector(state => state.userReducer)

    useEffect(() => {
        if (state?.email) {
            history.push('/')
        }
    }, [state])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_URL,
            handleCodeInApp: true
        }
       
        await auth.sendPasswordResetEmail(email, config)
            .then(() => {
                setEmail('')
                setLoading(false)
                toast.success('Email Send')
            })
            .catch(e => {
                console.log(e.message)
                toast.error(e.message)
                setLoading(false)
            })
    }
    return (
        <div className="container col-md-3 offset-md-3 p-5">
            {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Forgot Password</h4>}
            <form onSubmit={handleSubmit}>
                <input placeholder="Enter email" className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
                <br />
                <button disabled={!email} className="btn btn-raised">Submit</button>
            </form>
        </div>
    )
}

export default ForgotPassword
