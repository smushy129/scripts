const fs = require('fs');
const client = require('https');

function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        client.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                    .on('error', reject)
                    .once('close', () => resolve(filepath));
            } else {
                // Consume response data to free up memory
                res.resume();
                reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
            }
        });
    });
}

async function run() {
    for(let i = 2; i <= 2; i++) {
        const url = `https://wallhaven.cc/api/v1/search?q=studio%20ghibli&categories=010&purity=111&sorting=relevance&order=desc&page=${i}`;
    
        await fetch(url)
        .then(res => res.json())
        .then(async res => {
            const { data } = res;
            console.log(data);

            for(let j = 0; j < data.length; j++) {
                await downloadImage(data[j].path, `StudioGlibi-Page${i}-${j}.jpg`);
                await new Promise((resolve, reject) => setTimeout(resolve, 1000));
            }
        });
    }
}

            
run().then(() => console.log("Complete"));
