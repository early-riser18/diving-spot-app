import React from 'react';
import './App.css';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { HomePage } from '../HomePage/HomePage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
      apiResponse: ''
    };
  this.whatSize = this.whatSize.bind(this);
  };
 
  callAPI() {
    fetch("http://localhost:5000/")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
}
componentWillMount() {
  this.callAPI();
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
            <Route component={Error} />
          </Switch>
          <p>;{this.state.apiResponse}</p>

        </main>
        <Footer />
      </div>

    );
  }
}
export default App;
