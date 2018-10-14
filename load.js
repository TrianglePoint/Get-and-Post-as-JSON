function load_run(fs, callback){
    console.log('\n--------- LOAD ---------');
    let db, jsondb;
    
    // Read outlet.json.
    console.log('Loading...')
    db = fs.readFileSync('./db/outlet.json');
    
    console.log('Loaded');    
    return callback(db);
}

module.exports = {
    run: load_run
};