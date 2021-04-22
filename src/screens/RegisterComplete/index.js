import { useEffect, useState } from 'react'
import { auth } from '../../firebase'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function CompleteRegister({ history }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegisteration'),
        )
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await auth.signInWithEmailLink(email, window.location.href)
            if (result.user.emailVerified) {
                window.localStorage.removeItem('emailForRegisteration')
                const user = await auth.currentUser
                await user.updatePassword(password)
                const idToken = user.getIdTokenResult()
                history.push('/')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>CompleteRegister</h4>
                    <ToastContainer />
                    <form onSubmit={handleSubmit}>
                        <input disabled className="form-control" type="email" value={email} />
                        <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus placeholder="Password" />
                        <button type="submit" className="btn btn-raised">CompleteRegister</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompleteRegister
