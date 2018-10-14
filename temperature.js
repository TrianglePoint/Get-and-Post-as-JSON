function temperature_run(req, fs, callback){
    console.log('\n--------- TEMPERATURE ---------');
    let inputData;
    let db, jsondb;
    
    // Parse received data.
    req.on('data', (data) =>{
        // Now inputData has Json object.
        inputData = JSON.parse(data);
        console.log('Find name : ' + inputData.name);
        console.log('min : ' + inputData.min + 
                   '\nMAX : ' + inputData.max);
        
        // and jsondb is find with inputData at after.
        db = fs.readFileSync('./db/outlet.json');
        jsondb = JSON.parse(db);
    });
    
    req.on('end',()=>{
        console.log('\nFinding...')
        for(let i = 0; i < jsondb.outlet.length; i++){
            
            // Find inputData and jsondb.
            if(inputData.name == jsondb.outlet[i].name){
                
                // Full overwrite.
                jsondb.outlet[i].min = parseInt(inputData.min);
                jsondb.outlet[i].max = parseInt(inputData.max);
                db = JSON.stringify(jsondb);
                try{
                    fs.writeFileSync('./db/outlet.json', db, 'utf8');
                    return callback('Temperature');
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
    run: temperature_run
};