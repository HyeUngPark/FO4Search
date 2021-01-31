import axios from 'axios';

export function apiSend(data) {
    return new Promise((resolve, reject) => {
        if(data.method ==='get'){
            axios.get(data.uri,{
                params :data.params
            })
            .then(result => {
                console.log(result.data)
                resolve(result.data)
            })
            .catch(err=>{
                console.log(err)
                reject(err)
            });
        }
    });
} 