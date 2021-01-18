import axios from 'axios'

export function apiSend (method, baseURI, param) {
    if(method ==='get'){
        return new Promise((resolve, reject) => {
            axios.get(baseURI,{
                params :param
            })
            .then(result => {
                console.log(result.data)
                resolve(result.data)
            })
            .catch(err=>{
                console.log(err)
                reject(err)
            })
        });
    }
}
 