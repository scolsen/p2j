//append.js
let program = require('commander');
const shared = require('./lib/shared.js');
const Appender = require('./lib/LineProcess.js').Appender;
const LineReader = require('./lib/LineReader').LineReader;

function parse(source, file){
	    if(!shared.checkExt(file)){
	        console.log("Error: Input file: " + file +  " is neither a json nor properties file. Skipping.");
	        return;
        }
        new LineReader({
            source: source,
            file: file,
            lineProcessor: new Appender({ json: {} }),
            filewriter: shared.appendFile,
            output: program.output}).read();
}

program 
    .option('-o --output <path>', "Optional filename for output.")
    .arguments('<source> [files...]')
    .action(function (source, files){
        program.source = source;
        program.files = files;
    });
    
program.parse(process.argv);

//console.log(program.source, program.files); //debug
if(!program.source.endsWith('.json') && !program.source.endsWith('.properties')) {
    console.log("Source file:" + program.source + " is neither a json or properties file. Exiting.");
    process.exit(1);
}

if(!program.files.length){
    console.log("One or more target files are required. Exiting.");
    process.exit(1);
}

program.files.forEach((file)=>{
    if(program.output === undefined) program.output = file;
    parse(program.source, file);
    if(program.output === file) program.output = undefined;
});

