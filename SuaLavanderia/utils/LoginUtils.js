import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveUser(usuario){
    await AsyncStorage.setItem("@SuaLavanderia:usuario", JSON.stringify(usuario));
}

export async function getUser(){
    var usuario;
    
    try{
        usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));
    }catch(exception){
    }

    return usuario;
}

export async function removeUser(){
    return await AsyncStorage.removeItem("@SuaLavanderia:usuario"); 
}