import React, { Component, Fragment } from 'react';
import './App.css';
import {Container} from "reactstrap";
import Toolbar from "./components/UI/Toolbar/Toolbar";
import {Switch, Route} from 'react-router-dom';

import News from "./containers/News/News";
import NewsFull from "./containers/FullNews/NewsFull";
import NewPieceOfNews from "./containers/NewPieceOfNews/NewPieceOfNews";

class App extends Component {
  render() {
    return (
        <Fragment>
          <header><Toolbar/></header>
          <Container style={{marginTop: '20px', textAlign: "center"}}>
            <Switch>
              <Route path="/news" exact component={News}/>
              <Route path="/news/new" component={NewPieceOfNews}/>
              <Route path="/news/:id" component={NewsFull}/>
            </Switch>
          </Container>
        </Fragment>
    );
  }
}

export default App;
