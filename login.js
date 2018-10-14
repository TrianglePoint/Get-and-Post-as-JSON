const fs = require('fs');

function login_run(req, res, callback){
    console.log('\n--------- LOGIN ---------');
    let inputData;
    let db, jsondb;
    
    // Parse received data.
    req.on('data', (data) =>{
        // Now inputData has Json object.
        inputData = JSON.parse(data);
        console.log('Login Id : ' + inputData.id);
        
        // and jsondb is compare with inputData at after.
        db = fs.readFileSync('./db/login.json');
        jsondb = JSON.parse(db);
    });
    
    req.on('end',()=>{
        console.log('\nComparing...')
        for(let i = 0; i < jsondb.users.length; i++){
            
            // Compare inputData and jsondb.
            if(inputData.id == jsondb.users[i].id){
                if(inputData.password == jsondb.users[i].password){
                    console.log('Login')
                    return callback('Login');
                }else{
                    console.log('Wrong password');
                    return callback('Wrong password');
                }
            }
        }
        console.log('Wrong id');
        return callback('Wrong id');
    });
}

module.exports = {
    run: login_run
};