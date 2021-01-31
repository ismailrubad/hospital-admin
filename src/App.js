import './App.css';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { Router } from 'react-router';
import {
   BrowserRouter, Route, Redirect, Switch,
   withRouter
} from 'react-router-dom';
import history from "./history";
import MainApp from "./components/MainApp";
import SignIn from "./components/SignIn/SignIn";
import MainComponent from "./components";
import { AppProvider } from './context/AppContextProvider';
import { AppContext } from './context/AppContextProvider';


const appTheme = createMuiTheme({
   palette: {
      primary: {
         main: '#1976d2',
         light: '#757ce8'
      },
      secondary: {
         main: "#4caf50",
      }
   },
   status: {
      danger: 'orange',
   },
});

const AuthRoute = ({ component: Component, isUserAuthenticated, ...rest }) => (
   <Route {...rest} render={(props) => (
      isUserAuthenticated === true
         ? <Component {...props} />
         : <Redirect to={{
            pathname: '/signin',
            state: { from: props.location }
         }} />
   )} />
)

const App = () => {
   return (
      <AppProvider>

         <ThemeProvider theme={appTheme}>
            <AppContext.Consumer>
               {(context) => (
                  <div className="App">
                     <Router history={history}>
                        <Switch>
                           <AuthRoute path="/app" isUserAuthenticated={true}
                              component={MainApp} />
                           <Route path="/signin" component={SignIn} />
                           <Route path="/" exact component={MainComponent} />

                        </Switch>
                     </Router>
                  </div>
               )}
            </AppContext.Consumer>

         </ThemeProvider>
      </AppProvider>
   );
}

export default App;
