const Converter = require('./lib/LineProcess').Converter;
const LineReader = require('./lib/LineReader').LineReader;
const shared = require('./lib/shared');

let program = require('commander');

function swapExt(file){
    if(file.endsWith(".properties")){
        return file.replace(/\.properties/, ".json");
    }
    if(file.endsWith(".json")){
        return file.replace(/\.json/, ".properties");
    }
}

function parse(file){
   if(!shared.checkExt(file)){
       console.log("Error: Input file: " + file +  " is neither a json nor properties file. Skipping.");
       return;
   }
   new LineReader({
       source: null,
       file: file,
       lineProcessor: new Converter(),
       filewriter: shared.writeFile,
       output: program.output
   }).read();
}

program
    .option('-o --output <path>')
    .arguments('[files...]')
    .action(function(files){
        program.files = files;
    });
program.parse(process.argv);

if(!program.files.length){
    console.log("One or more target files are required.");
    process.exit(1);
}

program.files.forEach((file)=>{
    if(program.output === undefined) program.output = swapExt(file);
    parse(file);
    if(program.output === swapExt(file)) program.output = undefined;
});

console.log("File converted");
