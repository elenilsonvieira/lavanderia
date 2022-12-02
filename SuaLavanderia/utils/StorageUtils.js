import AsyncStorage from '@react-native-async-storage/async-storage';

dataString = () => {
    var data = new Date();
    
    var dia = data.getDate();
    var mes = data.getMonth() + 1;

    if(dia < 10){
        dia = '0' + dia;
    }

    if(mes < 10){
        mes = '0' + mes;
    }

    return data.getFullYear() + '' + mes + '' + dia;
};

hash = (usuario) => {        
    var dataString = this.dataString();
    var md5 = require('md5');

    var hashDaSenha = usuario.hashDaSenha;
    var hashDaData = md5(dataString);

    var hash = md5(hashDaSenha + ':' + hashDaData);

    return hash;
};

export async function reloadCor(){
    var usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));//this.getUser();
    var hash = this.hash(usuario);
    var email = usuario.email;

    const chaveObjetos = "@SuaLavanderia:cores";
    const chaveQuantidade = "@SuaLavanderia:quantidadeDeCores";

    const callQuantidade = await fetch(`http://painel.sualavanderia.com.br/api/QuantidadeDeElementos.aspx?objeto=3&login=${email}&senha=${hash}`, 
        { 
            method: 'post' 
        });

    const responseQuantidade = await callQuantidade.text();
    const quantidadeSalva = await AsyncStorage.getItem(chaveQuantidade);

    if(!quantidadeSalva || responseQuantidade != quantidadeSalva){
        const call = await fetch(`http://painel.sualavanderia.com.br/api/BuscarCor.aspx?login=${email}&senha=${hash}`, 
            { 
                method: 'post' 
            });

        const response = await call.json();

        var objetos = [];

        for(index in response){
            const objetoResponse = response[index];

            const objeto = {
                oid: objetoResponse.Oid,
                nome: objetoResponse.Nome,
            };    

            objetos = [...objetos, objeto];
        }

        await AsyncStorage.setItem(chaveObjetos, JSON.stringify(objetos));
        await AsyncStorage.setItem(chaveQuantidade, objetos.length.toString());
    }
}

export async function reloadTipo(){
    var usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));//this.getUser();
    var hash = this.hash(usuario);
    var email = usuario.email;

    const chaveObjetos = "@SuaLavanderia:tipos";
    const chaveQuantidade = "@SuaLavanderia:quantidadeDeTipos";

    const callQuantidade = await fetch(`http://painel.sualavanderia.com.br/api/QuantidadeDeElementos.aspx?objeto=1&login=${email}&senha=${hash}`, 
        { 
            method: 'post' 
        });

    const responseQuantidade = await callQuantidade.text();
    const quantidadeSalva = await AsyncStorage.getItem(chaveQuantidade);

    if(!quantidadeSalva || responseQuantidade != quantidadeSalva){
        const call = await fetch(`http://painel.sualavanderia.com.br/api/BuscarTipo.aspx?login=${email}&senha=${hash}`, 
            { 
                method: 'post' 
            });

        const response = await call.json();

        var objetos = [];

        for(index in response){
            const objetoResponse = response[index];

            const objeto = {
                oid: objetoResponse.Oid,
                nome: objetoResponse.Nome,
                valor: objetoResponse.Valor,
            };    

            objetos = [...objetos, objeto];
        }

        await AsyncStorage.setItem(chaveObjetos, JSON.stringify(objetos));
        await AsyncStorage.setItem(chaveQuantidade, objetos.length.toString());
    }
}

export async function reloadTecido(){
    var usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));//this.getUser();
    var hash = this.hash(usuario);
    var email = usuario.email;

    const chaveObjetos = "@SuaLavanderia:tecidos";
    const chaveQuantidade = "@SuaLavanderia:quantidadeDeTecidos";

    const callQuantidade = await fetch(`http://painel.sualavanderia.com.br/api/QuantidadeDeElementos.aspx?objeto=0&login=${email}&senha=${hash}`, 
        { 
            method: 'post' 
        });

    const responseQuantidade = await callQuantidade.text();
    const quantidadeSalva = await AsyncStorage.getItem(chaveQuantidade);

    if(!quantidadeSalva || responseQuantidade != quantidadeSalva){
        const call = await fetch(`http://painel.sualavanderia.com.br/api/BuscarTecido.aspx?login=${email}&senha=${hash}`, 
            { 
                method: 'post' 
            });

        const response = await call.json();

        var objetos = [];

        for(index in response){
            const objetoResponse = response[index];

            const objeto = {
                oid: objetoResponse.Oid,
                nome: objetoResponse.Nome,
            };    

            objetos = [...objetos, objeto];
        }

        await AsyncStorage.setItem(chaveObjetos, JSON.stringify(objetos));
        await AsyncStorage.setItem(chaveQuantidade, objetos.length.toString());
    }
}

export async function reloadMarca(){
    var usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));//this.getUser();
    var hash = this.hash(usuario);
    var email = usuario.email;

    const chaveObjetos = "@SuaLavanderia:marcas";
    const chaveQuantidade = "@SuaLavanderia:quantidadeDeMarcas";

    const callQuantidade = await fetch(`http://painel.sualavanderia.com.br/api/QuantidadeDeElementos.aspx?objeto=2&login=${email}&senha=${hash}`, 
        { 
            method: 'post' 
        });

    const responseQuantidade = await callQuantidade.text();
    const quantidadeSalva = await AsyncStorage.getItem(chaveQuantidade);

    if(!quantidadeSalva || responseQuantidade != quantidadeSalva){
        const call = await fetch(`http://painel.sualavanderia.com.br/api/BuscarMarca.aspx?login=${email}&senha=${hash}`, 
            { 
                method: 'post' 
            });

        const response = await call.json();

        var objetos = [];

        for(index in response){
            const objetoResponse = response[index];

            const objeto = {
                oid: objetoResponse.Oid,
                nome: objetoResponse.Nome,
            };    

            objetos = [...objetos, objeto];
        }

        await AsyncStorage.setItem(chaveObjetos, JSON.stringify(objetos));
        await AsyncStorage.setItem(chaveQuantidade, objetos.length.toString());
    }
}

export async function reloadTamanho(){
    var usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));//this.getUser();
    var hash = this.hash(usuario);
    var email = usuario.email;

    const chaveObjetos = "@SuaLavanderia:tamanhos";
    const chaveQuantidade = "@SuaLavanderia:quantidadeDeTamanhos";

    const callQuantidade = await fetch(`http://painel.sualavanderia.com.br/api/QuantidadeDeElementos.aspx?objeto=4&login=${email}&senha=${hash}`, 
        { 
            method: 'post' 
        });

    const responseQuantidade = await callQuantidade.text();
    const quantidadeSalva = await AsyncStorage.getItem(chaveQuantidade);

    if(!quantidadeSalva || responseQuantidade != quantidadeSalva){
        const call = await fetch(`http://painel.sualavanderia.com.br/api/BuscarTamanho.aspx?login=${email}&senha=${hash}`, 
            { 
                method: 'post' 
            });

        const response = await call.json();

        var objetos = [];

        for(index in response){
            const objetoResponse = response[index];

            const objeto = {
                oid: objetoResponse.Oid,
                nome: objetoResponse.Nome,
            };    

            objetos = [...objetos, objeto];
        }

        await AsyncStorage.setItem(chaveObjetos, JSON.stringify(objetos));
        await AsyncStorage.setItem(chaveQuantidade, objetos.length.toString());
    }
}

export async function reload(){
    reloadCor();
    reloadMarca();
    reloadTamanho();
    reloadTecido();
    reloadTipo();
}