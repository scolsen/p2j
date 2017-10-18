//update properties file using json
const shared = require('./lib/shared');
const LineReader = require('./lib/LineReader').LineReader;
const Updater = require('./lib/LineProcess').Updater;

let program = require('commander');

function parse(source, file){
    	if(!shared.checkExt(file)){
	        console.log("Error: Input file: " + file +  " is neither a json nor properties file. Skipping.");
	        return;
        }

        new LineReader({
            source: source,
            file: file,
            lineProcessor: new Updater(),
            filewriter: shared.writeFile,
            output: program.output
        }).read();
}

program 
    .option('-o, --output <path>', 'Optional output path')
    .arguments('<source> [files...]')
    .action(function(source, files){
       program.source = source;
       program.files = files;
    });

program.parse(process.argv);

if(!program.source.endsWith('.json') && !program.source.endsWith('.properties')) {
    console.log("Source file:" + program.source + " is neither a json or properties file. Exiting.");
    process.exit(1);
}

if(!program.files.length){
    console.log("One or more target files are required.");
    process.exit(1);
}

program.files.forEach((file)=>{
   if(program.output === undefined) program.output = file;
   parse(program.source, file);
   if(program.output === file) program.output = undefined;
});

console.log("Update complete");
