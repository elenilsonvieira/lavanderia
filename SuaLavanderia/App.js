import React, {Component} from 'react';
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';

import HomeScreen from "./screens/HomeScreen";
import HomeScreenCliente from "./screens/HomeScreenCliente";
import HomeScreenAplicativo from "./screens/HomeScreenAplicativo";
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
import LavagemScreenOperacoes from './screens/LavagemScreenOperacoes';
import MovimentacaoDeCaixaScreen from './screens/MovimentacaoDeCaixaScreen';
import CaixaScreen from './screens/CaixaScreen';
import MovimentacaoDeCaixaDetails from './screens/details/MovimentacaoDeCaixaDetails';
import CaixaDetails from './screens/details/CaixaDetails';
import CaixaDetailsSoLeitura from './screens/details/CaixaDetailsSoLeitura';
import AvaliacaoDetails from './screens/details/AvaliacaoDetails';
import AvaliacaoDetailsSoLeitura from './screens/details/AvaliacaoDetailsSoLeitura';
import LavagemDetails from './screens/details/LavagemDetails';
import LavagemDetailsEdit from './screens/details/LavagemDetailsEdit';
import LavagemDetailsCliente from './screens/details/LavagemDetailsCliente';
import LavagemDetailsOperacoes from './screens/details/LavagemDetailsOperacoes';
import LavagemDetailsPapelOperacoes from './screens/details/LavagemDetailsPapelOperacoes';
import LavagemDetailsOperacaoEmpacotar from './screens/details/LavagemDetailsOperacaoEmpacotar';
import RoupaEmLavagemDetails from './screens/details/RoupaEmLavagemDetails';
import LoginScreen from './screens/LoginScreen';
import LogoutScreen from './screens/LogoutScreen';
import LoadingLoginScreen from './screens/LoadingLoginScreen';
import RoupaDetails from './screens/details/RoupaDetails';
import MaterialDetails from './screens/details/MaterialDetails';
import RoupasDoClienteScreen from './screens/RoupasDoClienteScreen';
import ContatoScreen from './screens/ContatoScreen';
import OperacoesScreen from './screens/OperacoesScreen';
import OperacoesCelularScreen from './screens/OperacoesCelularScreen';
import OperacaoLavarScreen from './screens/OperacaoLavarScreen';
import OperacaoRecolherScreen from './screens/OperacaoRecolherScreen';
import OperacaoPassarScreen from './screens/OperacaoPassarScreen';
import OperacaoEmpacotarScreen from './screens/OperacaoEmpacotarScreen';
import OperacaoRetirarMaterialScreen from './screens/OperacaoRetirarMaterialScreen';
import MaterialScreen from './screens/MaterialScreen';
import MaterialScreenPapelOperacoes from './screens/MaterialScreenPapelOperacoes';
import ListaDeComprasScreen from './screens/ListaDeComprasScreen';
import BancoDeHorasScreen from './screens/BancoDeHorasScreen';
import BancoDeHorasDetails from './screens/details/BancoDeHorasDetails';
import FechamentoDePontoDetails from './screens/details/FechamentoDePontoDetails';
import OperacaoListaDeEntregaScreen from './screens/OperacaoListaDeEntregaScreen';
import ListaDeEntregaDetails from './screens/details/ListaDeEntregaDetails';
import LavagemParaListaDeEntregaScreen from './screens/LavagemParaListaDeEntregaScreen';
import UsuarioScreen from './screens/UsuarioScreen';
import UsuarioDetails from './screens/details/UsuarioDetails';
import OperacaoListaDeEntregaDiretaScreen from './screens/OperacaoListaDeEntregaDiretaScreen';
import OperacoesTapeteScreen from './screens/OperacoesTapeteScreen';
import OperacaoLavarTapeteScreen from './screens/OperacaoLavarTapeteScreen';
import OperacaoProntoTapeteScreen from './screens/OperacaoProntoTapeteScreen';
import OperacaoEntregarTapeteScreen from './screens/OperacaoEntregarTapeteScreen';

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
    Caixa: CaixaScreen,
    Material: MaterialScreen,
    Operacoes: OperacoesCelularScreen,
    OperacoesTapete: OperacoesTapeteScreen,
    BancoDeHoras: BancoDeHorasScreen,
    Usuario: UsuarioScreen,
    // Tipo: TipoScreen,
    // Tamanho: TamanhoScreen,
    // Tecido: TecidoScreen,
    // Cor: CorScreen,
    // Marca: MarcaScreen,
    // Unidade: UnidadeScreen,
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
    Caixa: CaixaScreen,
    Material: MaterialScreen,
    Operacoes: OperacoesCelularScreen,
    OperacoesTapete: OperacoesTapeteScreen,
    BancoDeHoras: BancoDeHorasScreen,
    Usuario: UsuarioScreen,
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
    Caixa: CaixaScreen,
    Material: MaterialScreen,
    Operacoes: OperacoesCelularScreen,
    OperacoesTapete: OperacoesTapeteScreen,
    BancoDeHoras: BancoDeHorasScreen,
    Usuario: UsuarioScreen,
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
    Material: MaterialScreen,
    Operacoes: OperacoesCelularScreen,
    OperacoesTapete: OperacoesTapeteScreen,
    BancoDeHoras: BancoDeHorasScreen,
    Sobre: SobreScreen,
    Logout: LogoutScreen,
  },{
    initialRouteName: 'Home',
    navigationOptions: {
      headerTransparent: true,
    },
  }
);

const DrawerSupervisorDeOperacoes = createDrawerNavigator(
  {
    Home: HomeScreen,
    Lavagem: LavagemScreenOperacoes,
    Operacoes: OperacoesCelularScreen,
    OperacoesTapete: OperacoesTapeteScreen,
    Roupa: RoupaScreen,
    Material: MaterialScreenPapelOperacoes,
    BancoDeHoras: BancoDeHorasScreen,
    Sobre: SobreScreen,
    Logout: LogoutScreen,
  },{
    initialRouteName: 'Home',
    navigationOptions: {
      headerTransparent: true,
    },
  }
);

const DrawerOperacoes = createDrawerNavigator(
  {
    Home: HomeScreen,
    BancoDeHoras: BancoDeHorasScreen,
    Sobre: SobreScreen,
    Logout: LogoutScreen,
  },{
    initialRouteName: 'Home',
    navigationOptions: {
      headerTransparent: true,
    },
  }
);

const DrawerAplicativo = createDrawerNavigator(
  {
    Home: HomeScreenAplicativo,
    Lavagem: LavagemScreenOperacoes,
    Roupa: RoupaScreen,
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
    MovimentacaoDeCaixa: MovimentacaoDeCaixaScreen,
    Caixa: CaixaScreen,
    Usuario: UsuarioScreen,
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
    Home: HomeScreenCliente,
    Lavagem: LavagemScreenCliente,
    Contato: ContatoScreen,
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
    CaixaDetails: CaixaDetails,
    CaixaDetailsSoLeitura: CaixaDetailsSoLeitura,
    AvaliacaoDetails: AvaliacaoDetails,
    AvaliacaoDetailsSoLeitura: AvaliacaoDetailsSoLeitura,
    LavagemDetails: LavagemDetails,
    LavagemDetailsOperacoes: LavagemDetailsOperacoes,
    LavagemDetailsOperacaoEmpacotar: LavagemDetailsOperacaoEmpacotar,
    LavagemDetailsEdit: LavagemDetailsEdit,
    RoupaEmLavagemDetails: RoupaEmLavagemDetails,
    RoupaDetails: RoupaDetails,
    OperacaoLavar: OperacaoLavarScreen,
    OperacaoRecolher: OperacaoRecolherScreen,
    OperacaoPassar: OperacaoPassarScreen,
    OperacaoEmpacotar: OperacaoEmpacotarScreen,
    OperacaoRetirarMaterial: OperacaoRetirarMaterialScreen,
    OperacaoListaDeEntrega: OperacaoListaDeEntregaScreen,
    OperacaoLavarTapete: OperacaoLavarTapeteScreen,
    OperacaoProntoTapete: OperacaoProntoTapeteScreen,
    OperacaoEntregarTapete: OperacaoEntregarTapeteScreen,
    MaterialDetails: MaterialDetails,
    RoupasDoCliente: RoupasDoClienteScreen,
    ListaDeCompras: ListaDeComprasScreen,
    BancoDeHorasDetails: BancoDeHorasDetails,
    ListaDeEntregaDetails: ListaDeEntregaDetails,
    LavagemParaListaDeEntrega: LavagemParaListaDeEntregaScreen,
    OperacaoListaDeEntregaDireta: OperacaoListaDeEntregaDiretaScreen,
    FechamentoDePontoDetails: FechamentoDePontoDetails,
    UsuarioDetails: UsuarioDetails,
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
    CaixaDetails: CaixaDetails,
    CaixaDetailsSoLeitura: CaixaDetailsSoLeitura,
    AvaliacaoDetails: AvaliacaoDetails,
    AvaliacaoDetailsSoLeitura: AvaliacaoDetailsSoLeitura,
    LavagemDetails: LavagemDetails,
    LavagemDetailsOperacoes: LavagemDetailsOperacoes,
    LavagemDetailsOperacaoEmpacotar: LavagemDetailsOperacaoEmpacotar,
    LavagemDetailsEdit: LavagemDetailsEdit,
    RoupaEmLavagemDetails: RoupaEmLavagemDetails,
    RoupasDoCliente: RoupasDoClienteScreen,
    RoupaDetails: RoupaDetails,
    OperacaoLavar: OperacaoLavarScreen,
    OperacaoRecolher: OperacaoRecolherScreen,
    OperacaoPassar: OperacaoPassarScreen,
    OperacaoEmpacotar: OperacaoEmpacotarScreen,
    OperacaoRetirarMaterial: OperacaoRetirarMaterialScreen,
    OperacaoListaDeEntrega: OperacaoListaDeEntregaScreen,
    OperacaoLavarTapete: OperacaoLavarTapeteScreen,
    OperacaoProntoTapete: OperacaoProntoTapeteScreen,
    OperacaoEntregarTapete: OperacaoEntregarTapeteScreen,
    MaterialDetails: MaterialDetails,
    ListaDeCompras: ListaDeComprasScreen,
    BancoDeHorasDetails: BancoDeHorasDetails,
    ListaDeEntregaDetails: ListaDeEntregaDetails,
    LavagemParaListaDeEntrega: LavagemParaListaDeEntregaScreen,
    OperacaoListaDeEntregaDireta: OperacaoListaDeEntregaDiretaScreen,
    FechamentoDePontoDetails: FechamentoDePontoDetails,
    UsuarioDetails: UsuarioDetails,
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
    CaixaDetails: CaixaDetails,
    CaixaDetailsSoLeitura: CaixaDetailsSoLeitura,
    AvaliacaoDetails: AvaliacaoDetails,
    AvaliacaoDetailsSoLeitura: AvaliacaoDetailsSoLeitura,
    LavagemDetails: LavagemDetails,
    LavagemDetailsOperacoes: LavagemDetailsOperacoes,
    LavagemDetailsOperacaoEmpacotar: LavagemDetailsOperacaoEmpacotar,
    LavagemDetailsEdit: LavagemDetailsEdit,
    RoupaEmLavagemDetails: RoupaEmLavagemDetails,
    RoupasDoCliente: RoupasDoClienteScreen,
    RoupaDetails: RoupaDetails,
    OperacaoLavar: OperacaoLavarScreen,
    OperacaoRecolher: OperacaoRecolherScreen,
    OperacaoPassar: OperacaoPassarScreen,
    OperacaoEmpacotar: OperacaoEmpacotarScreen,
    OperacaoRetirarMaterial: OperacaoRetirarMaterialScreen,
    OperacaoListaDeEntrega: OperacaoListaDeEntregaScreen,
    OperacaoLavarTapete: OperacaoLavarTapeteScreen,
    OperacaoProntoTapete: OperacaoProntoTapeteScreen,
    OperacaoEntregarTapete: OperacaoEntregarTapeteScreen,
    OperacaoListaDeEntregaDireta: OperacaoListaDeEntregaDiretaScreen,
    MaterialDetails: MaterialDetails,
    ListaDeCompras: ListaDeComprasScreen,
    BancoDeHorasDetails: BancoDeHorasDetails,
    ListaDeEntregaDetails: ListaDeEntregaDetails,
    LavagemParaListaDeEntrega: LavagemParaListaDeEntregaScreen,
    FechamentoDePontoDetails: FechamentoDePontoDetails,
    UsuarioDetails: UsuarioDetails,
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
    LavagemDetailsOperacoes: LavagemDetailsOperacoes,
    LavagemDetailsOperacaoEmpacotar: LavagemDetailsOperacaoEmpacotar,
    LavagemDetailsEdit: LavagemDetailsEdit,
    AvaliacaoDetailsSoLeitura: AvaliacaoDetailsSoLeitura,
    AvaliacaoDetails: AvaliacaoDetailsSoLeitura,
    RoupaEmLavagemDetails: RoupaEmLavagemDetails,
    RoupasDoCliente: RoupasDoClienteScreen,
    RoupaDetails: RoupaDetails,
    OperacaoLavar: OperacaoLavarScreen,
    OperacaoRecolher: OperacaoRecolherScreen,
    OperacaoPassar: OperacaoPassarScreen,
    OperacaoEmpacotar: OperacaoEmpacotarScreen,
    OperacaoRetirarMaterial: OperacaoRetirarMaterialScreen,
    OperacaoListaDeEntrega: OperacaoListaDeEntregaScreen,
    OperacaoLavarTapete: OperacaoLavarTapeteScreen,
    OperacaoProntoTapete: OperacaoProntoTapeteScreen,
    OperacaoEntregarTapete: OperacaoEntregarTapeteScreen,
    BancoDeHorasDetails: BancoDeHorasDetails,
    FechamentoDePontoDetails: FechamentoDePontoDetails,
    ListaDeEntregaDetails: ListaDeEntregaDetails,
    LavagemParaListaDeEntrega: LavagemParaListaDeEntregaScreen,
    OperacaoListaDeEntregaDireta: OperacaoListaDeEntregaDiretaScreen,
    Drawer: DrawerGerenteDeOperacoes,
  },{
    initialRouteName: 'Drawer',
    navigationOptions: {
      headerTransparent: true,
    },
  }
);

const StackSupervisorDeOperacoes = createStackNavigator(
  {
    LavagemDetails: LavagemDetailsPapelOperacoes,
    LavagemDetailsOperacoes: LavagemDetailsOperacoes,
    LavagemDetailsEdit: LavagemDetailsEdit,
    LavagemDetailsOperacaoEmpacotar: LavagemDetailsOperacaoEmpacotar,
    AvaliacaoDetailsSoLeitura: AvaliacaoDetailsSoLeitura,
    AvaliacaoDetails: AvaliacaoDetailsSoLeitura,
    RoupaEmLavagemDetails: RoupaEmLavagemDetails,
    RoupasDoCliente: RoupasDoClienteScreen,
    RoupaDetails: RoupaDetails,
    Operacoes: OperacoesCelularScreen,
    OperacaoLavar: OperacaoLavarScreen,
    OperacaoRecolher: OperacaoRecolherScreen,
    OperacaoPassar: OperacaoPassarScreen,
    OperacaoEmpacotar: OperacaoEmpacotarScreen,
    OperacaoRetirarMaterial: OperacaoRetirarMaterialScreen,
    OperacaoListaDeEntrega: OperacaoListaDeEntregaScreen,
    OperacaoLavarTapete: OperacaoLavarTapeteScreen,
    OperacaoProntoTapete: OperacaoProntoTapeteScreen,
    OperacaoEntregarTapete: OperacaoEntregarTapeteScreen,
    ListaDeEntregaDetails: ListaDeEntregaDetails,
    LavagemParaListaDeEntrega: LavagemParaListaDeEntregaScreen,
    OperacaoListaDeEntregaDireta: OperacaoListaDeEntregaDiretaScreen,
    BancoDeHorasDetails: BancoDeHorasDetails,
    FechamentoDePontoDetails: FechamentoDePontoDetails,
    Drawer: DrawerSupervisorDeOperacoes,
  },{
    initialRouteName: 'Drawer',
    navigationOptions: {
      headerTransparent: true,
    },
  }
);

const StackOperacoes = createStackNavigator(
  {
    AvaliacaoDetailsSoLeitura: AvaliacaoDetailsSoLeitura,
    AvaliacaoDetails: AvaliacaoDetailsSoLeitura,
    BancoDeHorasDetails: BancoDeHorasDetails,
    FechamentoDePontoDetails: FechamentoDePontoDetails,
    Drawer: DrawerOperacoes,
  },{
    initialRouteName: 'Drawer',
    navigationOptions: {
      headerTransparent: true,
    },
  }
);

const StackAplicativo = createStackNavigator(
  {
    LavagemDetails: LavagemDetailsOperacoes,
    LavagemDetailsOperacoes: LavagemDetailsOperacoes,
    LavagemDetailsOperacaoEmpacotar: LavagemDetailsOperacaoEmpacotar,
    AvaliacaoDetailsSoLeitura: AvaliacaoDetailsSoLeitura,
    AvaliacaoDetails: AvaliacaoDetailsSoLeitura,
    RoupaEmLavagemDetails: RoupaEmLavagemDetails,
    RoupasDoCliente: RoupasDoClienteScreen,
    RoupaDetails: RoupaDetails,
    Operacoes: OperacoesScreen,
    OperacaoLavar: OperacaoLavarScreen,
    OperacaoRecolher: OperacaoRecolherScreen,
    OperacaoPassar: OperacaoPassarScreen,
    OperacaoEmpacotar: OperacaoEmpacotarScreen,
    OperacaoRetirarMaterial: OperacaoRetirarMaterialScreen,
    OperacaoListaDeEntrega: OperacaoListaDeEntregaScreen,
    OperacaoLavarTapete: OperacaoLavarTapeteScreen,
    OperacaoProntoTapete: OperacaoProntoTapeteScreen,
    OperacaoEntregarTapete: OperacaoEntregarTapeteScreen,
    ListaDeEntregaDetails: ListaDeEntregaDetails,
    LavagemParaListaDeEntrega: LavagemParaListaDeEntregaScreen,
    OperacaoListaDeEntregaDireta: OperacaoListaDeEntregaDiretaScreen,
    Drawer: DrawerAplicativo,
  },{
    initialRouteName: 'Drawer',
    navigationOptions: {
      headerTransparent: true,
    },
  }
);

const StackAtendente = createStackNavigator(
  {
    MovimentacaoDeCaixaDetails: MovimentacaoDeCaixaDetails,
    CaixaDetails: CaixaDetails,
    CaixaDetailsSoLeitura: CaixaDetailsSoLeitura,
    LavagemDetails: LavagemDetails,
    LavagemDetailsEdit: LavagemDetailsEdit,
    AvaliacaoDetails: AvaliacaoDetails,
    AvaliacaoDetailsSoLeitura: AvaliacaoDetailsSoLeitura,
    RoupaEmLavagemDetails: RoupaEmLavagemDetails,
    RoupasDoCliente: RoupasDoClienteScreen,
    RoupaDetails: RoupaDetails,
    UsuarioDetails: UsuarioDetails,
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
    StackSupervisorDeOperacoes: StackSupervisorDeOperacoes,
    StackOperacoes: StackOperacoes,
    StackAtendente: StackAtendente,
    StackCliente: StackCliente,
    StackAplicativo: StackAplicativo,
  },{
    initialRouteName: 'LoadingLogin',
    navigationOptions: {
      headerTransparent: true,
    },
  }
);