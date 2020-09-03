import React from 'react';
import './App.css';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { HomePage } from '../HomePage/HomePage';
import { AddSpot } from '../AddSpot/AddSpot';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { SearchMenu } from '../SearchMenu/SearchMenu';
import { Error } from '../Error/Error';
import { SpotPage } from '../SpotPage/SpotPage';
import '../root.scss';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isHome: false,
      isMobile: false,
      locationDetected: true,
      apiResponse: '',
      user: {
        displayName: 'Anonymous',
        fname: 'undefined',
        lname: 'undefined',
        uid: 'undefined',
        email: 'undefined',
        profilPicture: 'undefined', //should be a placeholder one
        signUpDate: 'undefined',

      }
    };
  this.whatSize = this.whatSize.bind(this);
  };
 
  callAPI() {
   /*fetch("http://localhost:5001/diving-app-eaabe/us-central1/app/read")
    .then(res => res.text())
    .then(res => {
      console.log(res);
      this.setState({ apiResponse: res })
      }) 

      fetch("http://localhost:5001/diving-app-eaabe/us-central1/app/write", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: 'max'})
      }) */
     

        

}
componentWillMount() {
  this.callAPI();
  /*let data = {
    username: "bob",
    age: 7
  };
  data = JSON.stringify(data);
  console.log(data);
  data = JSON.parse(data);
  console.log(data) */
}
  whatSize(){
    let wid = window.innerWidth;
    console.log(wid);
    if (wid > 500 && this.state.isMobile === true){
      this.setState({isMobile: false});
    } else if(wid <= 500 && this.state.isMobile === false){
      this.setState({isMobile: true});
    }
  }

  componentDidMount(){
    window.addEventListener("resize", this.whatSize);
  }

  componentDidUpdate(){
  }

  render() {

    return (
      <div>
        <Header isMobile={this.state.isMobile}
          isHome={this.state.isHome} />
        <main>
          <Switch>
            <Route path='/' render={(props) =>
              <HomePage {...props} locationDetected={this.state.locationDetected} />}
              exact />
            <Route path='/search' component={SearchMenu} />
            <Route path='/result' component={SpotPage} />
            <Route path='/add-a-new-spot' render={(props) =>
              <AddSpot {...props} userInfo={this.state.user} />} />

            <Route component={Error} />
          </Switch>
        </main>
        <p>{this.state.apiResponse}</p>
        <Footer />
      </div>

    );
  }
}
export default App;
