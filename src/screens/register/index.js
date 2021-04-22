import { useState } from 'react'
import { auth } from '../../firebase'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Register() {
    const [email, setEmail] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        const config = {
            url: process.env.REACT_APP_REGISTER_URL,
            handleCodeInApp: true
        }
       
        await auth.sendSignInLinkToEmail(email, config)
        toast.success(`Email send to ${email} .click the link to login`)
        window.localStorage.setItem('emailForRegisteration', email)
        setEmail('')
    }
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    <ToastContainer />
                    <form onSubmit={handleSubmit}>
                        <input placeholder="Enter Email" className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
                        <button type="submit" className="btn btn-raised">Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
