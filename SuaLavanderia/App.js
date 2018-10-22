import React, {Component} from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import Home from "./Home";
import RoupaScreen from "./screens/RoupaScreen"

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
    RoupaScreen: RoupaScreen
  },{
    initialRouteName: 'Home',
  }
);
