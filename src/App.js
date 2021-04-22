import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
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

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idToken = await user.getIdTokenResult()

        dispatch({
          type: 'LOGGED_IN_USER', payload: {
            email: user.email,
            token: idToken.token
          }
        })

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
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
