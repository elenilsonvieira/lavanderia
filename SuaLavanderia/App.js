import React, {Component} from 'react';
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';

import HomeScreen from "./screens/HomeScreen";
import RoupaScreen from "./screens/RoupaScreen";
import SobreScreen from './screens/SobreScreen';
import UnidadeScreen from './screens/UnidadeScreen';
import TipoScreen from './screens/TipoScreen';
import CorScreen from './screens/CorScreen';
import TecidoScreen from './screens/TecidoScreen';
import TamanhoScreen from './screens/TamanhoScreen';
import MarcaScreen from './screens/MarcaScreen';
import LavagemScreen from './screens/LavagemScreen';
import MovimentacaoDeCaixaScreen from './screens/MovimentacaoDeCaixaScreen';
import MovimentacaoDeCaixaDetails from './screens/details/MovimentacaoDeCaixaDetails';
import LavagemDetails from './screens/details/LavagemDetails';
import RoupaEmLavagemDetails from './screens/details/RoupaEmLavagemDetails';
import LoginScreen from './screens/LoginScreen';
import LogoutScreen from './screens/LogoutScreen';
import LoadingLoginScreen from './screens/LoadingLoginScreen';
import RoupaDetails from './screens/details/RoupaDetails';

export default class App extends Component {
  render() {
    return (
      <LoginStack />
    );
  }
}

const RootDrawer = createDrawerNavigator(
  {
    Home: HomeScreen,
    Lavagem: LavagemScreen,
    Roupa: RoupaScreen,
    MovimentacaoDeCaixa: MovimentacaoDeCaixaScreen,
    Tipo: TipoScreen,
    Tamanho: TamanhoScreen,
    Tecido: TecidoScreen,
    Cor: CorScreen,
    Marca: MarcaScreen,
    Unidade: UnidadeScreen,
    Sobre: SobreScreen,
    Logout: LogoutScreen,
  },{
    initialRouteName: 'Home',
    navigationOptions: {
      headerTransparent: true,
    },
  }
);

const RootStack = createStackNavigator(
  {
    MovimentacaoDeCaixaDetails: MovimentacaoDeCaixaDetails,
    LavagemDetails: LavagemDetails,
    RoupaEmLavagemDetails: RoupaEmLavagemDetails,
    RoupaDetails: RoupaDetails,
    RootDrawer: RootDrawer,
  },{
    initialRouteName: 'RootDrawer',
    navigationOptions: {
      headerTransparent: true,
    },
  }
);

const LoginStack = createSwitchNavigator(
  {
    LoadingLogin: LoadingLoginScreen, 
    Login: LoginScreen,
    RootStack: RootStack,
  },{
    initialRouteName: 'LoadingLogin',
    navigationOptions: {
      headerTransparent: true,
    },
  }
);