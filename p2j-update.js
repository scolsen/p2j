//update properties file using json
const shared = require('./lib/shared');
const LineReader = require('./lib/LineReader').LineReader;
const Updater = require('./lib/LineProcess').Updater;
const Converter = require('./lib/LineProcess').Converter;

let program = require('commander');

function parse(source, file){
    	if(!shared.checkExt(file)){
	        console.log("Error: Input file: " + file +  " is neither a json nor properties file. Skipping.");
	        return;
        }

       if(source.endsWith('.properties') && file.endsWith('.properties')
        || source.endsWith('.json') && file.endsWith('.json')){
            new LineReader({
                source: source,
                file: file,
                lineProcessor: new Converter(),
                filewriter: shared.writeFile,
                output: shared.swapExt(program.output)
            }).read(file, new Updater(), shared.writeFile, program.output);
       } else {
        new LineReader({
            source: shared.swapExt(source),
            file: file,
            lineProcessor: new Updater(),
            filewriter: shared.writeFile,
            output: program.output
        }).read();
       }
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
