import React, {Component} from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import Home from "./Home";
import RoupaScreen from "./screens/RoupaScreen";
import SobreScreen from './screens/SobreScreen';

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
    RoupaScreen: RoupaScreen,
    SobreScreen: SobreScreen
  },{
    initialRouteName: 'Home',
  }
);
