const express = require('express');
const app = express();
const url = require('url');
const port = process.env.PORT;

const login = require('./login');

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
    login.run(req, res, (result)=>{
        res.write(result);
        res.end();
        console.log('-------------------------' + 
                    '\n\n\nRunning from ' + port + '...');
    });
});
app.listen(port, ()=>{
    console.log('Running from ' + port + '...');
});
