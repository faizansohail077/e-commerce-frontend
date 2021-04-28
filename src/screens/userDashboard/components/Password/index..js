import { useState } from "react"
import UserNav from "../../../../components/userNav"
import { auth } from "../../../../firebase"
import { toast } from 'react-toastify'

const Password = () => {
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await auth.currentUser.updatePassword(password)
            .then(() => {
                setLoading(false)
                toast.success('Password Update')
                setPassword('')
            })
            .catch(err => {
                console.log(err.message)
                toast.error(err.message)
                setLoading(false)
            })
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>

                <div className="col">
                    {loading ? <h4 className="text-danger">Loading....</h4> : (<h4>Password Update</h4>)}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Your Password</label>
                            <input value={password} disabled={loading} type="password" className="form-control" onChange={e => setPassword(e.target.value)} placeholder="Enter New Password" />
                            <button disabled={!password || password < 6 || loading} className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Password
