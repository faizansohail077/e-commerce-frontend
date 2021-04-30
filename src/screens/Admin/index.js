import { useSelector } from "react-redux"

function Admin() {
    const user = useSelector(state => state.userReducer)

    return (
        <div>
            AdminAdmin
        </div>
    )
}

export default Admin
