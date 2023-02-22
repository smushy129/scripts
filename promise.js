const fs = require('fs');
const client = require('https');

const url = 'https://jsonplaceholder.typicode.com/todos/1';

function run() {
    return new Promise(async (resolve, reject)=> {
        await fetch(url)
        .then(res => {
            if(res.status === 200){
                resolve(res);
            } else {
                reject(new Error("error"));
            }
        })
    }) 
}

run().then(data => data.json()).then(data => console.log(data));
