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
import LavagemDetailsCliente from './screens/details/LavagemDetailsCliente';
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

const DrawerAdministrador = createDrawerNavigator(
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

const DrawerGerenteGeral = createDrawerNavigator(
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

const DrawerSubGerenteGeral = createDrawerNavigator(
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

const DrawerGerenteDeOperacoes = createDrawerNavigator(
  {
    Home: HomeScreen,
    Lavagem: LavagemScreen,
    Roupa: RoupaScreen,
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

const DrawerAtendente = createDrawerNavigator(
  {
    Home: HomeScreen,
    Lavagem: LavagemScreen,
    Roupa: RoupaScreen,
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

const DrawerCliente = createDrawerNavigator(
  {
    Home: HomeScreen,
    Lavagem: LavagemScreen,
    Sobre: SobreScreen,
    Logout: LogoutScreen,
  },{
    initialRouteName: 'Home',
    navigationOptions: {
      headerTransparent: true,
    },
  }
);

const StackAdministrador = createStackNavigator(
  {
    MovimentacaoDeCaixaDetails: MovimentacaoDeCaixaDetails,
    LavagemDetails: LavagemDetails,
    RoupaEmLavagemDetails: RoupaEmLavagemDetails,
    RoupaDetails: RoupaDetails,
    Drawer: DrawerAdministrador,
  },{
    initialRouteName: 'Drawer',
    navigationOptions: {
      headerTransparent: true,
    },
  }
);

const StackGerenteGeral = createStackNavigator(
  {
    MovimentacaoDeCaixaDetails: MovimentacaoDeCaixaDetails,
    LavagemDetails: LavagemDetails,
    RoupaEmLavagemDetails: RoupaEmLavagemDetails,
    RoupaDetails: RoupaDetails,
    Drawer: DrawerGerenteGeral,
  },{
    initialRouteName: 'Drawer',
    navigationOptions: {
      headerTransparent: true,
    },
  }
);

const StackSubGerenteGeral = createStackNavigator(
  {
    MovimentacaoDeCaixaDetails: MovimentacaoDeCaixaDetails,
    LavagemDetails: LavagemDetails,
    RoupaEmLavagemDetails: RoupaEmLavagemDetails,
    RoupaDetails: RoupaDetails,
    Drawer: DrawerSubGerenteGeral,
  },{
    initialRouteName: 'Drawer',
    navigationOptions: {
      headerTransparent: true,
    },
  }
);

const StackGerenteDeOperacoes = createStackNavigator(
  {
    LavagemDetails: LavagemDetails,
    RoupaEmLavagemDetails: RoupaEmLavagemDetails,
    RoupaDetails: RoupaDetails,
    Drawer: DrawerGerenteDeOperacoes,
  },{
    initialRouteName: 'Drawer',
    navigationOptions: {
      headerTransparent: true,
    },
  }
);

const StackAtendente = createStackNavigator(
  {
    LavagemDetails: LavagemDetails,
    RoupaEmLavagemDetails: RoupaEmLavagemDetails,
    RoupaDetails: RoupaDetails,
    Drawer: DrawerAtendente,
  },{
    initialRouteName: 'Drawer',
    navigationOptions: {
      headerTransparent: true,
    },
  }
);

const StackCliente = createStackNavigator(
  {
    LavagemDetails: LavagemDetailsCliente,
    Drawer: DrawerCliente,
  },{
    initialRouteName: 'Drawer',
    navigationOptions: {
      headerTransparent: true,
    },
  }
);

const LoginStack = createSwitchNavigator(
  {
    LoadingLogin: LoadingLoginScreen, 
    Login: LoginScreen,
    StackAdministrador: StackAdministrador,
    StackGerenteGeral: StackGerenteGeral,
    StackSubGerenteGeral: StackSubGerenteGeral,
    StackGerenteDeOperacoes: StackGerenteDeOperacoes,
    StackAtendente: StackAtendente,
    StackCliente: StackCliente,
  },{
    initialRouteName: 'LoadingLogin',
    navigationOptions: {
      headerTransparent: true,
    },
  }
);