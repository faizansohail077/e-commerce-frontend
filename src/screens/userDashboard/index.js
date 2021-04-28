import UserNav from "../../components/userNav"

const UserDashboard = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col md-2">
                    <UserNav />
                </div>
                <div className="col">
                    user history
            </div>
            </div>
        </div>
    )
}

export default UserDashboard
