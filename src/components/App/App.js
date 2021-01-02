import React from "react";
import "./App.css";
import { HeaderHOC } from "../HeaderHOC/HeaderHOC";
import { Footer } from "../Footer/Footer";
import { HomePage } from "../HomePage/HomePage";
import { AddSpot } from "../AddSpot/AddSpot";
import { Route, Switch } from "react-router-dom";
import { SearchMenu } from "../SearchMenu/SearchMenu";
import { Error } from "../Error/Error";
import { SpotPage } from "../SpotPage/SpotPage";
import { FormSuccessOverlay } from "../FormSuccessOverlay/FormSuccessOverlay";
import "../root.scss";
import { Signing } from "../Signing/Signing";
import { ForgottenPassword } from "../ForgottenPassword/ForgottenPassword";
import firebase from "../../util/firebaseSetUp";
import { Profile } from "../Profile/Profile";
import myAPI from "../../util/myAPI";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHome: true,
      isMobile: false,
      locationDetected: true,
      isSignedIn: false,
      extraInfo: false,
      user: null,
    };
    this.whatSize = this.whatSize.bind(this);
    this.onInit = this.onInit.bind(this);
  }

  onInit() {
    let currUser = null;
    console.log("OnInit triggered");

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("runed");
        // User is signed in.

        let { email, photoURL: profilePic, providerId, uid } = user;

        // let displayName = null;

        currUser = {
          // displayName,
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
        currUser = null;
        console.log("no user logged in");
        this.setState({ user: currUser, isSignedIn: false, extraInfo: false });
      }
    });
  }

  whatSize() {
    let wid = window.innerWidth;
    if (wid > 500 && this.state.isMobile === true) {
      this.setState({ isMobile: false });
    } else if (wid <= 500 && this.state.isMobile === false) {
      this.setState({ isMobile: true });
    }
  }

  async getExtraUserData(user) {
    let userData = await myAPI.getUserData(user.uid);
    return userData;
  }

  componentDidMount() {
    this.whatSize(); 
    window.addEventListener("resize", this.whatSize);
    window.addEventListener("hashchange", this.onInit);
    this.onInit();
  }

  componentDidUpdate() {
    if (this.state.user !== null && this.state.extraInfo === false) {
      this.getExtraUserData(this.state.user).then((res) => {
        if (res.ok) {
          res.json().then((result) => {
            let update = { ...this.state.user, ...result };
            this.setState({ user: update, extraInfo: true });
          });
        }
      });
    }
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
        <HeaderHOC props={this.state} />
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
                <AddSpot {...props} userInfo={this.state.user} isSignedIn={this.state.isSignedIn}/>
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
        <Footer user={this.state.user} />
      </div>
    );
  }
}
export default App;
