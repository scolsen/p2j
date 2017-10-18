//update properties file using json
const readline = require('readline');
const fs = require('fs');
const shared = require('./lib/shared.js');

let program = require('commander');

function updateProperties(json, file){
    let rl = readline.createInterface({
        input: fs.createReadStream(file)
    });
    let val = "";
    rl.on('line', (line)=>{
        val = processLine({ line: line, container: val, json: json, mode: 'properties' });
    });
    rl.on('close', (err)=>{
       shared.writeFile(file, val); 
    });
}

function updateJSON(source, file){
    let json = JSON.parse(fs.readFileSync(file));
    let rl = readline.createInterface({
        input: fs.createReadStream(source)
    });
    rl.on('line', (line)=>{
       processLine({ line: line, container: "", json: json, mode: 'json' }); 
    });
    rl.on('close', ()=>{
        shared.writeFile(file, JSON.stringify(json));
    });
}

function parse(source, file){
	if(file.endsWith(".properties")){
	    updateProperties(JSON.parse(fs.readFileSync(source)), file);	
            return;	
        } 
        if(file.endsWith(".json")){
            updateJSON(source, file); 
            return; 
        }
	console.log("Target file is niether a properties or json file.");	
}

program 
    .option('-s, --source <source>', 'Source file')
    .parse(process.argv);

let files = program.args; //one or more files to update

if(!files.length){
    console.log("One or more target files are required.");
    process.exit(1);
}

files.forEach((file)=>{
   parse(program.source, file);
});

console.log("Update complete");
