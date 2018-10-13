const express = require('express');
const app = express();
const port = process.env.PORT;
let users = [
    {
        id: "haha"
    }
];

// Just connect http://url.com/
app.get('/', (req,res)=>{
    console.log('Someone request the get.')
    res.end(users[0].id);
});

// Received request with data.
app.post('/', (req,res)=>{
    console.log('Someone request the post');
    var inputData;
    
    // Parse received data.
    req.on('data', (data) =>{
        // Now inputData has Json object.
       inputData = JSON.parse(data);
    });
    // Print inputData.
    req.on('end',()=>{
       console.log('inputed : ' + inputData.id);
    });
    // Send message.
    res.write("Done! Great!");
    res.end();
});
app.listen(port, ()=>{
    console.log('Running from ' + port);
});
