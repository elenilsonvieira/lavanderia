function fetchWithTimeout (url, options, timeout = 10000, i) {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout! Verifique a conexão com a internet.')), timeout)
        )
    ]);
}

export default async function (url, options, timeout = 10000) {
    try{
        return await fetchWithTimeout(url, options, timeout + 5000, 1);
    }catch(error1){
        try{
            return await fetchWithTimeout(url, options, timeout + 10000, 2);
        }catch(error2){
            try{
                return await fetchWithTimeout(url, options, timeout + 15000, 3);
            }catch(error3){
                try{
                    return await fetchWithTimeout(url, options, timeout + 20000, 4);
                }catch(error4){
                    return await fetchWithTimeout(url, options, timeout + 25000, 5);
                }
            }
        }   
    }
}