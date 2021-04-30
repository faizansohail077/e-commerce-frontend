import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Navbar from './components/Navigation';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/register';
import CompleteRegister from './screens/RegisterComplete';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useDispatch } from 'react-redux'
import ForgotPassword from './screens/ForgotPassword';
import Admin from './screens/Admin';
import UserDashboard from './screens/userDashboard';
import UserRoute from './components/Routes/UserRoute';
import Wishlist from './screens/userDashboard/components/WishList';
import Password from './screens/userDashboard/components/Password/index.';
import AdminRoute from './components/Routes/AdminRoute';
import { callUser } from './functions';



function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idToken = await user.getIdTokenResult()
        callUser(idToken.token)
          .then(res => {
            dispatch({
              type: 'LOGGED_IN_USER', payload: {
                name: res.data.name,
                email: res.data.email,
                token: idToken.token,
                role: res.data.role,
                _id: res.data._id
              }
            })
          })
          .catch(err => console.log('this is error', err.message))

      }
    })
    return () => unsubcribe()
  }, [])
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Switch>
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Signup" component={Register} />
        <Route exact path="/register/complete" component={CompleteRegister} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <Route exact path="/admin/dashboard" component={Admin} />
        <Route exact path="/" component={Home} />
        <UserRoute exact path="/user/history" component={UserDashboard} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <AdminRoute exact path="/admin/dashboard" component={Admin} />
      </Switch>
    </Router>
  );
}

export default App;
