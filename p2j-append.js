//append.js
const fs = require('fs');
const readline = require('readline');
const program = require('commander');
const shared = require('./lib/shared.js');
const Appender = require('./lib/LineProcess.js').Appender;

function parse(source, file){
        if(file.endsWith(".properties")){
	    let app = new Appender({ json: shared.readJSON(source) });
            shared.updateProperties(file, app, shared.appendFile); 
        }
	if (file.endsWith(".json")){
            let app = new Appender({ json: shared.readJSON(file) });
            shared.updateJSON(source, file, app, shared.appendFile);		
	} else {
	    console.log("Error: Input file: " + file +  " is niether a json nor properties file. Skipping.");
	}
}

program 
    .arguments('<source> [files...]')
    .action(function (source, files){
        program.source = source;
        program.files = files;
    });
    
program.parse(process.argv);

//console.log(program.source, program.files); //debug
if(!program.source.endsWith('.json') || !program.source.endsWith('.properties')) {
    console.log("Source file:" + program.source + " is neither a json or properties file. Exiting.");
    process.exit(1);
}

if(!program.files.length){
    console.log("One or more target files are required. Exiting.");
    process.exit(1);
}

program.files.forEach((file)=>{
   parse(program.source, file);
});

