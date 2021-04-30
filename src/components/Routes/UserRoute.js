import { BrowserRouter as Router, Route, Redirect, } from "react-router-dom";
import { useSelector } from 'react-redux'
import LoadingToRedirect from "./LoadingToRedirect";

function UserRoute({ children, ...rest }) {

    const state = useSelector(state => state.userReducer)
    return state && state.token ? (
        <Route
            {...rest}
            render={
                () => children}
        />
    ) : (<h1 className="text-danger"><LoadingToRedirect /></h1>);
}

export default UserRoute
