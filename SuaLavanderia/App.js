import React, {Component} from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

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

export default class App extends Component {
  render() {
    return (
      <RootStack />
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
  },{
    initialRouteName: 'Home',
  }
);

const RootStack = createStackNavigator(
  {
    MovimentacaoDeCaixaDetails: MovimentacaoDeCaixaDetails,
    RootDrawer: RootDrawer,
  },{
    initialRouteName: 'RootDrawer',
  }
);