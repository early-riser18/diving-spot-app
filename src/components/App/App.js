import React from 'react';
import './App.css';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { HomePage } from '../HomePage/HomePage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SearchMenu } from '../SearchMenu/SearchMenu';
import { Error } from '../Error/Error';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isHome: true,
      isMobile: false,
      locationDetected: true
    };
  };


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
            <Route component={Error} />

          </Switch>
        </main>
        <Footer />
      </div>

    );
  }
}
export default App;
