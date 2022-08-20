import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import { useEffect} from "react";
import { getUserAuth } from "./actions";
import { connect } from "react-redux";

function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, []);
  
  return (
    <div className="App">
      {/* Sets up router */}
      <Router>
        <Switch>
          {/* Login page */}
          <Route exact path="/">
            <Login />
          </Route>
          {/* Home page */}
          <Route path="/home">
            {/* Nav bar header */}
            <Header />
            {/* Feed and content */}
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),

});

export default connect(mapStateToProps, mapDispatchToProps)(App);
