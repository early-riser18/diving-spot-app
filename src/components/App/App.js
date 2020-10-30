import React from "react";
import "./App.css";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { HomePage } from "../HomePage/HomePage";
import { AddSpot } from "../AddSpot/AddSpot";
import { Route, Switch } from "react-router-dom";
import { SearchMenu } from "../SearchMenu/SearchMenu";
import { Error } from "../Error/Error";
import { SpotPage } from "../SpotPage/SpotPage";
import { FormSuccessOverlay } from "../FormSuccessOverlay/FormSuccessOverlay";
import "../root.scss";
import SignIn from "../SignIn/SignIn";
import { Signing } from "../Signing/Signing";
import { ForgottenPassword } from "../ForgottenPassword/ForgottenPassword";
import firebase from "../../util/firebaseSetUp";
import { Profile } from "../Profile/Profile";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHome: true,
      isMobile: false,
      locationDetected: true,
      isSignedIn: false,
      user: {},
    };
    this.whatSize = this.whatSize.bind(this);
    this.onInit = this.onInit.bind(this);
  }
  onInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        console.log(" user logged in");
        let {
          displayName,
          email,
          photoURL: profilePic,
          providerId,
          uid,
        } = user;

        let currUser = {
          displayName,
          email,
          profilePic,
          providerId,
          uid,
          metadata: {
            creationTime: user["metadata"]["creationTime"],
            lastSignInTime: user["metadata"]["lastSignInTime"],
          },
        };

        console.log("currUser: ", currUser);
        this.setState({ user: currUser, isSignedIn: true });
      } else {
        // User is signed out.

        console.log("no user logged in");
        this.setState({user : {}, isSignedIn: false});
      }
    });
  }

  whatSize() {
    let wid = window.innerWidth;
    console.log(wid);
    if (wid > 500 && this.state.isMobile === true) {
      this.setState({ isMobile: false });
    } else if (wid <= 500 && this.state.isMobile === false) {
      this.setState({ isMobile: true });
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.whatSize);
    window.addEventListener("hashchange", this.onInit);
    this.onInit();
  }

  render() {
    // To ally server and client side routing, please refer to https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writing-manually
    // if (window.location.pathname === '/' && this.state.isHome === false) {
    //     this.setState({isHome: true});
    //   } else if (window.location.pathname !== '/' && this.state.isHome === true){
    //     this.setState({isHome: false});
    //   }
    // console.log(window.location.pathname);
    return (
      <div>
        <Header props={this.state} />
        <main>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <HomePage
                  {...props}
                  locationDetected={this.state.locationDetected}
                />
              )}
            />
            <Route
              path="/form-successfully-submited"
              component={FormSuccessOverlay}
            />
            <Route path="/search" component={SearchMenu} />
            <Route path="/sign-in" component={Signing} />
            <Route path="/result" component={SpotPage} />

            <Route
              path="/add-spot"
              render={(props) => (
                <AddSpot {...props} userInfo={this.state.user} />
              )}
            />
            <Route
              path="/mot-de-passe-oublie"
              render={(props) => (
                <ForgottenPassword isSignedIn={this.state.isSignedIn} />
              )}
            />
            <Route
              path="/profile"
              render={(props) => <Profile {...props} props={this.state} />}
            />
            <Route component={Error} />
          </Switch>
        </main>
        <Footer />
      </div>
    );
  }
}
export default App;
