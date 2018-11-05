export function dataString() {
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
  }