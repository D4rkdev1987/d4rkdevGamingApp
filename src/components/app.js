import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Switch, 
  Route
} from 'react-router-dom';
import axios from 'axios';

import { FortAwesomeIcon } from "@fortawesome/react-fontawesome";

import NavigationContainer from "./navigation/navigation-container";
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Blog from './pages/blog';
import BlogDetail from './pages/blog-detail'
import PortfolioDetail from './portfolio/portfolio-detail';
import PortfolioManager from './pages/portfolio-manager'
import Auth from './pages/auth'
import NoMatch from './pages/no-match'
import Icons from '../helpers/icons'


export default class App extends Component {
  constructor(props) {
    super(props);

    Icons();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    }

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnSuccessfulLogin = this.handleUnSuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    })
  }

  handleUnSuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  checkLoginStatus() {
    return axios.get("https://api.devcamp.space/logged_in", {
      withCredentials: true 
    }).then(response => {
      const loggedIn = response.data.logged_in;
      const loggedInStatus = this.state.loggedInStatus;

      //conditional checks if logged in
      // If loggedIn and status is LOGGED_IN then do nothing return data
      // If response is true ( loggedIn) if state is not logged in => update state and change to logged in
      // If not loggedIN (api call) and status is loggedIn then make sure to log out(update state and log out)
      if (loggedIn && loggedInStatus === "LOGGED_IN") {
        return loggedIn;
      } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
        this.setState({
          loggedInStatus: "LOGGED_IN"
        });
      } else if (!loggedIn && loggedInStatus === "LOGGED_IN") {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN"
        });
      }
    })
    .catch(error => {
      console.log("error", error)
    })
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  authorizedPages() {
    return [
      <Route key="portfolio-manager" path="/portfolio-manager" component={PortfolioManager} />
    ]
  }

  render() {
    return (
      <div className='container'>       
        <Router>
          <div>
            <h1>D4rkdev Gaming</h1>
            <NavigationContainer 
              loggedInStatus={this.state.loggedInStatus} 
              handleSuccessfulLogout={this.handleSuccessfulLogout}  
            />

            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/about' component={About} />
              <Route 
                path='/auth' 
                render={ props => (
                  <Auth
                    {...props}
                    handleSuccessfulLogin={this.handleSuccessfulLogin}
                    handleUnSuccessfulLogin={this.handleUnSuccessfulLogin}
                  />  
                )} 
              />
              <Route path='/blog' 
                render={props => (
                  <Blog {...props} loggedInStatus={this.state.loggedInStatus} />
                )}
              />



              <Route path='/b/:slug' 
                  render={props => (
                    <BlogDetail {...props} loggedInStatus={this.state.loggedInStatus} />
                  )}
              />

              <Route path='/contact' component={Contact} />
              {this.state.loggedInStatus === "LOGGED_IN" ? this.authorizedPages() : null}
              <Route 
                exact path="/portfolio/:slug" 
                component={PortfolioDetail} 

              />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>               
      </div>
    );
  }
}
