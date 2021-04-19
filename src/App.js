// import { BrowserRouter as Switch, Router, Route } from 'react-router-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navigation';

import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/register';
function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Signup" component={Register} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
