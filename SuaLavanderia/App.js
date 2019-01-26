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
import LavagemScreenCliente from './screens/LavagemScreenCliente';
import MovimentacaoDeCaixaScreen from './screens/MovimentacaoDeCaixaScreen';
import MovimentacaoDeCaixaDetails from './screens/details/MovimentacaoDeCaixaDetails';
import AvaliacaoDetails from './screens/details/AvaliacaoDetails';
import AvaliacaoDetailsSoLeitura from './screens/details/AvaliacaoDetailsSoLeitura';
import LavagemDetails from './screens/details/LavagemDetails';
import LavagemDetailsEdit from './screens/details/LavagemDetailsEdit';
import LavagemDetailsCliente from './screens/details/LavagemDetailsCliente';
import RoupaEmLavagemDetails from './screens/details/RoupaEmLavagemDetails';
import LoginScreen from './screens/LoginScreen';
import LogoutScreen from './screens/LogoutScreen';
import LoadingLoginScreen from './screens/LoadingLoginScreen';
import RoupaDetails from './screens/details/RoupaDetails';
import RoupasDoClienteScreen from './screens/RoupasDoClienteScreen';

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
    Lavagem: LavagemScreenCliente,
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
    AvaliacaoDetails: AvaliacaoDetails,
    AvaliacaoDetailsSoLeitura: AvaliacaoDetailsSoLeitura,
    LavagemDetails: LavagemDetails,
    LavagemDetailsEdit: LavagemDetailsEdit,
    RoupaEmLavagemDetails: RoupaEmLavagemDetails,
    RoupaDetails: RoupaDetails,
    RoupasDoCliente: RoupasDoClienteScreen,
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
    AvaliacaoDetails: AvaliacaoDetails,
    AvaliacaoDetailsSoLeitura: AvaliacaoDetailsSoLeitura,
    LavagemDetails: LavagemDetails,
    LavagemDetailsEdit: LavagemDetailsEdit,
    RoupaEmLavagemDetails: RoupaEmLavagemDetails,
    RoupasDoCliente: RoupasDoClienteScreen,
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
    AvaliacaoDetails: AvaliacaoDetails,
    AvaliacaoDetailsSoLeitura: AvaliacaoDetailsSoLeitura,
    LavagemDetails: LavagemDetails,
    LavagemDetailsEdit: LavagemDetailsEdit,
    RoupaEmLavagemDetails: RoupaEmLavagemDetails,
    RoupasDoCliente: RoupasDoClienteScreen,
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
    LavagemDetailsEdit: LavagemDetailsEdit,
    AvaliacaoDetailsSoLeitura: AvaliacaoDetailsSoLeitura,
    AvaliacaoDetails: AvaliacaoDetailsSoLeitura,
    RoupaEmLavagemDetails: RoupaEmLavagemDetails,
    RoupasDoCliente: RoupasDoClienteScreen,
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
    LavagemDetailsEdit: LavagemDetailsEdit,
    AvaliacaoDetails: AvaliacaoDetails,
    AvaliacaoDetailsSoLeitura: AvaliacaoDetailsSoLeitura,
    RoupaEmLavagemDetails: RoupaEmLavagemDetails,
    RoupasDoCliente: RoupasDoClienteScreen,
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
    AvaliacaoDetails: AvaliacaoDetails,
    AvaliacaoDetailsSoLeitura: AvaliacaoDetailsSoLeitura,
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