function power_run(req, fs, callback){
    console.log('\n--------- POWER ---------');
    let inputData;
    let db, jsondb;
    
    // Parse received data.
    req.on('data', (data) =>{
        // Now inputData has Json object.
        inputData = JSON.parse(data);
        console.log('Find name : ' + inputData.name);
        console.log('Power to : ' + inputData.power);
        
        // and jsondb is find with inputData at after.
        db = fs.readFileSync('./db/outlet.json');
        jsondb = JSON.parse(db);
    });
    
    req.on('end',()=>{
        console.log('\nFinding...')
        for(let i = 0; i < jsondb.outlet.length; i++){
            
            // Find inputData and jsondb.
            if(inputData.name == jsondb.outlet[i].name){
                let buf = [Buffer.from('true'), Buffer.from(inputData.power)];
                
                // Full overwrite.
                jsondb.outlet[i].power = buf[0].equals(buf[1]);
                db = JSON.stringify(jsondb);
                try{
                    fs.writeFileSync('./db/outlet.json', db, 'utf8');
                    return callback('Power');
                }catch(err){
                    console.log(' !! ERROR : ' + err);
                    return callback('Error');
                }
            }
        }
        console.log('Wrong name');
        return callback('Wrong name');
    });
}

module.exports = {
    run: power_run
};