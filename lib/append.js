//append.js
const fs = require('fs');
const readline = require('readline');
const program = require('commander');
const shared = require('./shared');
const Appender = require('./LineProcess.js').Appender;

function parse(source, file){
        if(file.endsWith(".properties")){
	    let app = new Appender({ json: shared.readJSON(source)) });
            shared.updateProperties(file, app, shared.appendFile); 
	if (file.endsWith(".json")){
            let app = new Appender({ json: shared.readJSON(file) });
            shared.updateJSON(source, file, app, shared.appendFile);		
	} else {
		console.log("error inputs are niether json nor properties files.");
	}
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

