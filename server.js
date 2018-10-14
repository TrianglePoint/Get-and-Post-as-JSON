const express = require('express');
const app = express();
const url = require('url');
const port = process.env.PORT;
const fs = require('fs');

const login = require('./login');
const load = require('./load');
const power = require('./power');
const temperature = require('./temperature');

function printpathname(req, getOrpost){
    let parseurl = url.parse(req.url);
    console.log('\n ! Someone request the ' + getOrpost + ': ' + 
               parseurl.pathname);
}

// Just connect http://url.com/
app.get('/', (req,res)=>{
    printpathname(req, 'get');
    res.end();
});

// Received request with data.
app.post('/login', (req,res)=>{
    printpathname(req, 'post');
    login.run(req, fs, (result)=>{
        res.write(result);
        res.end();
        console.log('-------------------------' + 
                    '\n\n\nRunning from ' + port + '...');
    });
});
app.get('/load', (req, res)=>{
    printpathname(req, 'get');
    load.run(fs, (result)=>{
        res.write(result);
        res.end();
        console.log('-------------------------' + 
                    '\n\n\nRunning from ' + port + '...');
    })
});

app.post('/power', (req, res)=>{
    printpathname(req, 'post');
    power.run(req, fs, (result)=>{
        res.write(result);
        res.end();
        console.log('-------------------------' + 
                    '\n\n\nRunning from ' + port + '...');
    })
});
app.post('/temperature', (req, res)=>{
    printpathname(req, 'post');
    temperature.run(req, fs, (result)=>{
        res.write(result);
        res.end();
        console.log('-------------------------' + 
                    '\n\n\nRunning from ' + port + '...');
    })
});

app.listen(port, ()=>{
    console.log('Running from ' + port + '...');
});
