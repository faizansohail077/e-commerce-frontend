import { useEffect, useState } from 'react'
import { auth } from '../../firebase'
import { toast, ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import { createOrUpdateUser } from '../../functions'



function CompleteRegister({ history }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
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
                const idTokenResult = user.getIdTokenResult()
                let token = (await idTokenResult).token
                createOrUpdateUser(token)
                    .then(res => {
                        dispatch({
                            type: 'LOGGED_IN_USER', payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: token,
                                role: res.data.role,
                                _id: res.data._id
                            }
                        })
                    })
                    .catch(err => console.log('this is error', err.message))
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
