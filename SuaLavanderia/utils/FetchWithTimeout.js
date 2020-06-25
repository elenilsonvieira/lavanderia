function fetchWithTimeout (url, options, timeout = 7000, i) {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout! Verifique a conexão com a internet. T=' + i)), timeout)
        )
    ]);
}

export default async function (url, options, timeout = 7000) {
    try{
        return await fetchWithTimeout(url, options, timeout, 1);
    }catch(error1){
        try{
            return await fetchWithTimeout(url, options, timeout, 2);
        }catch(error2){
            return await fetchWithTimeout(url, options, timeout, 3);
        }   
    }
}