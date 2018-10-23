import React, {Component} from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import HomeScreen from "./screens/HomeScreen";
import RoupaScreen from "./screens/RoupaScreen";
import SobreScreen from './screens/SobreScreen';
import UnidadeScreen from './screens/UnidadeScreen';

export default class App extends Component {
  render() {
    return (
      <RootStack />
    );
  }
}

const RootStack = createDrawerNavigator(
  {
    Home: HomeScreen,
    Roupa: RoupaScreen,
    Unidade: UnidadeScreen,
    Sobre: SobreScreen,
  },{
    initialRouteName: 'Home',
  }
);
