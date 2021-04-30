
import {
    BrowserRouter as Router,
    Route,
    Redirect,
} from "react-router-dom";
import { useSelector } from 'react-redux'
import LoadingToRedirect from "./LoadingToRedirect";
import { useEffect, useState } from "react";
import { currentAdmin } from "../../functions";

const AdminRoute = ({ children, ...rest }) => {
    const user = useSelector((state) => ({ ...state }));
    const [ok, setOk] = useState(false);

    useEffect(() => {
        if (user && user.token) {
            currentAdmin(user.token)
                .then((res) => {
                    console.log("CURRENT ADMIN RES", res);
                    setOk(true);
                })
                .catch((err) => {
                    console.log("ADMIN ROUTE ERR", err);
                    setOk(false);
                });
        }
    }, [user]);

    return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoute;
