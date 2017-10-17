const fs = require('fs');
const readline = require('readline');
const Converter = require('./LineProcess.js').Converter;

let program = require('commander');

function swapExt(file){
    if(file.endsWith(".properties")){
        return file.replace(/\.properties/, ".json");
    }
    if(file.endsWith(".json")){
        return file.replace(/\.json/, ".properties");
    }
}

function parse(data, reg){
	if(file.endsWith(".properties")){
            let app = new Converter({ json: {} });
            let rl = readline.createInterface({
                input: fs.createReadStream(file)
            });
            rl.on('line', (line)=>{
                app.pmode(line);
            });
            rl.on('close', (err)=>{
                shared.writeFile(swapExt(file), process.json); 
             });
        }
        if(file.endsWith(".json")){
            let app = new Converter({ json: shared.readJSON(file) });
            app.jmode();
            shared.writeFile(swapExt(file), app.result);
        }
}

program 
    .parse(process.argv);

let files = program.args; //one or more files to update

if(!files.length){
    console.log("One or more target files are required.");
    process.exit(1);
}

files.forEach((file)=>{
   parse(file);
});

console.log("Update complete");
