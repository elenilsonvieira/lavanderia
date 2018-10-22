import React, {Component} from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import Home from "./Home";

export default class App extends Component {
  render() {
    return (
      <RootStack />
    );
  }
}

const RootStack = createDrawerNavigator(
  {
    Home: Home,
  },{
    initialRouteName: 'Home',
  }
);
