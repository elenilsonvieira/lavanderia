/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler'; 
import React, { useState } from 'react';
import {StyleSheet, View, Image} from 'react-native';
import Text from './components/Text';
// import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';
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
import LavagemDetailsOperacaoRecolher from './screens/details/LavagemDetailsOperacaoRecolher';
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
import OperacaoPassadorExtraScreen from './screens/OperacaoPassadorExtraScreen';
import OperacaoEmpacotarScreen from './screens/OperacaoEmpacotarScreen';
import OperacaoRetirarMaterialScreen from './screens/OperacaoRetirarMaterialScreen';
import OperacaoAdicionarMaterialScreen from './screens/OperacaoAdicionarMaterialScreen';
import MaterialScreen from './screens/MaterialScreen';
import MaterialScreenPapelOperacoes from './screens/MaterialScreenPapelOperacoes';
import ListaDeComprasScreen from './screens/ListaDeComprasScreen';
import BancoDeHorasScreen from './screens/BancoDeHorasScreen';
import BancoDeHorasDetails from './screens/details/BancoDeHorasDetails';
import FechamentoDePontoDetails from './screens/details/FechamentoDePontoDetails';
import OperacaoListaDeEntregaScreen from './screens/OperacaoListaDeEntregaScreen';
import ListaDeEntregaDetails from './screens/details/ListaDeEntregaDetails';
import ListaDeEntregaDetailsAtendente from './screens/details/ListaDeEntregaDetailsAtendente';
import LavagemParaListaDeEntregaScreen from './screens/LavagemParaListaDeEntregaScreen';
import UsuarioScreen from './screens/UsuarioScreen';
import UsuarioDetails from './screens/details/UsuarioDetails';
import OperacaoListaDeEntregaDiretaScreen from './screens/OperacaoListaDeEntregaDiretaScreen';
import OperacoesTapeteScreen from './screens/OperacoesTapeteScreen';
import OperacaoLavarTapeteScreen from './screens/OperacaoLavarTapeteScreen';
import OperacaoProntoTapeteScreen from './screens/OperacaoProntoTapeteScreen';
import OperacaoEntregarTapeteScreen from './screens/OperacaoEntregarTapeteScreen';
import BuscaEntregaScreen from './screens/BuscaEntregaScreen';
import ListaDeEntregaScreen from './screens/ListaDeEntregaScreen';
import BuscaDetails from './screens/details/BuscaDetails';
import SelecionarUsuarioDetails from './screens/details/SelecionarUsuarioDetails';
import LavagensPendentesDetails from './screens/details/LavagensPendentesDetails';
import BaterPontoScreen from './screens/BaterPontoScreen';
import TarefaScreen from './screens/TarefaScreen';
import MetaScreen from './screens/MetaScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from './contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EquipamentoScreen from './screens/EquipamentoScreen';
import EquipamentoDetails from './screens/details/EquipamentoDetails';
import MetaDePassagemScreen from './screens/MetaDePassagemScreen';
import VisitaScreen from './screens/VisitaScreen';
import ProcessoScreen from './screens/ProcessoScreen';
import ProcessoDetails from './screens/details/ProcessoDetails';

console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];

const App = () => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            isLoading: false,
            usuario: action.usuario,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isLoading: false,
            isSignout: false,
            usuario: action.usuario,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            usuario: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      usuario: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      var usuario;
      try{
        usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));
      }catch(exception){
      }
      
      var resultado = false;

      try{
        if(usuario){
          const email = usuario.email;
          const hashDaSenha = usuario.hashDaSenha;

          var data = new Date();
      
          var dia = data.getDate();
          var mes = data.getMonth() + 1;
      
          if(dia < 10){
              dia = '0' + dia;
          }
      
          if(mes < 10){
              mes = '0' + mes;
          }

          var dataString = data.getFullYear() + '' + mes + '' + dia;
          var md5 = require('md5');
          var hashDaData = md5(dataString);

          var hash = md5(hashDaSenha + ':' + hashDaData);

          const call = await fetch(`http://painel.sualavanderia.com.br/api/Login.aspx?login=${email}&senha=${hash}`, 
                { 
                    method: 'post' 
                }).then(async function(response){
                  if(response.status == 200){          
                    resultado = true;
                    dispatch({ type: 'RESTORE_TOKEN', usuario: usuario });
                  }else{
                    await AsyncStorage.removeItem("@SuaLavanderia:usuario"); 
                    dispatch({ type: 'RESTORE_TOKEN', usuario: null });
                  }
                }
                ).catch(function(error){
                  dispatch({ type: 'RESTORE_TOKEN', usuario: null });
                });
        }else{
          dispatch({ type: 'RESTORE_TOKEN', usuario: null });
        }     
      }catch(ex){
        dispatch({ type: 'RESTORE_TOKEN', usuario: null });
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      login: async (usuario) => {
        dispatch({ type: 'SIGN_IN', usuario: usuario });
      },
      logout: () => dispatch({ type: 'SIGN_OUT' }),
    }),
    []
  );

  const LoginStack = createNativeStackNavigator();

  function LoginStackFunction()
  {
    if(state.isLoading){
      return <LoadingLoginScreen />
    }

    var usuario = state.usuario;

    if(usuario){
      if(usuario.papel == "Administrador"){
        return(
          <LoginStack.Navigator initialRouteName="StackAdministrador" screenOptions={{headerTransparent: true, headerShown: false, headerLeft: null, gestureEnabled: false, headerBackVisible:false}}>
            <LoginStack.Screen name='StackAdministrador' component={StackAdministradorFunction} options={{ title: '' }} />
          </LoginStack.Navigator>
        );
      }else if(usuario.papel == "GerenteGeral"){
        return(
          <LoginStack.Navigator initialRouteName="StackGerenteGeral" screenOptions={{headerTransparent: true, headerShown: false, headerLeft: null, gestureEnabled: false, headerBackVisible:false}}>
            <LoginStack.Screen name='StackGerenteGeral' component={StackGerenteGeralFunction} options={{ title: '' }} />
          </LoginStack.Navigator>
        );
      }else if(usuario.papel == "SubGerenteGeral"){
        return(
          <LoginStack.Navigator initialRouteName="StackSubGerenteGeral" screenOptions={{headerTransparent: true, headerShown: false, headerLeft: null, gestureEnabled: false, headerBackVisible:false}}>
            <LoginStack.Screen name='StackSubGerenteGeral' component={StackSubGerenteGeralFunction} options={{ title: '' }} />
          </LoginStack.Navigator>
        );
      }else if(usuario.papel == "GerenteDeOperacoes"){
        return(
          <LoginStack.Navigator initialRouteName="StackGerenteDeOperacoes" screenOptions={{headerTransparent: true, headerShown: false, headerLeft: null, gestureEnabled: false, headerBackVisible:false}}>
            <LoginStack.Screen name='StackGerenteDeOperacoes' component={StackGerenteDeOperacoesFunction} options={{ title: '' }} />
          </LoginStack.Navigator>
        );
      }else if(usuario.papel == "SupervisorDeOperacoes"){
        return(
          <LoginStack.Navigator initialRouteName="StackSupervisorDeOperacoes" screenOptions={{headerTransparent: true, headerShown: false, headerLeft: null, gestureEnabled: false, headerBackVisible:false}}>
            <LoginStack.Screen name='StackSupervisorDeOperacoes' component={StackSupervisorDeOperacoesFunction} options={{ title: '' }} />
          </LoginStack.Navigator>
        );
      }else if(usuario.papel == "Operacoes"){
        return(
          <LoginStack.Navigator initialRouteName="StackOperacoes" screenOptions={{headerTransparent: true, headerShown: false, headerLeft: null, gestureEnabled: false, headerBackVisible:false}}>
            <LoginStack.Screen name='StackOperacoes' component={StackOperacoesFunction} options={{ title: '' }} />
          </LoginStack.Navigator>
        );
      }else if(usuario.papel == "Atendente"){
        return(
          <LoginStack.Navigator initialRouteName="StackAtendente" screenOptions={{headerTransparent: true, headerShown: false, headerLeft: null, gestureEnabled: false, headerBackVisible:false}}>
            <LoginStack.Screen name='StackAtendente' component={StackAtendenteFunction} options={{ title: '' }} />
          </LoginStack.Navigator>
        );
      }else if(usuario.papel == "Cliente"){
        return(
          <LoginStack.Navigator initialRouteName="StackCliente" screenOptions={{headerTransparent: true, headerShown: false, headerLeft: null, gestureEnabled: false, headerBackVisible:false}}>
            <LoginStack.Screen name='StackCliente' component={StackClienteFunction} options={{ title: '' }} />
          </LoginStack.Navigator>
        );
      }else if(usuario.papel == "Aplicativo"){
        return(
          <LoginStack.Navigator initialRouteName="StackAplicativo" screenOptions={{headerTransparent: true, headerShown: false, headerLeft: null, gestureEnabled: false, headerBackVisible:false}}>
            <LoginStack.Screen name='StackAplicativo' component={StackAplicativoFunction} options={{ title: '' }} />
          </LoginStack.Navigator>
        );
      }else if(usuario.papel == "Entregador"){
        return(
          <LoginStack.Navigator initialRouteName="StackEntregador" screenOptions={{headerTransparent: true, headerShown: false, headerLeft: null, gestureEnabled: false, headerBackVisible:false}}>
            <LoginStack.Screen name='StackEntregador' component={StackEntregadorFunction} options={{ title: '' }} />
          </LoginStack.Navigator>
        );
      }else {
        return(
          <LoginStack.Navigator initialRouteName="Login" screenOptions={{headerTransparent: true, headerShown: false, headerLeft: null, gestureEnabled: false, headerBackVisible:false}}>
            <LoginStack.Screen name='Login' component={LoginScreen} options={{ title: '' }} />
          </LoginStack.Navigator>
        );
      }
    }else{
      return(
        <LoginStack.Navigator initialRouteName="Login" screenOptions={{headerTransparent: true, headerShown: false, headerLeft: null, gestureEnabled: false, headerBackVisible:false}}>
          <LoginStack.Screen name='Login' component={LoginScreen} options={{ title: '' }} />
        </LoginStack.Navigator>
      );
    }

    // return(
    //   <LoginStack.Navigator initialRouteName="LoadingLogin" screenOptions={{headerTransparent: true, headerShown: false, headerLeft: null, gestureEnabled: false, headerBackVisible:false}}>
    //     <LoginStack.Screen name='StackAdministrador' component={StackAdministradorFunction} options={{ title: '' }} /><LoginStack.Screen name='Login' component={LoginScreen} options={{ title: '' }} />
    //     <LoginStack.Screen name='LoadingLogin' component={LoadingLoginScreen} options={{ title: '' }} />
    //     <LoginStack.Screen name='Login' component={LoginScreen} options={{ title: '' }} />
    //     <LoginStack.Screen name='StackAdministrador' component={StackAdministradorFunction} options={{ title: '' }} />
    //     <LoginStack.Screen name='StackGerenteGeral' component={StackGerenteGeralFunction} options={{ title: '' }} />
    //     <LoginStack.Screen name='StackSubGerenteGeral' component={StackSubGerenteGeralFunction} options={{ title: '' }} />
    //     <LoginStack.Screen name='StackGerenteDeOperacoes' component={StackGerenteDeOperacoesFunction} options={{ title: '' }} />
    //     <LoginStack.Screen name='StackSupervisorDeOperacoes' component={StackSupervisorDeOperacoesFunction} options={{ title: '' }} />
    //     <LoginStack.Screen name='StackOperacoes' component={StackOperacoesFunction} options={{ title: '' }} />
    //     <LoginStack.Screen name='StackAtendente' component={StackAtendenteFunction} options={{ title: '' }} />
    //     <LoginStack.Screen name='StackCliente' component={StackClienteFunction} options={{ title: '' }} />
    //     <LoginStack.Screen name='StackAplicativo' component={StackAplicativoFunction} options={{ title: '' }} />
    //   </LoginStack.Navigator>
    // );
  }
  
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <LoginStackFunction />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

const DrawerAdministrador = createDrawerNavigator();

function DrawerAdministradorFunction()
  {
    return(
      <DrawerAdministrador.Navigator initialRouteName='Home' screenOptions={{headerStyle: {backgroundColor: '#F5FCFF'}}}>
        <DrawerAdministrador.Screen name='Home' component={HomeScreen} options={{ title: 'Início', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/home-icon.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAdministrador.Screen name='Lavagem' component={LavagemScreen} options={{ title: 'Lavagem', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/lavagem_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAdministrador.Screen name='Roupa' component={RoupaScreen} options={{ title: 'Roupa', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/roupa_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAdministrador.Screen name='MovimentacaoDeCaixa' component={MovimentacaoDeCaixaScreen} options={{ title: 'Movimentação de Caixa', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/pagamento_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAdministrador.Screen name='Caixa' component={CaixaScreen} options={{ title: 'Caixa', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/caixaFinanceiro_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAdministrador.Screen name='Material' component={MaterialScreen} options={{ title: 'Material', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/sabao_64x64.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAdministrador.Screen name='Operacoes' component={OperacoesCelularScreen} options={{ title: 'Operações', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/roupa-dobrada_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAdministrador.Screen name='OperacoesTapete' component={OperacoesTapeteScreen} options={{ title: 'Operações com Tapete', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/tapete_128x128.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAdministrador.Screen name='BuscaEntrega' component={BuscaEntregaScreen} options={{ title: 'Busca e Entrega', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/SolicitacaoDeBusca_64x64.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAdministrador.Screen name='Visita' component={VisitaScreen} options={{ title: 'Visita', drawerIcon: ({focused, size}) => (
          <Image
            source={require('./images/Visita_64x64.png')}
            style={styles.icon}
          />
        ), }} />
        <DrawerAdministrador.Screen name='ListaDeEntrega' component={ListaDeEntregaScreen} options={{ title: 'Lista de Entrega', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/marca_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAdministrador.Screen name='BancoDeHoras' component={BancoDeHorasScreen} options={{ title: 'Banco de Horas', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/bater-pontos_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAdministrador.Screen name='Usuario' component={UsuarioScreen} options={{ title: 'Usuário', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/male-icon.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAdministrador.Screen name='Equipamento' component={EquipamentoScreen} options={{ title: 'Equipamento', drawerIcon: ({focused, size}) => (
          <Image
            source={require('./images/maquina-de-lavar_64x64.png')}
            style={styles.icon}
          />
        ), }} />
        <DrawerAdministrador.Screen name='MetaDePassagem' component={MetaDePassagemScreen} options={{ title: 'Meta de Passagem', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/ferro-de-passar_64x64.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAdministrador.Screen name='Meta' component={MetaScreen} options={{ title: 'Meta', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/meta_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAdministrador.Screen name='Tarefa' component={TarefaScreen} options={{ title: 'Tarefa', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/tarefa_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAdministrador.Screen name='Processo' component={ProcessoScreen} options={{ title: 'Processo', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/documento_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAdministrador.Screen name='Sobre' component={SobreScreen} options={{ title: 'Sobre', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/sobre_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAdministrador.Screen name='Logout' component={LogoutScreen} options={{ title: 'Sair', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/logout_32x32.png')}
                style={styles.icon}
              />
           ), }} />
      </DrawerAdministrador.Navigator>
    );
  }

// const DrawerGerenteGeral = createDrawerNavigator(
//   {
//     Home: HomeScreen,
//     Lavagem: LavagemScreen,
//     Roupa: RoupaScreen,
//     MovimentacaoDeCaixa: MovimentacaoDeCaixaScreen,
//     Caixa: CaixaScreen,
//     Material: MaterialScreen,
//     Operacoes: OperacoesCelularScreen,
//     OperacoesTapete: OperacoesTapeteScreen,
//     BuscaEntrega: BuscaEntregaScreen,
//     ListaDeEntrega: ListaDeEntregaScreen,
//     BancoDeHoras: BancoDeHorasScreen,
//     Usuario: UsuarioScreen,
//     Meta: MetaScreen,
//     Tarefa: TarefaScreen,
//     Sobre: SobreScreen,
//     Logout: LogoutScreen,
//   },{
//     initialRouteName: 'Home',
//     navigationOptions: {
//       headerTransparent: true,
//     },
//   }
// );

const DrawerGerenteGeral = createDrawerNavigator();

function DrawerGerenteGeralFunction()
  {
    return(
      <DrawerGerenteGeral.Navigator initialRouteName='Home' screenOptions={{headerStyle: {backgroundColor: '#F5FCFF'}}}>
        <DrawerGerenteGeral.Screen name='Home' component={HomeScreen} options={{ title: 'Início', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/home-icon.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerGerenteGeral.Screen name='Lavagem' component={LavagemScreen} options={{ title: 'Lavagem', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/lavagem_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerGerenteGeral.Screen name='Roupa' component={RoupaScreen} options={{ title: 'Roupa', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/roupa_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerGerenteGeral.Screen name='MovimentacaoDeCaixa' component={MovimentacaoDeCaixaScreen} options={{ title: 'Movimentação de Caixa', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/pagamento_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerGerenteGeral.Screen name='Caixa' component={CaixaScreen} options={{ title: 'Caixa', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/caixaFinanceiro_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerGerenteGeral.Screen name='Material' component={MaterialScreen} options={{ title: 'Material', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/sabao_64x64.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerGerenteGeral.Screen name='Operacoes' component={OperacoesCelularScreen} options={{ title: 'Operações', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/roupa-dobrada_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerGerenteGeral.Screen name='OperacoesTapete' component={OperacoesTapeteScreen} options={{ title: 'Operações com Tapete', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/tapete_128x128.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerGerenteGeral.Screen name='BuscaEntrega' component={BuscaEntregaScreen} options={{ title: 'Busca e Entrega', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/SolicitacaoDeBusca_64x64.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAdministrador.Screen name='Visita' component={VisitaScreen} options={{ title: 'Visita', drawerIcon: ({focused, size}) => (
          <Image
            source={require('./images/Visita_64x64.png')}
            style={styles.icon}
          />
        ), }} />
        <DrawerGerenteGeral.Screen name='ListaDeEntrega' component={ListaDeEntregaScreen} options={{ title: 'Lista de Entrega', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/marca_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerGerenteGeral.Screen name='BancoDeHoras' component={BancoDeHorasScreen} options={{ title: 'Banco de Horas', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/bater-pontos_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerGerenteGeral.Screen name='Usuario' component={UsuarioScreen} options={{ title: 'Usuário', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/male-icon.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAdministrador.Screen name='Equipamento' component={EquipamentoScreen} options={{ title: 'Equipamento', drawerIcon: ({focused, size}) => (
          <Image
            source={require('./images/maquina-de-lavar_64x64.png')}
            style={styles.icon}
          />
        ), }} />
        <DrawerGerenteGeral.Screen name='MetaDePassagem' component={MetaDePassagemScreen} options={{ title: 'Meta de Passagem', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/ferro-de-passar_64x64.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerGerenteGeral.Screen name='Meta' component={MetaScreen} options={{ title: 'Meta', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/meta_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerGerenteGeral.Screen name='Tarefa' component={TarefaScreen} options={{ title: 'Tarefa', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/tarefa_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerGerenteGeral.Screen name='Processo' component={ProcessoScreen} options={{ title: 'Processo', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/documento_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerGerenteGeral.Screen name='Sobre' component={SobreScreen} options={{ title: 'Sobre', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/sobre_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerGerenteGeral.Screen name='Logout' component={LogoutScreen} options={{ title: 'Sair', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/logout_32x32.png')}
                style={styles.icon}
              />
           ), }} />
      </DrawerGerenteGeral.Navigator>
    );
  }

// const DrawerSubGerenteGeral = createDrawerNavigator(
//   {
//     Home: HomeScreen,
//     Lavagem: LavagemScreen,
//     Roupa: RoupaScreen,
//     MovimentacaoDeCaixa: MovimentacaoDeCaixaScreen,
//     Caixa: CaixaScreen,
//     Material: MaterialScreen,
//     Operacoes: OperacoesCelularScreen,
//     OperacoesTapete: OperacoesTapeteScreen,
//     BuscaEntrega: BuscaEntregaScreen,
//     ListaDeEntrega: ListaDeEntregaScreen,
//     BancoDeHoras: BancoDeHorasScreen,
//     Usuario: UsuarioScreen,
//     Meta: MetaScreen,
//     Tarefa: TarefaScreen,
//     Sobre: SobreScreen,
//     Logout: LogoutScreen,
//   },{
//     initialRouteName: 'Home',
//     navigationOptions: {
//       headerTransparent: true,
//     },
//   }
// );

const DrawerSubGerenteGeral = createDrawerNavigator();

function DrawerSubGerenteGeralFunction()
  {
    return(
      <DrawerSubGerenteGeral.Navigator initialRouteName='Home' screenOptions={{headerStyle: {backgroundColor: '#F5FCFF'}}}>
        <DrawerSubGerenteGeral.Screen name='Home' component={HomeScreen} options={{ title: 'Início', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/home-icon.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerSubGerenteGeral.Screen name='Lavagem' component={LavagemScreen} options={{ title: 'Lavagem', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/lavagem_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerSubGerenteGeral.Screen name='Roupa' component={RoupaScreen} options={{ title: 'Roupa', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/roupa_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerSubGerenteGeral.Screen name='MovimentacaoDeCaixa' component={MovimentacaoDeCaixaScreen} options={{ title: 'Movimentação de Caixa', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/pagamento_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerSubGerenteGeral.Screen name='Caixa' component={CaixaScreen} options={{ title: 'Caixa', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/caixaFinanceiro_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerSubGerenteGeral.Screen name='Material' component={MaterialScreen} options={{ title: 'Material', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/sabao_64x64.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerSubGerenteGeral.Screen name='Operacoes' component={OperacoesCelularScreen} options={{ title: 'Operações', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/roupa-dobrada_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerSubGerenteGeral.Screen name='OperacoesTapete' component={OperacoesTapeteScreen} options={{ title: 'Operações com Tapete', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/tapete_128x128.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerSubGerenteGeral.Screen name='BuscaEntrega' component={BuscaEntregaScreen} options={{ title: 'Busca e Entrega', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/SolicitacaoDeBusca_64x64.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAdministrador.Screen name='Visita' component={VisitaScreen} options={{ title: 'Visita', drawerIcon: ({focused, size}) => (
          <Image
            source={require('./images/Visita_64x64.png')}
            style={styles.icon}
          />
        ), }} />
        <DrawerSubGerenteGeral.Screen name='ListaDeEntrega' component={ListaDeEntregaScreen} options={{ title: 'Lista de Entrega', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/marca_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerSubGerenteGeral.Screen name='BancoDeHoras' component={BancoDeHorasScreen} options={{ title: 'Banco de Horas', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/bater-pontos_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerSubGerenteGeral.Screen name='Usuario' component={UsuarioScreen} options={{ title: 'Usuário', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/male-icon.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAdministrador.Screen name='Equipamento' component={EquipamentoScreen} options={{ title: 'Equipamento', drawerIcon: ({focused, size}) => (
          <Image
            source={require('./images/maquina-de-lavar_64x64.png')}
            style={styles.icon}
          />
        ), }} />
        <DrawerSubGerenteGeral.Screen name='MetaDePassagem' component={MetaDePassagemScreen} options={{ title: 'Meta de Passagem', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/ferro-de-passar_64x64.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerSubGerenteGeral.Screen name='Meta' component={MetaScreen} options={{ title: 'Meta', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/meta_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerSubGerenteGeral.Screen name='Tarefa' component={TarefaScreen} options={{ title: 'Tarefa', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/tarefa_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerSubGerenteGeral.Screen name='Processo' component={ProcessoScreen} options={{ title: 'Processo', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/documento_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerSubGerenteGeral.Screen name='Sobre' component={SobreScreen} options={{ title: 'Sobre', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/sobre_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerSubGerenteGeral.Screen name='Logout' component={LogoutScreen} options={{ title: 'Sair', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/logout_32x32.png')}
                style={styles.icon}
              />
           ), }} />
      </DrawerSubGerenteGeral.Navigator>
    );
  }

// const DrawerGerenteDeOperacoes = createDrawerNavigator(
//   {
//     Home: HomeScreen,
//     Lavagem: LavagemScreen,
//     Roupa: RoupaScreen,
//     Material: MaterialScreen,
//     Operacoes: OperacoesCelularScreen,
//     OperacoesTapete: OperacoesTapeteScreen,
//     BancoDeHoras: BancoDeHorasScreen,
//     BaterPonto: BaterPontoScreen,
//     Sobre: SobreScreen,
//     Logout: LogoutScreen,
//   },{
//     initialRouteName: 'Home',
//     navigationOptions: {
//       headerTransparent: true,
//     },
//   }
// );

const DrawerGerenteDeOperacoes = createDrawerNavigator();

function DrawerGerenteDeOperacoesFunction()
  {
    return(
      <DrawerGerenteDeOperacoes.Navigator initialRouteName='Home' screenOptions={{headerStyle: {backgroundColor: '#F5FCFF'}}}>
        <DrawerGerenteDeOperacoes.Screen name='Home' component={HomeScreen} options={{ title: 'Início', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/home-icon.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerGerenteDeOperacoes.Screen name='Lavagem' component={LavagemScreen} options={{ title: 'Lavagem', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/lavagem_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerGerenteDeOperacoes.Screen name='Roupa' component={RoupaScreen} options={{ title: 'Roupa', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/roupa_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerGerenteDeOperacoes.Screen name='Material' component={MaterialScreen} options={{ title: 'Material', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/sabao_64x64.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerGerenteDeOperacoes.Screen name='Operacoes' component={OperacoesCelularScreen} options={{ title: 'Operações', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/roupa-dobrada_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerGerenteDeOperacoes.Screen name='OperacoesTapete' component={OperacoesTapeteScreen} options={{ title: 'Operações com Tapete', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/tapete_128x128.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerGerenteDeOperacoes.Screen name='BancoDeHoras' component={BancoDeHorasScreen} options={{ title: 'Banco de Horas', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/bater-pontos_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerGerenteDeOperacoes.Screen name='BaterPonto' component={BaterPontoScreen} options={{ title: 'Bater Ponto', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/dedo_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerGerenteDeOperacoes.Screen name='MetaDePassagem' component={MetaDePassagemScreen} options={{ title: 'Meta de Passagem', drawerIcon: ({focused, size}) => (
          <Image
            source={require('./images/ferro-de-passar_64x64.png')}
            style={styles.icon}
          />
        ), }} />
        <DrawerGerenteDeOperacoes.Screen name='Processo' component={ProcessoScreen} options={{ title: 'Processo', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/documento_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerGerenteDeOperacoes.Screen name='Sobre' component={SobreScreen} options={{ title: 'Sobre', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/sobre_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerGerenteDeOperacoes.Screen name='Logout' component={LogoutScreen} options={{ title: 'Sair', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/logout_32x32.png')}
                style={styles.icon}
              />
           ), }} />
      </DrawerGerenteDeOperacoes.Navigator>
    );
  }

// const DrawerSupervisorDeOperacoes = createDrawerNavigator(
//   {
//     Home: HomeScreen,
//     Lavagem: LavagemScreenOperacoes,
//     Operacoes: OperacoesCelularScreen,
//     OperacoesTapete: OperacoesTapeteScreen,
//     Roupa: RoupaScreen,
//     Material: MaterialScreenPapelOperacoes,
//     BancoDeHoras: BancoDeHorasScreen,
//     BaterPonto: BaterPontoScreen,
//     Sobre: SobreScreen,
//     Logout: LogoutScreen,
//   },{
//     initialRouteName: 'Home',
//     navigationOptions: {
//       headerTransparent: true,
//     },
//   }
// );

const DrawerSupervisorDeOperacoes = createDrawerNavigator();

function DrawerSupervisorDeOperacoesFunction()
  {
    return(
      <DrawerSupervisorDeOperacoes.Navigator initialRouteName='Home' screenOptions={{headerStyle: {backgroundColor: '#F5FCFF'}}}>
        <DrawerSupervisorDeOperacoes.Screen name='Home' component={HomeScreen} options={{ title: 'Início', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/home-icon.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerSupervisorDeOperacoes.Screen name='Lavagem' component={LavagemScreenOperacoes} options={{ title: 'Lavagem', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/lavagem_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerSupervisorDeOperacoes.Screen name='Operacoes' component={OperacoesCelularScreen} options={{ title: 'Operações', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/roupa-dobrada_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerSupervisorDeOperacoes.Screen name='OperacoesTapete' component={OperacoesTapeteScreen} options={{ title: 'Operações com Tapete', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/tapete_128x128.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerSupervisorDeOperacoes.Screen name='Roupa' component={RoupaScreen} options={{ title: 'Roupa', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/roupa_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerSupervisorDeOperacoes.Screen name='Material' component={MaterialScreenPapelOperacoes} options={{ title: 'Material', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/sabao_64x64.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerSupervisorDeOperacoes.Screen name='BancoDeHoras' component={BancoDeHorasScreen} options={{ title: 'Banco de Horas', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/bater-pontos_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerSupervisorDeOperacoes.Screen name='BaterPonto' component={BaterPontoScreen} options={{ title: 'Bater Ponto', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/dedo_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerSupervisorDeOperacoes.Screen name='MetaDePassagem' component={MetaDePassagemScreen} options={{ title: 'Meta de Passagem', drawerIcon: ({focused, size}) => (
          <Image
            source={require('./images/ferro-de-passar_64x64.png')}
            style={styles.icon}
          />
        ), }} />
        <DrawerSupervisorDeOperacoes.Screen name='Processo' component={ProcessoScreen} options={{ title: 'Processo', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/documento_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerSupervisorDeOperacoes.Screen name='Sobre' component={SobreScreen} options={{ title: 'Sobre', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/sobre_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerSupervisorDeOperacoes.Screen name='Logout' component={LogoutScreen} options={{ title: 'Sair', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/logout_32x32.png')}
                style={styles.icon}
              />
           ), }} />
      </DrawerSupervisorDeOperacoes.Navigator>
    );
  }

// const DrawerOperacoes = createDrawerNavigator(
//   {
//     Home: HomeScreen,
//     Lavagem: LavagemScreenOperacoes,
//     Operacoes: OperacoesCelularScreen,
//     Roupa: RoupaScreen,
//     Material: MaterialScreenPapelOperacoes,
//     BancoDeHoras: BancoDeHorasScreen,
//     BaterPonto: BaterPontoScreen,
//     Sobre: SobreScreen,
//     Logout: LogoutScreen,
//   },{
//     initialRouteName: 'Home',
//     navigationOptions: {
//       headerTransparent: true,
//     },
//   }
// );

const DrawerOperacoes = createDrawerNavigator();

function DrawerOperacoesFunction()
  {
    return(
      <DrawerOperacoes.Navigator initialRouteName='Home' screenOptions={{headerStyle: {backgroundColor: '#F5FCFF'}}}>
        <DrawerOperacoes.Screen name='Home' component={HomeScreen} options={{ title: 'Início', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/home-icon.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerOperacoes.Screen name='Lavagem' component={LavagemScreenOperacoes} options={{ title: 'Lavagem', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/lavagem_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerOperacoes.Screen name='Operacoes' component={OperacoesCelularScreen} options={{ title: 'Operações', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/roupa-dobrada_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerOperacoes.Screen name='Roupa' component={RoupaScreen} options={{ title: 'Roupa', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/roupa_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerOperacoes.Screen name='Material' component={MaterialScreenPapelOperacoes} options={{ title: 'Material', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/sabao_64x64.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerOperacoes.Screen name='BancoDeHoras' component={BancoDeHorasScreen} options={{ title: 'Banco de Horas', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/bater-pontos_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerOperacoes.Screen name='BaterPonto' component={BaterPontoScreen} options={{ title: 'Bater Ponto', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/dedo_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerOperacoes.Screen name='MetaDePassagem' component={MetaDePassagemScreen} options={{ title: 'Meta de Passagem', drawerIcon: ({focused, size}) => (
          <Image
            source={require('./images/ferro-de-passar_64x64.png')}
            style={styles.icon}
          />
        ), }} />
        <DrawerOperacoes.Screen name='Processo' component={ProcessoScreen} options={{ title: 'Processo', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/documento_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerOperacoes.Screen name='Sobre' component={SobreScreen} options={{ title: 'Sobre', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/sobre_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerOperacoes.Screen name='Logout' component={LogoutScreen} options={{ title: 'Sair', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/logout_32x32.png')}
                style={styles.icon}
              />
           ), }} />
      </DrawerOperacoes.Navigator>
    );
  }

// const DrawerAplicativo = createDrawerNavigator(
//   {
//     Home: HomeScreenAplicativo,
//     Lavagem: LavagemScreenOperacoes,
//     Roupa: RoupaScreen,
//     Sobre: SobreScreen,
//     Logout: LogoutScreen,
//   },{
//     initialRouteName: 'Home',
//     navigationOptions: {
//       headerTransparent: true,
//     },
//   }
// );

const DrawerAplicativo = createDrawerNavigator();

function DrawerAplicativoFunction()
  {
    return(
      <DrawerAplicativo.Navigator initialRouteName='Home' screenOptions={{headerStyle: {backgroundColor: '#F5FCFF'}}}>
        <DrawerAplicativo.Screen name='Home' component={HomeScreenAplicativo} options={{ title: 'Início', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/home-icon.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAplicativo.Screen name='Lavagem' component={LavagemScreenOperacoes} options={{ title: 'Lavagem', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/lavagem_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAplicativo.Screen name='Roupa' component={RoupaScreen} options={{ title: 'Roupa', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/roupa_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAplicativo.Screen name='Sobre' component={SobreScreen} options={{ title: 'Sobre', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/sobre_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAplicativo.Screen name='Logout' component={LogoutScreen} options={{ title: 'Sair', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/logout_32x32.png')}
                style={styles.icon}
              />
           ), }} />
      </DrawerAplicativo.Navigator>
    );
  }


// const DrawerAtendente = createDrawerNavigator(
//   {
//     Home: HomeScreen,
//     Lavagem: LavagemScreen,
//     Roupa: RoupaScreen,
//     MovimentacaoDeCaixa: MovimentacaoDeCaixaScreen,
//     Caixa: CaixaScreen,
//     BuscaEntrega: BuscaEntregaScreen,
//     ListaDeEntrega: ListaDeEntregaScreen,
//     Usuario: UsuarioScreen,
//     Meta: MetaScreen,
//     Tarefa: TarefaScreen,
//     BaterPonto: BaterPontoScreen,
//     Sobre: SobreScreen,
//     Logout: LogoutScreen,
//   },{
//     initialRouteName: 'Home',
//     navigationOptions: {
//       headerTransparent: true,
//     },
//   }
// );

const DrawerAtendente = createDrawerNavigator();

function DrawerAtendenteFunction()
  {
    return(
      <DrawerAtendente.Navigator initialRouteName='Home' screenOptions={{headerStyle: {backgroundColor: '#F5FCFF'}}}>
        <DrawerAtendente.Screen name='Home' component={HomeScreen} options={{ title: 'Início', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/home-icon.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAtendente.Screen name='Lavagem' component={LavagemScreen} options={{ title: 'Lavagem', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/lavagem_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAtendente.Screen name='Roupa' component={RoupaScreen} options={{ title: 'Roupa', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/roupa_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAtendente.Screen name='MovimentacaoDeCaixa' component={MovimentacaoDeCaixaScreen} options={{ title: 'Movimentacao de Caixa', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/pagamento_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAtendente.Screen name='Caixa' component={CaixaScreen} options={{ title: 'Caixa', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/caixaFinanceiro_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAtendente.Screen name='BuscaEntrega' component={BuscaEntregaScreen} options={{ title: 'Busca e Entrega', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/SolicitacaoDeBusca_64x64.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAdministrador.Screen name='Visita' component={VisitaScreen} options={{ title: 'Visita', drawerIcon: ({focused, size}) => (
          <Image
            source={require('./images/Visita_64x64.png')}
            style={styles.icon}
          />
        ), }} />
        <DrawerAtendente.Screen name='ListaDeEntrega' component={ListaDeEntregaScreen} options={{ title: 'Lista de Entrega', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/marca_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAtendente.Screen name='BancoDeHoras' component={BancoDeHorasScreen} options={{ title: 'Banco de Horas', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/bater-pontos_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAtendente.Screen name='Usuario' component={UsuarioScreen} options={{ title: 'Usuário', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/male-icon.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAtendente.Screen name='Meta' component={MetaScreen} options={{ title: 'Meta', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/meta_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAtendente.Screen name='Tarefa' component={TarefaScreen} options={{ title: 'Tarefa', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/tarefa_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAtendente.Screen name='BaterPonto' component={BaterPontoScreen} options={{ title: 'Bater Ponto', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/dedo_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAtendente.Screen name='Processo' component={ProcessoScreen} options={{ title: 'Processo', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/documento_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAtendente.Screen name='Sobre' component={SobreScreen} options={{ title: 'Sobre', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/sobre_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAtendente.Screen name='Logout' component={LogoutScreen} options={{ title: 'Sair', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/logout_32x32.png')}
                style={styles.icon}
              />
           ), }} />
      </DrawerAtendente.Navigator>
    );
  }

  const DrawerEntregador = createDrawerNavigator();

function DrawerEntregadorFunction()
  {
    return(
      <DrawerEntregador.Navigator initialRouteName='Home' screenOptions={{headerStyle: {backgroundColor: '#F5FCFF'}}}>
        <DrawerEntregador.Screen name='Home' component={HomeScreen} options={{ title: 'Início', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/home-icon.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerEntregador.Screen name='BuscaEntrega' component={BuscaEntregaScreen} options={{ title: 'Busca e Entrega', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/SolicitacaoDeBusca_64x64.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerAdministrador.Screen name='Visita' component={VisitaScreen} options={{ title: 'Visita', drawerIcon: ({focused, size}) => (
          <Image
            source={require('./images/Visita_64x64.png')}
            style={styles.icon}
          />
        ), }} />
        <DrawerEntregador.Screen name='ListaDeEntrega' component={ListaDeEntregaScreen} options={{ title: 'Lista de Entrega', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/marca_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerEntregador.Screen name='OperacoesTapete' component={OperacoesTapeteScreen} options={{ title: 'Operações com Tapete', drawerIcon: ({focused, size}) => (
          <Image
            source={require('./images/tapete_128x128.png')}
            style={styles.icon}
          />
        ), }} />
        <DrawerEntregador.Screen name='MovimentacaoDeCaixa' component={MovimentacaoDeCaixaScreen} options={{ title: 'Movimentacao de Caixa', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/pagamento_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerEntregador.Screen name='Caixa' component={CaixaScreen} options={{ title: 'Caixa', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/caixaFinanceiro_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerEntregador.Screen name='Material' component={MaterialScreen} options={{ title: 'Material', drawerIcon: ({focused, size}) => (
          <Image
            source={require('./images/sabao_64x64.png')}
            style={styles.icon}
          />
        ), }} />
        <DrawerEntregador.Screen name='Tarefa' component={TarefaScreen} options={{ title: 'Tarefa', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/tarefa_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerEntregador.Screen name='BaterPonto' component={BaterPontoScreen} options={{ title: 'Bater Ponto', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/dedo_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerEntregador.Screen name='Processo' component={ProcessoScreen} options={{ title: 'Processo', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/documento_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerEntregador.Screen name='Sobre' component={SobreScreen} options={{ title: 'Sobre', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/sobre_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerEntregador.Screen name='Logout' component={LogoutScreen} options={{ title: 'Sair', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/logout_32x32.png')}
                style={styles.icon}
              />
           ), }} />
      </DrawerEntregador.Navigator>
    );
  }

// const DrawerCliente = createDrawerNavigator(
//   {
//     Home: HomeScreenCliente,
//     Lavagem: LavagemScreenCliente,
//     Contato: ContatoScreen,
//     Sobre: SobreScreen,
//     Logout: LogoutScreen,
//   },{
//     initialRouteName: 'Home',
//     navigationOptions: {
//       headerTransparent: true,
//     },
//   }
// );

const DrawerCliente = createDrawerNavigator();

function DrawerClienteFunction()
  {
    return(
      <DrawerCliente.Navigator initialRouteName='Home' screenOptions={{headerStyle: {backgroundColor: '#F5FCFF'}}}>
        <DrawerCliente.Screen name='Home' component={HomeScreenCliente} options={{ title: 'Início', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/home-icon.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerCliente.Screen name='Lavagem' component={LavagemScreenCliente} options={{ title: 'Lavagem', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/lavagem_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerCliente.Screen name='Contato' component={ContatoScreen} options={{ title: 'Contato', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/atendente_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerCliente.Screen name='Sobre' component={SobreScreen} options={{ title: 'Sobre', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/sobre_32x32.png')}
                style={styles.icon}
              />
           ), }} />
        <DrawerCliente.Screen name='Logout' component={LogoutScreen} options={{ title: 'Sair', drawerIcon: ({focused, size}) => (
              <Image
                source={require('./images/logout_32x32.png')}
                style={styles.icon}
              />
           ), }} />
      </DrawerCliente.Navigator>
    );
  }

  //screenOptions={{headerTransparent: true}}
const StackAdministrador = createNativeStackNavigator();

function StackAdministradorFunction()
  {
    return(
      <StackAdministrador.Navigator initialRouteName="Drawer">
        <StackAdministrador.Screen name='Drawer' component={DrawerAdministradorFunction} options={{ title: '', headerTransparent: true }}/>
        <StackAdministrador.Screen name='MovimentacaoDeCaixaDetails' component={MovimentacaoDeCaixaDetails} options={{ title: 'Movimentação de Caixa'}} />
        <StackAdministrador.Screen name='CaixaDetails' component={CaixaDetails} options={{ title: 'Caixa' }} />
        <StackAdministrador.Screen name='CaixaDetailsSoLeitura' component={CaixaDetailsSoLeitura} options={{ title: 'Caixa' }} />
        <StackAdministrador.Screen name='AvaliacaoDetails' component={AvaliacaoDetails} options={{ title: 'Avaliação' }} />
        <StackAdministrador.Screen name='AvaliacaoDetailsSoLeitura' component={AvaliacaoDetailsSoLeitura} options={{ title: 'Avaliação' }} />
        <StackAdministrador.Screen name='LavagemDetails' component={LavagemDetails} options={{ title: 'Lavagem' }} />
        <StackAdministrador.Screen name='LavagemDetailsOperacoes' component={LavagemDetailsOperacoes} options={{ title: 'Operações em Lavagem' }} />
        <StackAdministrador.Screen name='LavagemDetailsOperacaoEmpacotar' component={LavagemDetailsOperacaoEmpacotar} options={{ title: 'Empacotar Lavagem' }} />
        <StackAdministrador.Screen name='LavagemDetailsOperacaoRecolher' component={LavagemDetailsOperacaoRecolher} options={{ title: 'Recolher Lavagem' }} />
        <StackAdministrador.Screen name='LavagemDetailsEdit' component={LavagemDetailsEdit} options={{ title: 'Editar Lavagem' }} />
        <StackAdministrador.Screen name='RoupaEmLavagemDetails' component={RoupaEmLavagemDetails} options={{ title: 'Roupa em Lavagem' }} />
        <StackAdministrador.Screen name='RoupaDetails' component={RoupaDetails} options={{ title: 'Roupa' }} />
        <StackAdministrador.Screen name='OperacaoLavar' component={OperacaoLavarScreen} options={{ title: 'Lavar' }} />
        <StackAdministrador.Screen name='OperacaoRecolher' component={OperacaoRecolherScreen} options={{ title: 'Recolher' }} />
        <StackAdministrador.Screen name='OperacaoPassar' component={OperacaoPassarScreen} options={{ title: 'Passar' }} />
        <StackAdministrador.Screen name='OperacaoPassadorExtra' component={OperacaoPassadorExtraScreen} options={{ title: 'Passador Extra' }} />
        <StackAdministrador.Screen name='OperacaoEmpacotar' component={OperacaoEmpacotarScreen} options={{ title: 'Empacotar' }} />
        <StackAdministrador.Screen name='OperacaoRetirarMaterial' component={OperacaoRetirarMaterialScreen} options={{ title: 'Retirar Material' }} />
        <StackAdministrador.Screen name='OperacaoAdicionarMaterial' component={OperacaoAdicionarMaterialScreen} options={{ title: 'Adicionar Material' }} />
        <StackAdministrador.Screen name='OperacaoListaDeEntrega' component={OperacaoListaDeEntregaScreen} options={{ title: 'Lista de Entrega' }} />
        <StackAdministrador.Screen name='OperacaoLavarTapete' component={OperacaoLavarTapeteScreen} options={{ title: 'Lavar Tapete' }} />
        <StackAdministrador.Screen name='OperacaoProntoTapete' component={OperacaoProntoTapeteScreen} options={{ title: 'Tapete Pronto' }} />
        <StackAdministrador.Screen name='OperacaoEntregarTapete' component={OperacaoEntregarTapeteScreen} options={{ title: 'Entregar Tapete' }} />
        <StackAdministrador.Screen name='MaterialDetails' component={MaterialDetails} options={{ title: 'Material' }} />
        <StackAdministrador.Screen name='RoupasDoCliente' component={RoupasDoClienteScreen} options={{ title: 'Roupas do Cliente' }} />
        <StackAdministrador.Screen name='ListaDeCompras' component={ListaDeComprasScreen} options={{ title: 'Lista de Compras' }} />
        <StackAdministrador.Screen name='BancoDeHorasDetails' component={BancoDeHorasDetails} options={{ title: 'Banco de Horas' }} />
        <StackAdministrador.Screen name='ListaDeEntregaDetails' component={ListaDeEntregaDetails} options={{ title: 'Lista de Entrega' }} />
        <StackAdministrador.Screen name='ListaDeEntregaDetailsAtendente' component={ListaDeEntregaDetailsAtendente} options={{ title: 'Lista de Entrega' }} />
        <StackAdministrador.Screen name='LavagemParaListaDeEntrega' component={LavagemParaListaDeEntregaScreen} options={{ title: 'Lavagem para Lista de Entrega' }} />
        <StackAdministrador.Screen name='OperacaoListaDeEntregaDireta' component={OperacaoListaDeEntregaDiretaScreen} options={{ title: 'Lista de Entrega' }} />
        <StackAdministrador.Screen name='FechamentoDePontoDetails' component={FechamentoDePontoDetails} options={{ title: 'Fechamento de Ponto' }} />
        <StackAdministrador.Screen name='UsuarioDetails' component={UsuarioDetails} options={{ title: 'Usuário' }} />
        <StackAdministrador.Screen name='BuscaDetails' component={BuscaDetails} options={{ title: 'Busca' }} />
        <StackAdministrador.Screen name='SelecionarUsuarioDetails' component={SelecionarUsuarioDetails} options={{ title: 'Selecionar Usuário' }} />
        <StackAdministrador.Screen name='LavagensPendentesDetails' component={LavagensPendentesDetails} options={{ title: 'Lavagens Pendentes' }} />
        <StackAdministrador.Screen name='EquipamentoDetails' component={EquipamentoDetails} options={{ title: 'Detalhes do Equipamento' }} />
        <StackAdministrador.Screen name='ProcessoDetails' component={ProcessoDetails} options={{ title: 'Detalhes do Processo' }} />
      </StackAdministrador.Navigator>
    );
  }

// const StackGerenteGeral = createStackNavigator(
//   {
//     MovimentacaoDeCaixaDetails: MovimentacaoDeCaixaDetails,
//     CaixaDetails: CaixaDetails,
//     CaixaDetailsSoLeitura: CaixaDetailsSoLeitura,
//     AvaliacaoDetails: AvaliacaoDetails,
//     AvaliacaoDetailsSoLeitura: AvaliacaoDetailsSoLeitura,
//     LavagemDetails: LavagemDetails,
//     LavagemDetailsOperacoes: LavagemDetailsOperacoes,
//     LavagemDetailsOperacaoEmpacotar: LavagemDetailsOperacaoEmpacotar,
//     LavagemDetailsOperacaoRecolher: LavagemDetailsOperacaoRecolher,
//     LavagemDetailsEdit: LavagemDetailsEdit,
//     RoupaEmLavagemDetails: RoupaEmLavagemDetails,
//     RoupasDoCliente: RoupasDoClienteScreen,
//     RoupaDetails: RoupaDetails,
//     OperacaoLavar: OperacaoLavarScreen,
//     OperacaoRecolher: OperacaoRecolherScreen,
//     OperacaoPassar: OperacaoPassarScreen,
//     OperacaoPassadorExtra: OperacaoPassadorExtraScreen,
//     OperacaoEmpacotar: OperacaoEmpacotarScreen,
//     OperacaoRetirarMaterial: OperacaoRetirarMaterialScreen,
//     OperacaoAdicionarMaterial: OperacaoAdicionarMaterialScreen,
//     OperacaoListaDeEntrega: OperacaoListaDeEntregaScreen,
//     OperacaoLavarTapete: OperacaoLavarTapeteScreen,
//     OperacaoProntoTapete: OperacaoProntoTapeteScreen,
//     OperacaoEntregarTapete: OperacaoEntregarTapeteScreen,
//     MaterialDetails: MaterialDetails,
//     ListaDeCompras: ListaDeComprasScreen,
//     BancoDeHorasDetails: BancoDeHorasDetails,
//     ListaDeEntregaDetails: ListaDeEntregaDetails,
//     ListaDeEntregaDetailsAtendente: ListaDeEntregaDetailsAtendente,
//     LavagemParaListaDeEntrega: LavagemParaListaDeEntregaScreen,
//     OperacaoListaDeEntregaDireta: OperacaoListaDeEntregaDiretaScreen,
//     FechamentoDePontoDetails: FechamentoDePontoDetails,
//     UsuarioDetails: UsuarioDetails,
//     BuscaDetails: BuscaDetails,
//     SelecionarUsuarioDetails: SelecionarUsuarioDetails,
//     LavagensPendentesDetails: LavagensPendentesDetails,
//     Drawer: DrawerGerenteGeral,
//   },{
//     initialRouteName: 'Drawer',
//     navigationOptions: {
//       headerTransparent: true,
//     },
//   }
// );

const StackGerenteGeral = createNativeStackNavigator();

function StackGerenteGeralFunction()
  {
    return(
      <StackGerenteGeral.Navigator initialRouteName="Drawer" >
        <StackGerenteGeral.Screen name='Drawer' component={DrawerGerenteGeralFunction} options={{ title: '', headerTransparent: true }}/>
        <StackGerenteGeral.Screen name='MovimentacaoDeCaixaDetails' component={MovimentacaoDeCaixaDetails} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='CaixaDetails' component={CaixaDetails} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='CaixaDetailsSoLeitura' component={CaixaDetailsSoLeitura} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='AvaliacaoDetails' component={AvaliacaoDetails} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='AvaliacaoDetailsSoLeitura' component={AvaliacaoDetailsSoLeitura} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='LavagemDetails' component={LavagemDetails} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='LavagemDetailsOperacoes' component={LavagemDetailsOperacoes} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='LavagemDetailsOperacaoEmpacotar' component={LavagemDetailsOperacaoEmpacotar} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='LavagemDetailsOperacaoRecolher' component={LavagemDetailsOperacaoRecolher} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='LavagemDetailsEdit' component={LavagemDetailsEdit} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='RoupaEmLavagemDetails' component={RoupaEmLavagemDetails} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='RoupaDetails' component={RoupaDetails} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='OperacaoLavar' component={OperacaoLavarScreen} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='OperacaoRecolher' component={OperacaoRecolherScreen} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='OperacaoPassar' component={OperacaoPassarScreen} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='OperacaoPassadorExtra' component={OperacaoPassadorExtraScreen} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='OperacaoEmpacotar' component={OperacaoEmpacotarScreen} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='OperacaoRetirarMaterial' component={OperacaoRetirarMaterialScreen} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='OperacaoAdicionarMaterial' component={OperacaoAdicionarMaterialScreen} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='OperacaoListaDeEntrega' component={OperacaoListaDeEntregaScreen} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='OperacaoLavarTapete' component={OperacaoLavarTapeteScreen} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='OperacaoProntoTapete' component={OperacaoProntoTapeteScreen} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='OperacaoEntregarTapete' component={OperacaoEntregarTapeteScreen} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='MaterialDetails' component={MaterialDetails} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='RoupasDoCliente' component={RoupasDoClienteScreen} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='ListaDeCompras' component={ListaDeComprasScreen} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='BancoDeHorasDetails' component={BancoDeHorasDetails} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='ListaDeEntregaDetails' component={ListaDeEntregaDetails} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='ListaDeEntregaDetailsAtendente' component={ListaDeEntregaDetailsAtendente} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='LavagemParaListaDeEntrega' component={LavagemParaListaDeEntregaScreen} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='OperacaoListaDeEntregaDireta' component={OperacaoListaDeEntregaDiretaScreen} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='FechamentoDePontoDetails' component={FechamentoDePontoDetails} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='UsuarioDetails' component={UsuarioDetails} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='BuscaDetails' component={BuscaDetails} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='SelecionarUsuarioDetails' component={SelecionarUsuarioDetails} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='LavagensPendentesDetails' component={LavagensPendentesDetails} options={{ title: '' }} />
        <StackGerenteGeral.Screen name='EquipamentoDetails' component={EquipamentoDetails} options={{ title: 'Detalhes do Equipamento' }} />
        <StackGerenteGeral.Screen name='ProcessoDetails' component={ProcessoDetails} options={{ title: 'Detalhes do Processo' }} />
      </StackGerenteGeral.Navigator>
    );
  }

// const StackSubGerenteGeral = createStackNavigator(
//   {
//     MovimentacaoDeCaixaDetails: MovimentacaoDeCaixaDetails,
//     CaixaDetails: CaixaDetails,
//     CaixaDetailsSoLeitura: CaixaDetailsSoLeitura,
//     AvaliacaoDetails: AvaliacaoDetails,
//     AvaliacaoDetailsSoLeitura: AvaliacaoDetailsSoLeitura,
//     LavagemDetails: LavagemDetails,
//     LavagemDetailsOperacoes: LavagemDetailsOperacoes,
//     LavagemDetailsOperacaoEmpacotar: LavagemDetailsOperacaoEmpacotar,
//     LavagemDetailsOperacaoRecolher: LavagemDetailsOperacaoRecolher,
//     LavagemDetailsEdit: LavagemDetailsEdit,
//     RoupaEmLavagemDetails: RoupaEmLavagemDetails,
//     RoupasDoCliente: RoupasDoClienteScreen,
//     RoupaDetails: RoupaDetails,
//     OperacaoLavar: OperacaoLavarScreen,
//     OperacaoRecolher: OperacaoRecolherScreen,
//     OperacaoPassar: OperacaoPassarScreen,
//     OperacaoPassadorExtra: OperacaoPassadorExtraScreen,
//     OperacaoEmpacotar: OperacaoEmpacotarScreen,
//     OperacaoRetirarMaterial: OperacaoRetirarMaterialScreen,
//     OperacaoAdicionarMaterial: OperacaoAdicionarMaterialScreen,
//     OperacaoListaDeEntrega: OperacaoListaDeEntregaScreen,
//     OperacaoLavarTapete: OperacaoLavarTapeteScreen,
//     OperacaoProntoTapete: OperacaoProntoTapeteScreen,
//     OperacaoEntregarTapete: OperacaoEntregarTapeteScreen,
//     OperacaoListaDeEntregaDireta: OperacaoListaDeEntregaDiretaScreen,
//     MaterialDetails: MaterialDetails,
//     ListaDeCompras: ListaDeComprasScreen,
//     BancoDeHorasDetails: BancoDeHorasDetails,
//     ListaDeEntregaDetails: ListaDeEntregaDetails,
//     ListaDeEntregaDetailsAtendente: ListaDeEntregaDetailsAtendente,
//     LavagemParaListaDeEntrega: LavagemParaListaDeEntregaScreen,
//     FechamentoDePontoDetails: FechamentoDePontoDetails,
//     UsuarioDetails: UsuarioDetails,
//     BuscaDetails: BuscaDetails,
//     SelecionarUsuarioDetails: SelecionarUsuarioDetails,
//     LavagensPendentesDetails: LavagensPendentesDetails,
//     Drawer: DrawerSubGerenteGeral,
//   },{
//     initialRouteName: 'Drawer',
//     navigationOptions: {
//       headerTransparent: true,
//     },
//   }
// );

const StackSubGerenteGeral = createNativeStackNavigator();

function StackSubGerenteGeralFunction()
  {
    return(
      <StackSubGerenteGeral.Navigator initialRouteName="Drawer" >
        <StackSubGerenteGeral.Screen name='Drawer' component={DrawerSubGerenteGeralFunction} options={{ title: '', headerTransparent: true }}/>
        <StackSubGerenteGeral.Screen name='MovimentacaoDeCaixaDetails' component={MovimentacaoDeCaixaDetails} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='CaixaDetails' component={CaixaDetails} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='CaixaDetailsSoLeitura' component={CaixaDetailsSoLeitura} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='AvaliacaoDetails' component={AvaliacaoDetails} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='AvaliacaoDetailsSoLeitura' component={AvaliacaoDetailsSoLeitura} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='LavagemDetails' component={LavagemDetails} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='LavagemDetailsOperacoes' component={LavagemDetailsOperacoes} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='LavagemDetailsOperacaoEmpacotar' component={LavagemDetailsOperacaoEmpacotar} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='LavagemDetailsOperacaoRecolher' component={LavagemDetailsOperacaoRecolher} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='LavagemDetailsEdit' component={LavagemDetailsEdit} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='RoupaEmLavagemDetails' component={RoupaEmLavagemDetails} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='RoupaDetails' component={RoupaDetails} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='OperacaoLavar' component={OperacaoLavarScreen} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='OperacaoRecolher' component={OperacaoRecolherScreen} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='OperacaoPassar' component={OperacaoPassarScreen} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='OperacaoPassadorExtra' component={OperacaoPassadorExtraScreen} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='OperacaoEmpacotar' component={OperacaoEmpacotarScreen} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='OperacaoRetirarMaterial' component={OperacaoRetirarMaterialScreen} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='OperacaoAdicionarMaterial' component={OperacaoAdicionarMaterialScreen} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='OperacaoListaDeEntrega' component={OperacaoListaDeEntregaScreen} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='OperacaoLavarTapete' component={OperacaoLavarTapeteScreen} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='OperacaoProntoTapete' component={OperacaoProntoTapeteScreen} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='OperacaoEntregarTapete' component={OperacaoEntregarTapeteScreen} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='MaterialDetails' component={MaterialDetails} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='RoupasDoCliente' component={RoupasDoClienteScreen} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='ListaDeCompras' component={ListaDeComprasScreen} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='BancoDeHorasDetails' component={BancoDeHorasDetails} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='ListaDeEntregaDetails' component={ListaDeEntregaDetails} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='ListaDeEntregaDetailsAtendente' component={ListaDeEntregaDetailsAtendente} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='LavagemParaListaDeEntrega' component={LavagemParaListaDeEntregaScreen} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='OperacaoListaDeEntregaDireta' component={OperacaoListaDeEntregaDiretaScreen} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='FechamentoDePontoDetails' component={FechamentoDePontoDetails} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='UsuarioDetails' component={UsuarioDetails} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='BuscaDetails' component={BuscaDetails} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='SelecionarUsuarioDetails' component={SelecionarUsuarioDetails} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='LavagensPendentesDetails' component={LavagensPendentesDetails} options={{ title: '' }} />
        <StackSubGerenteGeral.Screen name='EquipamentoDetails' component={EquipamentoDetails} options={{ title: 'Detalhes do Equipamento' }} />
        <StackSubGerenteGeral.Screen name='ProcessoDetails' component={ProcessoDetails} options={{ title: 'Detalhes do Processo' }} />
      </StackSubGerenteGeral.Navigator>
    );
  }

// const StackGerenteDeOperacoes = createStackNavigator(
//   {
//     LavagemDetails: LavagemDetails,
//     LavagemDetailsOperacoes: LavagemDetailsOperacoes,
//     LavagemDetailsOperacaoEmpacotar: LavagemDetailsOperacaoEmpacotar,
//     LavagemDetailsOperacaoRecolher: LavagemDetailsOperacaoRecolher,
//     LavagemDetailsEdit: LavagemDetailsEdit,
//     AvaliacaoDetailsSoLeitura: AvaliacaoDetailsSoLeitura,
//     AvaliacaoDetails: AvaliacaoDetailsSoLeitura,
//     RoupaEmLavagemDetails: RoupaEmLavagemDetails,
//     RoupasDoCliente: RoupasDoClienteScreen,
//     RoupaDetails: RoupaDetails,
//     OperacaoLavar: OperacaoLavarScreen,
//     OperacaoRecolher: OperacaoRecolherScreen,
//     OperacaoPassar: OperacaoPassarScreen,
//     OperacaoPassadorExtra: OperacaoPassadorExtraScreen,
//     OperacaoEmpacotar: OperacaoEmpacotarScreen,
//     OperacaoRetirarMaterial: OperacaoRetirarMaterialScreen,
//     OperacaoAdicionarMaterial: OperacaoAdicionarMaterialScreen,
//     OperacaoListaDeEntrega: OperacaoListaDeEntregaScreen,
//     OperacaoLavarTapete: OperacaoLavarTapeteScreen,
//     OperacaoProntoTapete: OperacaoProntoTapeteScreen,
//     OperacaoEntregarTapete: OperacaoEntregarTapeteScreen,
//     BancoDeHorasDetails: BancoDeHorasDetails,
//     FechamentoDePontoDetails: FechamentoDePontoDetails,
//     ListaDeEntregaDetails: ListaDeEntregaDetails,
//     LavagemParaListaDeEntrega: LavagemParaListaDeEntregaScreen,
//     OperacaoListaDeEntregaDireta: OperacaoListaDeEntregaDiretaScreen,
//     Drawer: DrawerGerenteDeOperacoes,
//   },{
//     initialRouteName: 'Drawer',
//     navigationOptions: {
//       headerTransparent: true,
//     },
//   }
// );

const StackGerenteDeOperacoes = createNativeStackNavigator();

function StackGerenteDeOperacoesFunction()
  {
    return(
      <StackGerenteDeOperacoes.Navigator initialRouteName="Drawer" >
        <StackGerenteDeOperacoes.Screen name='Drawer' component={DrawerGerenteDeOperacoesFunction} options={{ title: '', headerTransparent: true }}/>
        <StackGerenteDeOperacoes.Screen name='MovimentacaoDeCaixaDetails' component={MovimentacaoDeCaixaDetails} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='CaixaDetails' component={CaixaDetails} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='CaixaDetailsSoLeitura' component={CaixaDetailsSoLeitura} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='AvaliacaoDetails' component={AvaliacaoDetails} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='AvaliacaoDetailsSoLeitura' component={AvaliacaoDetailsSoLeitura} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='LavagemDetails' component={LavagemDetails} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='LavagemDetailsOperacoes' component={LavagemDetailsOperacoes} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='LavagemDetailsOperacaoEmpacotar' component={LavagemDetailsOperacaoEmpacotar} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='LavagemDetailsOperacaoRecolher' component={LavagemDetailsOperacaoRecolher} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='LavagemDetailsEdit' component={LavagemDetailsEdit} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='RoupaEmLavagemDetails' component={RoupaEmLavagemDetails} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='RoupaDetails' component={RoupaDetails} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='OperacaoLavar' component={OperacaoLavarScreen} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='OperacaoRecolher' component={OperacaoRecolherScreen} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='OperacaoPassar' component={OperacaoPassarScreen} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='OperacaoPassadorExtra' component={OperacaoPassadorExtraScreen} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='OperacaoEmpacotar' component={OperacaoEmpacotarScreen} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='OperacaoRetirarMaterial' component={OperacaoRetirarMaterialScreen} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='OperacaoAdicionarMaterial' component={OperacaoAdicionarMaterialScreen} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='OperacaoListaDeEntrega' component={OperacaoListaDeEntregaScreen} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='OperacaoLavarTapete' component={OperacaoLavarTapeteScreen} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='OperacaoProntoTapete' component={OperacaoProntoTapeteScreen} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='OperacaoEntregarTapete' component={OperacaoEntregarTapeteScreen} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='MaterialDetails' component={MaterialDetails} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='RoupasDoCliente' component={RoupasDoClienteScreen} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='ListaDeCompras' component={ListaDeComprasScreen} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='BancoDeHorasDetails' component={BancoDeHorasDetails} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='ListaDeEntregaDetails' component={ListaDeEntregaDetails} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='ListaDeEntregaDetailsAtendente' component={ListaDeEntregaDetailsAtendente} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='LavagemParaListaDeEntrega' component={LavagemParaListaDeEntregaScreen} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='OperacaoListaDeEntregaDireta' component={OperacaoListaDeEntregaDiretaScreen} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='FechamentoDePontoDetails' component={FechamentoDePontoDetails} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='UsuarioDetails' component={UsuarioDetails} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='BuscaDetails' component={BuscaDetails} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='SelecionarUsuarioDetails' component={SelecionarUsuarioDetails} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='LavagensPendentesDetails' component={LavagensPendentesDetails} options={{ title: '' }} />
        <StackGerenteDeOperacoes.Screen name='ProcessoDetails' component={ProcessoDetails} options={{ title: 'Detalhes do Processo' }} />
      </StackGerenteDeOperacoes.Navigator>
    );
  }

// const StackSupervisorDeOperacoes = createStackNavigator(
//   {
//     LavagemDetails: LavagemDetailsPapelOperacoes,
//     LavagemDetailsOperacoes: LavagemDetailsOperacoes,
//     LavagemDetailsEdit: LavagemDetailsEdit,
//     LavagemDetailsOperacaoEmpacotar: LavagemDetailsOperacaoEmpacotar,
//     LavagemDetailsOperacaoRecolher: LavagemDetailsOperacaoRecolher,
//     AvaliacaoDetailsSoLeitura: AvaliacaoDetailsSoLeitura,
//     AvaliacaoDetails: AvaliacaoDetailsSoLeitura,
//     RoupaEmLavagemDetails: RoupaEmLavagemDetails,
//     RoupasDoCliente: RoupasDoClienteScreen,
//     RoupaDetails: RoupaDetails,
//     Operacoes: OperacoesCelularScreen,
//     OperacaoLavar: OperacaoLavarScreen,
//     OperacaoRecolher: OperacaoRecolherScreen,
//     OperacaoPassar: OperacaoPassarScreen,
//     OperacaoPassadorExtra: OperacaoPassadorExtraScreen,
//     OperacaoEmpacotar: OperacaoEmpacotarScreen,
//     OperacaoRetirarMaterial: OperacaoRetirarMaterialScreen,
//     OperacaoAdicionarMaterial: OperacaoAdicionarMaterialScreen,
//     OperacaoListaDeEntrega: OperacaoListaDeEntregaScreen,
//     OperacaoLavarTapete: OperacaoLavarTapeteScreen,
//     OperacaoProntoTapete: OperacaoProntoTapeteScreen,
//     OperacaoEntregarTapete: OperacaoEntregarTapeteScreen,
//     ListaDeEntregaDetails: ListaDeEntregaDetails,
//     LavagemParaListaDeEntrega: LavagemParaListaDeEntregaScreen,
//     OperacaoListaDeEntregaDireta: OperacaoListaDeEntregaDiretaScreen,
//     BancoDeHorasDetails: BancoDeHorasDetails,
//     FechamentoDePontoDetails: FechamentoDePontoDetails,
//     Drawer: DrawerSupervisorDeOperacoes,
//   },{
//     initialRouteName: 'Drawer',
//     navigationOptions: {
//       headerTransparent: true,
//     },
//   }
// );

const StackSupervisorDeOperacoes = createNativeStackNavigator();

function StackSupervisorDeOperacoesFunction()
  {
    return(
      <StackSupervisorDeOperacoes.Navigator initialRouteName="Drawer" >
        <StackSupervisorDeOperacoes.Screen name='Drawer' component={DrawerSupervisorDeOperacoesFunction} options={{ title: '', headerTransparent: true }}/>
        <StackSupervisorDeOperacoes.Screen name='MovimentacaoDeCaixaDetails' component={MovimentacaoDeCaixaDetails} options={{ title: 'Movimentação de Caixa' }} />
        <StackSupervisorDeOperacoes.Screen name='CaixaDetails' component={CaixaDetails} options={{ title: 'Caixa' }} />
        <StackSupervisorDeOperacoes.Screen name='CaixaDetailsSoLeitura' component={CaixaDetailsSoLeitura} options={{ title: 'Caixa' }} />
        <StackSupervisorDeOperacoes.Screen name='AvaliacaoDetails' component={AvaliacaoDetails} options={{ title: 'Avaliação' }} />
        <StackSupervisorDeOperacoes.Screen name='AvaliacaoDetailsSoLeitura' component={AvaliacaoDetailsSoLeitura} options={{ title: 'Avaliação' }} />
        <StackSupervisorDeOperacoes.Screen name='LavagemDetails' component={LavagemDetailsPapelOperacoes} options={{ title: 'Lavagem' }} />
        <StackSupervisorDeOperacoes.Screen name='LavagemDetailsOperacoes' component={LavagemDetailsOperacoes} options={{ title: 'Operações em Lavagem' }} />
        <StackSupervisorDeOperacoes.Screen name='LavagemDetailsOperacaoEmpacotar' component={LavagemDetailsOperacaoEmpacotar} options={{ title: 'Empacotar' }} />
        <StackSupervisorDeOperacoes.Screen name='LavagemDetailsOperacaoRecolher' component={LavagemDetailsOperacaoRecolher} options={{ title: 'Recolher do Varal' }} />
        <StackSupervisorDeOperacoes.Screen name='LavagemDetailsEdit' component={LavagemDetailsEdit} options={{ title: 'Editar Lavagem' }} />
        <StackSupervisorDeOperacoes.Screen name='RoupaEmLavagemDetails' component={RoupaEmLavagemDetails} options={{ title: 'Roupa em Lavagem' }} />
        <StackSupervisorDeOperacoes.Screen name='RoupaDetails' component={RoupaDetails} options={{ title: 'Roupa' }} />
        <StackSupervisorDeOperacoes.Screen name='OperacaoLavar' component={OperacaoLavarScreen} options={{ title: 'Lavar' }} />
        <StackSupervisorDeOperacoes.Screen name='OperacaoRecolher' component={OperacaoRecolherScreen} options={{ title: 'Recolher' }} />
        <StackSupervisorDeOperacoes.Screen name='OperacaoPassar' component={OperacaoPassarScreen} options={{ title: 'Passar' }} />
        <StackSupervisorDeOperacoes.Screen name='OperacaoPassadorExtra' component={OperacaoPassadorExtraScreen} options={{ title: 'Passador Extra' }} />
        <StackSupervisorDeOperacoes.Screen name='OperacaoEmpacotar' component={OperacaoEmpacotarScreen} options={{ title: 'Empacotar' }} />
        <StackSupervisorDeOperacoes.Screen name='OperacaoRetirarMaterial' component={OperacaoRetirarMaterialScreen} options={{ title: 'Retirar Material' }} />
        <StackSupervisorDeOperacoes.Screen name='OperacaoAdicionarMaterial' component={OperacaoAdicionarMaterialScreen} options={{ title: 'Adicionar Material' }} />
        <StackSupervisorDeOperacoes.Screen name='OperacaoListaDeEntrega' component={OperacaoListaDeEntregaScreen} options={{ title: 'Lista de Entrega' }} />
        <StackSupervisorDeOperacoes.Screen name='OperacaoLavarTapete' component={OperacaoLavarTapeteScreen} options={{ title: 'Lavar Tapete' }} />
        <StackSupervisorDeOperacoes.Screen name='OperacaoProntoTapete' component={OperacaoProntoTapeteScreen} options={{ title: 'Tapete Pronto' }} />
        <StackSupervisorDeOperacoes.Screen name='OperacaoEntregarTapete' component={OperacaoEntregarTapeteScreen} options={{ title: 'Entregar Tapete' }} />
        <StackSupervisorDeOperacoes.Screen name='MaterialDetails' component={MaterialDetails} options={{ title: 'Material' }} />
        <StackSupervisorDeOperacoes.Screen name='RoupasDoCliente' component={RoupasDoClienteScreen} options={{ title: 'Roupas do Cliente' }} />
        <StackSupervisorDeOperacoes.Screen name='ListaDeCompras' component={ListaDeComprasScreen} options={{ title: 'Lista de Compras' }} />
        <StackSupervisorDeOperacoes.Screen name='BancoDeHorasDetails' component={BancoDeHorasDetails} options={{ title: 'Banco de Horas' }} />
        <StackSupervisorDeOperacoes.Screen name='ListaDeEntregaDetails' component={ListaDeEntregaDetails} options={{ title: 'Lista de Entrega' }} />
        <StackSupervisorDeOperacoes.Screen name='ListaDeEntregaDetailsAtendente' component={ListaDeEntregaDetailsAtendente} options={{ title: 'Lista de Entrega' }} />
        <StackSupervisorDeOperacoes.Screen name='LavagemParaListaDeEntrega' component={LavagemParaListaDeEntregaScreen} options={{ title: 'Lavagem para Lista de Entrega' }} />
        <StackSupervisorDeOperacoes.Screen name='OperacaoListaDeEntregaDireta' component={OperacaoListaDeEntregaDiretaScreen} options={{ title: 'Operação Lista de Entrega' }} />
        <StackSupervisorDeOperacoes.Screen name='FechamentoDePontoDetails' component={FechamentoDePontoDetails} options={{ title: 'Fechamento de Ponto' }} />
        <StackSupervisorDeOperacoes.Screen name='UsuarioDetails' component={UsuarioDetails} options={{ title: 'Usuário' }} />
        <StackSupervisorDeOperacoes.Screen name='BuscaDetails' component={BuscaDetails} options={{ title: 'Busca' }} />
        <StackSupervisorDeOperacoes.Screen name='SelecionarUsuarioDetails' component={SelecionarUsuarioDetails} options={{ title: 'Selecionar Usuário' }} />
        <StackSupervisorDeOperacoes.Screen name='LavagensPendentesDetails' component={LavagensPendentesDetails} options={{ title: 'Lavagens Pendentes' }} />
        <StackSupervisorDeOperacoes.Screen name='ProcessoDetails' component={ProcessoDetails} options={{ title: 'Detalhes do Processo' }} />
      </StackSupervisorDeOperacoes.Navigator>
    );
  }

// const StackOperacoes = createStackNavigator(
//   {
//     AvaliacaoDetailsSoLeitura: AvaliacaoDetailsSoLeitura,
//     AvaliacaoDetails: AvaliacaoDetailsSoLeitura,
//     BancoDeHorasDetails: BancoDeHorasDetails,
//     FechamentoDePontoDetails: FechamentoDePontoDetails,
//     Drawer: DrawerOperacoes,
//   },{
//     initialRouteName: 'Drawer',
//     navigationOptions: {
//       headerTransparent: true,
//     },
//   }
// );

const StackOperacoes = createNativeStackNavigator();

function StackOperacoesFunction()
  {
    return(
      <StackSupervisorDeOperacoes.Navigator initialRouteName="Drawer" >
        <StackSupervisorDeOperacoes.Screen name='Drawer' component={DrawerOperacoesFunction} options={{ title: '', headerTransparent: true }}/>
        <StackSupervisorDeOperacoes.Screen name='AvaliacaoDetails' component={AvaliacaoDetailsSoLeitura} options={{ title: '' }} />
        <StackSupervisorDeOperacoes.Screen name='AvaliacaoDetailsSoLeitura' component={AvaliacaoDetailsSoLeitura} options={{ title: '' }} />
        <StackSupervisorDeOperacoes.Screen name='BancoDeHorasDetails' component={BancoDeHorasDetails} options={{ title: '' }} />
        <StackSupervisorDeOperacoes.Screen name='FechamentoDePontoDetails' component={FechamentoDePontoDetails} options={{ title: '' }} />
      </StackSupervisorDeOperacoes.Navigator>
    );
  }

// const StackAplicativo = createStackNavigator(
//   {
//     LavagemDetails: LavagemDetailsOperacoes,
//     LavagemDetailsOperacoes: LavagemDetailsOperacoes,
//     LavagemDetailsOperacaoEmpacotar: LavagemDetailsOperacaoEmpacotar,
//     LavagemDetailsOperacaoRecolher: LavagemDetailsOperacaoRecolher,
//     AvaliacaoDetailsSoLeitura: AvaliacaoDetailsSoLeitura,
//     AvaliacaoDetails: AvaliacaoDetailsSoLeitura,
//     RoupaEmLavagemDetails: RoupaEmLavagemDetails,
//     RoupasDoCliente: RoupasDoClienteScreen,
//     RoupaDetails: RoupaDetails,
//     Operacoes: OperacoesScreen,
//     OperacaoLavar: OperacaoLavarScreen,
//     OperacaoRecolher: OperacaoRecolherScreen,
//     OperacaoPassar: OperacaoPassarScreen,
//     OperacaoPassadorExtra: OperacaoPassadorExtraScreen,
//     OperacaoEmpacotar: OperacaoEmpacotarScreen,
//     OperacaoRetirarMaterial: OperacaoRetirarMaterialScreen,
//     OperacaoAdicionarMaterial: OperacaoAdicionarMaterialScreen,
//     OperacaoListaDeEntrega: OperacaoListaDeEntregaScreen,
//     OperacaoLavarTapete: OperacaoLavarTapeteScreen,
//     OperacaoProntoTapete: OperacaoProntoTapeteScreen,
//     OperacaoEntregarTapete: OperacaoEntregarTapeteScreen,
//     ListaDeEntregaDetails: ListaDeEntregaDetails,
//     LavagemParaListaDeEntrega: LavagemParaListaDeEntregaScreen,
//     OperacaoListaDeEntregaDireta: OperacaoListaDeEntregaDiretaScreen,
//     Drawer: DrawerAplicativo,
//   },{
//     initialRouteName: 'Drawer',
//     navigationOptions: {
//       headerTransparent: true,
//     },
//   }
// );

const StackAplicativo = createNativeStackNavigator();

function StackAplicativoFunction()
  {
    return(
      <StackAplicativo.Navigator initialRouteName="Drawer" >
        <StackAplicativo.Screen name='Drawer' component={DrawerAplicativoFunction} options={{ title: '', headerTransparent: true }}/>
        <StackAplicativo.Screen name='MovimentacaoDeCaixaDetails' component={MovimentacaoDeCaixaDetails} options={{ title: '' }} />
        <StackAplicativo.Screen name='CaixaDetails' component={CaixaDetails} options={{ title: '' }} />
        <StackAplicativo.Screen name='CaixaDetailsSoLeitura' component={CaixaDetailsSoLeitura} options={{ title: '' }} />
        <StackAplicativo.Screen name='AvaliacaoDetails' component={AvaliacaoDetails} options={{ title: '' }} />
        <StackAplicativo.Screen name='AvaliacaoDetailsSoLeitura' component={AvaliacaoDetailsSoLeitura} options={{ title: '' }} />
        <StackAplicativo.Screen name='LavagemDetails' component={LavagemDetailsPapelOperacoes} options={{ title: '' }} />
        <StackAplicativo.Screen name='LavagemDetailsOperacoes' component={LavagemDetailsOperacoes} options={{ title: '' }} />
        <StackAplicativo.Screen name='LavagemDetailsOperacaoEmpacotar' component={LavagemDetailsOperacaoEmpacotar} options={{ title: '' }} />
        <StackAplicativo.Screen name='LavagemDetailsOperacaoRecolher' component={LavagemDetailsOperacaoRecolher} options={{ title: '' }} />
        <StackAplicativo.Screen name='LavagemDetailsEdit' component={LavagemDetailsEdit} options={{ title: '' }} />
        <StackAplicativo.Screen name='RoupaEmLavagemDetails' component={RoupaEmLavagemDetails} options={{ title: '' }} />
        <StackAplicativo.Screen name='RoupaDetails' component={RoupaDetails} options={{ title: '' }} />
        <StackAplicativo.Screen name='OperacaoLavar' component={OperacaoLavarScreen} options={{ title: '' }} />
        <StackAplicativo.Screen name='OperacaoRecolher' component={OperacaoRecolherScreen} options={{ title: '' }} />
        <StackAplicativo.Screen name='OperacaoPassar' component={OperacaoPassarScreen} options={{ title: '' }} />
        <StackAplicativo.Screen name='OperacaoPassadorExtra' component={OperacaoPassadorExtraScreen} options={{ title: '' }} />
        <StackAplicativo.Screen name='OperacaoEmpacotar' component={OperacaoEmpacotarScreen} options={{ title: '' }} />
        <StackAplicativo.Screen name='OperacaoRetirarMaterial' component={OperacaoRetirarMaterialScreen} options={{ title: '' }} />
        <StackAplicativo.Screen name='OperacaoAdicionarMaterial' component={OperacaoAdicionarMaterialScreen} options={{ title: '' }} />
        <StackAplicativo.Screen name='OperacaoListaDeEntrega' component={OperacaoListaDeEntregaScreen} options={{ title: '' }} />
        <StackAplicativo.Screen name='OperacaoLavarTapete' component={OperacaoLavarTapeteScreen} options={{ title: '' }} />
        <StackAplicativo.Screen name='OperacaoProntoTapete' component={OperacaoProntoTapeteScreen} options={{ title: '' }} />
        <StackAplicativo.Screen name='OperacaoEntregarTapete' component={OperacaoEntregarTapeteScreen} options={{ title: '' }} />
        <StackAplicativo.Screen name='MaterialDetails' component={MaterialDetails} options={{ title: '' }} />
        <StackAplicativo.Screen name='RoupasDoCliente' component={RoupasDoClienteScreen} options={{ title: '' }} />
        <StackAplicativo.Screen name='ListaDeCompras' component={ListaDeComprasScreen} options={{ title: '' }} />
        <StackAplicativo.Screen name='BancoDeHorasDetails' component={BancoDeHorasDetails} options={{ title: '' }} />
        <StackAplicativo.Screen name='ListaDeEntregaDetails' component={ListaDeEntregaDetails} options={{ title: '' }} />
        <StackAplicativo.Screen name='ListaDeEntregaDetailsAtendente' component={ListaDeEntregaDetailsAtendente} options={{ title: '' }} />
        <StackAplicativo.Screen name='LavagemParaListaDeEntrega' component={LavagemParaListaDeEntregaScreen} options={{ title: '' }} />
        <StackAplicativo.Screen name='OperacaoListaDeEntregaDireta' component={OperacaoListaDeEntregaDiretaScreen} options={{ title: '' }} />
        <StackAplicativo.Screen name='FechamentoDePontoDetails' component={FechamentoDePontoDetails} options={{ title: '' }} />
        <StackAplicativo.Screen name='UsuarioDetails' component={UsuarioDetails} options={{ title: '' }} />
        <StackAplicativo.Screen name='BuscaDetails' component={BuscaDetails} options={{ title: '' }} />
        <StackAplicativo.Screen name='SelecionarUsuarioDetails' component={SelecionarUsuarioDetails} options={{ title: '' }} />
        <StackAplicativo.Screen name='LavagensPendentesDetails' component={LavagensPendentesDetails} options={{ title: '' }} />
      </StackAplicativo.Navigator>
    );
  }

// const StackAtendente = createStackNavigator(
//   {
//     MovimentacaoDeCaixaDetails: MovimentacaoDeCaixaDetails,
//     CaixaDetails: CaixaDetails,
//     CaixaDetailsSoLeitura: CaixaDetailsSoLeitura,
//     LavagemDetails: LavagemDetails,
//     LavagemDetailsEdit: LavagemDetailsEdit,
//     AvaliacaoDetails: AvaliacaoDetails,
//     AvaliacaoDetailsSoLeitura: AvaliacaoDetailsSoLeitura,
//     RoupaEmLavagemDetails: RoupaEmLavagemDetails,
//     RoupasDoCliente: RoupasDoClienteScreen,
//     RoupaDetails: RoupaDetails,
//     UsuarioDetails: UsuarioDetails,
//     ListaDeEntregaDetailsAtendente: ListaDeEntregaDetailsAtendente,
//     BuscaDetails: BuscaDetails,
//     SelecionarUsuarioDetails: SelecionarUsuarioDetails,
//     LavagensPendentesDetails: LavagensPendentesDetails,
//     Drawer: DrawerAtendente,
//   },{
//     initialRouteName: 'Drawer',
//     navigationOptions: {
//       headerTransparent: true,
//     },
//   }
// );

const StackAtendente = createNativeStackNavigator();

function StackAtendenteFunction()
  {
    return(
      <StackAtendente.Navigator initialRouteName="Drawer" >
        <StackAtendente.Screen name='Drawer' component={DrawerAtendenteFunction} options={{ title: '', headerTransparent: true }}/>
        <StackAtendente.Screen name='MovimentacaoDeCaixaDetails' component={MovimentacaoDeCaixaDetails} options={{ title: '' }} />
        <StackAtendente.Screen name='CaixaDetails' component={CaixaDetails} options={{ title: '' }} />
        <StackAtendente.Screen name='CaixaDetailsSoLeitura' component={CaixaDetailsSoLeitura} options={{ title: '' }} />
        <StackAtendente.Screen name='AvaliacaoDetails' component={AvaliacaoDetails} options={{ title: '' }} />
        <StackAtendente.Screen name='AvaliacaoDetailsSoLeitura' component={AvaliacaoDetailsSoLeitura} options={{ title: '' }} />
        <StackAtendente.Screen name='LavagemDetails' component={LavagemDetailsPapelOperacoes} options={{ title: '' }} />
        <StackAtendente.Screen name='LavagemDetailsOperacoes' component={LavagemDetailsOperacoes} options={{ title: '' }} />
        <StackAtendente.Screen name='LavagemDetailsOperacaoEmpacotar' component={LavagemDetailsOperacaoEmpacotar} options={{ title: '' }} />
        <StackAtendente.Screen name='LavagemDetailsOperacaoRecolher' component={LavagemDetailsOperacaoRecolher} options={{ title: '' }} />
        <StackAtendente.Screen name='LavagemDetailsEdit' component={LavagemDetailsEdit} options={{ title: '' }} />
        <StackAtendente.Screen name='RoupaEmLavagemDetails' component={RoupaEmLavagemDetails} options={{ title: '' }} />
        <StackAtendente.Screen name='RoupaDetails' component={RoupaDetails} options={{ title: '' }} />
        <StackAtendente.Screen name='OperacaoLavar' component={OperacaoLavarScreen} options={{ title: '' }} />
        <StackAtendente.Screen name='OperacaoRecolher' component={OperacaoRecolherScreen} options={{ title: '' }} />
        <StackAtendente.Screen name='OperacaoPassar' component={OperacaoPassarScreen} options={{ title: '' }} />
        <StackAtendente.Screen name='OperacaoPassadorExtra' component={OperacaoPassadorExtraScreen} options={{ title: '' }} />
        <StackAtendente.Screen name='OperacaoEmpacotar' component={OperacaoEmpacotarScreen} options={{ title: '' }} />
        <StackAtendente.Screen name='OperacaoRetirarMaterial' component={OperacaoRetirarMaterialScreen} options={{ title: '' }} />
        <StackAtendente.Screen name='OperacaoAdicionarMaterial' component={OperacaoAdicionarMaterialScreen} options={{ title: '' }} />
        <StackAtendente.Screen name='OperacaoListaDeEntrega' component={OperacaoListaDeEntregaScreen} options={{ title: '' }} />
        <StackAtendente.Screen name='OperacaoLavarTapete' component={OperacaoLavarTapeteScreen} options={{ title: '' }} />
        <StackAtendente.Screen name='OperacaoProntoTapete' component={OperacaoProntoTapeteScreen} options={{ title: '' }} />
        <StackAtendente.Screen name='OperacaoEntregarTapete' component={OperacaoEntregarTapeteScreen} options={{ title: '' }} />
        <StackAtendente.Screen name='MaterialDetails' component={MaterialDetails} options={{ title: '' }} />
        <StackAtendente.Screen name='RoupasDoCliente' component={RoupasDoClienteScreen} options={{ title: '' }} />
        <StackAtendente.Screen name='ListaDeCompras' component={ListaDeComprasScreen} options={{ title: '' }} />
        <StackAtendente.Screen name='BancoDeHorasDetails' component={BancoDeHorasDetails} options={{ title: '' }} />
        <StackAtendente.Screen name='ListaDeEntregaDetails' component={ListaDeEntregaDetails} options={{ title: '' }} />
        <StackAtendente.Screen name='ListaDeEntregaDetailsAtendente' component={ListaDeEntregaDetailsAtendente} options={{ title: '' }} />
        <StackAtendente.Screen name='LavagemParaListaDeEntrega' component={LavagemParaListaDeEntregaScreen} options={{ title: '' }} />
        <StackAtendente.Screen name='OperacaoListaDeEntregaDireta' component={OperacaoListaDeEntregaDiretaScreen} options={{ title: '' }} />
        <StackAtendente.Screen name='FechamentoDePontoDetails' component={FechamentoDePontoDetails} options={{ title: '' }} />
        <StackAtendente.Screen name='UsuarioDetails' component={UsuarioDetails} options={{ title: '' }} />
        <StackAtendente.Screen name='BuscaDetails' component={BuscaDetails} options={{ title: '' }} />
        <StackAtendente.Screen name='SelecionarUsuarioDetails' component={SelecionarUsuarioDetails} options={{ title: '' }} />
        <StackAtendente.Screen name='LavagensPendentesDetails' component={LavagensPendentesDetails} options={{ title: '' }} />
      </StackAtendente.Navigator>
    );
  }

  const StackEntregador = createNativeStackNavigator();

function StackEntregadorFunction()
  {
    return(
      <StackEntregador.Navigator initialRouteName="Drawer" >
        <StackEntregador.Screen name='Drawer' component={DrawerEntregadorFunction} options={{ title: '', headerTransparent: true }}/>
        <StackEntregador.Screen name='MovimentacaoDeCaixaDetails' component={MovimentacaoDeCaixaDetails} options={{ title: '' }} />
        <StackEntregador.Screen name='CaixaDetails' component={CaixaDetails} options={{ title: '' }} />
        <StackEntregador.Screen name='CaixaDetailsSoLeitura' component={CaixaDetailsSoLeitura} options={{ title: '' }} />
        <StackEntregador.Screen name='AvaliacaoDetails' component={AvaliacaoDetails} options={{ title: '' }} />
        <StackEntregador.Screen name='AvaliacaoDetailsSoLeitura' component={AvaliacaoDetailsSoLeitura} options={{ title: '' }} />
        <StackEntregador.Screen name='LavagemDetails' component={LavagemDetailsPapelOperacoes} options={{ title: '' }} />
        <StackEntregador.Screen name='LavagemDetailsOperacoes' component={LavagemDetailsOperacoes} options={{ title: '' }} />
        <StackEntregador.Screen name='LavagemDetailsOperacaoEmpacotar' component={LavagemDetailsOperacaoEmpacotar} options={{ title: '' }} />
        <StackEntregador.Screen name='LavagemDetailsOperacaoRecolher' component={LavagemDetailsOperacaoRecolher} options={{ title: '' }} />
        <StackEntregador.Screen name='LavagemDetailsEdit' component={LavagemDetailsEdit} options={{ title: '' }} />
        <StackEntregador.Screen name='RoupaEmLavagemDetails' component={RoupaEmLavagemDetails} options={{ title: '' }} />
        <StackEntregador.Screen name='RoupaDetails' component={RoupaDetails} options={{ title: '' }} />
        <StackEntregador.Screen name='OperacaoLavar' component={OperacaoLavarScreen} options={{ title: '' }} />
        <StackEntregador.Screen name='OperacaoRecolher' component={OperacaoRecolherScreen} options={{ title: '' }} />
        <StackEntregador.Screen name='OperacaoPassar' component={OperacaoPassarScreen} options={{ title: '' }} />
        <StackEntregador.Screen name='OperacaoPassadorExtra' component={OperacaoPassadorExtraScreen} options={{ title: '' }} />
        <StackEntregador.Screen name='OperacaoEmpacotar' component={OperacaoEmpacotarScreen} options={{ title: '' }} />
        <StackEntregador.Screen name='OperacaoRetirarMaterial' component={OperacaoRetirarMaterialScreen} options={{ title: '' }} />
        <StackEntregador.Screen name='OperacaoAdicionarMaterial' component={OperacaoAdicionarMaterialScreen} options={{ title: '' }} />
        <StackEntregador.Screen name='OperacaoListaDeEntrega' component={OperacaoListaDeEntregaScreen} options={{ title: '' }} />
        <StackEntregador.Screen name='OperacaoLavarTapete' component={OperacaoLavarTapeteScreen} options={{ title: '' }} />
        <StackEntregador.Screen name='OperacaoProntoTapete' component={OperacaoProntoTapeteScreen} options={{ title: '' }} />
        <StackEntregador.Screen name='OperacaoEntregarTapete' component={OperacaoEntregarTapeteScreen} options={{ title: '' }} />
        <StackEntregador.Screen name='MaterialDetails' component={MaterialDetails} options={{ title: '' }} />
        <StackEntregador.Screen name='RoupasDoCliente' component={RoupasDoClienteScreen} options={{ title: '' }} />
        <StackEntregador.Screen name='ListaDeCompras' component={ListaDeComprasScreen} options={{ title: '' }} />
        <StackEntregador.Screen name='BancoDeHorasDetails' component={BancoDeHorasDetails} options={{ title: '' }} />
        <StackEntregador.Screen name='ListaDeEntregaDetails' component={ListaDeEntregaDetails} options={{ title: '' }} />
        <StackEntregador.Screen name='ListaDeEntregaDetailsAtendente' component={ListaDeEntregaDetailsAtendente} options={{ title: '' }} />
        <StackEntregador.Screen name='LavagemParaListaDeEntrega' component={LavagemParaListaDeEntregaScreen} options={{ title: '' }} />
        <StackEntregador.Screen name='OperacaoListaDeEntregaDireta' component={OperacaoListaDeEntregaDiretaScreen} options={{ title: '' }} />
        <StackEntregador.Screen name='FechamentoDePontoDetails' component={FechamentoDePontoDetails} options={{ title: '' }} />
        <StackEntregador.Screen name='UsuarioDetails' component={UsuarioDetails} options={{ title: '' }} />
        <StackEntregador.Screen name='BuscaDetails' component={BuscaDetails} options={{ title: '' }} />
        <StackEntregador.Screen name='SelecionarUsuarioDetails' component={SelecionarUsuarioDetails} options={{ title: '' }} />
        <StackEntregador.Screen name='LavagensPendentesDetails' component={LavagensPendentesDetails} options={{ title: '' }} />
      </StackEntregador.Navigator>
    );
  }

// const StackCliente = createStackNavigator(
//   {
//     LavagemDetails: LavagemDetailsCliente,
//     AvaliacaoDetails: AvaliacaoDetails,
//     AvaliacaoDetailsSoLeitura: AvaliacaoDetailsSoLeitura,
//     Drawer: DrawerCliente,
//   },{
//     initialRouteName: 'Drawer',
//     navigationOptions: {
//       headerTransparent: true,
//     },
//   }
// );

const StackCliente = createNativeStackNavigator();

function StackClienteFunction()
  {
    return(
      <StackSupervisorDeOperacoes.Navigator initialRouteName="Drawer" >
        <StackSupervisorDeOperacoes.Screen name='Drawer' component={DrawerClienteFunction} options={{ title: '', headerTransparent: true }}/>
        <StackSupervisorDeOperacoes.Screen name='LavagemDetails' component={LavagemDetailsCliente} options={{ title: '' }} />
        <StackSupervisorDeOperacoes.Screen name='AvaliacaoDetails' component={AvaliacaoDetails} options={{ title: '' }} />
        <StackSupervisorDeOperacoes.Screen name='AvaliacaoDetailsSoLeitura' component={AvaliacaoDetailsSoLeitura} options={{ title: '' }} />
      </StackSupervisorDeOperacoes.Navigator>
    );
  }

// const LoginStack = createSwitchNavigator(
//   {
//     LoadingLogin: LoadingLoginScreen, 
//     Login: LoginScreen,
//     StackAdministrador: StackAdministrador,
//     StackGerenteGeral: StackGerenteGeral,
//     StackSubGerenteGeral: StackSubGerenteGeral,
//     StackGerenteDeOperacoes: StackGerenteDeOperacoes,
//     StackSupervisorDeOperacoes: StackSupervisorDeOperacoes,
//     StackOperacoes: StackOperacoes,
//     StackAtendente: StackAtendente,
//     StackCliente: StackCliente,
//     StackAplicativo: StackAplicativo,
//   },{
//     initialRouteName: 'LoadingLogin',
//     navigationOptions: {
//       headerTransparent: true,
//     },
//   }
// );

  const styles = StyleSheet.create({
    icon: {
      width: 24,
      height: 24,
    },
  });

export default App;
