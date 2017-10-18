//shared

const fs = require('fs');

function checkExt(file){
   return file.endsWith('.json') || file.endsWith('.properties');
}

function swapExt(file){
    if(file.endsWith(".properties")){
        return file.replace(/\.properties/, ".json");
    }
    if(file.endsWith(".json")){
        return file.replace(/\.json/, ".properties");
    }
}

function writeFile(file, content){
    try {
	fs.writeFileSync(file, content);
        console.log("Updated " + file);
    } catch(e) {
	console.log("Error writing file" + e);
        process.exitCode = 1;
    }
}

function appendFile(file, content){
    if(file.endsWith('.json')){
       try {
        fs.writeFileSync(file, content);
	        console.log("Appended contents to " + file);
        } catch (e) {
	        console.log("Error appending to file." + e);
	        process.exitCode = 1;
        }
    } else {
      try {
        fs.appendFileSync(file, content);
	        console.log("Appended contents to " + file);
        } catch (e) {
	        console.log("Error appending to file." + e);
	        process.exitCode = 1;
        }
    }

}

function readFile(file){
    return fs.readFileSync(file);
}

function readJSON(file){
    return JSON.parse(readFile(file));
}

function updateJSON(source, file, process, close){
    let rl = readline.createInterface({
        input: fs.createReadStream(source)
    });
    rl.on('line', (line)=>{
       process.jmode(line); 
    });
    rl.on('close', ()=>{
        close(file, JSON.stringify(process.json));
    });
}

function updateProperties(file, process, close){
    let rl = readline.createInterface({
        input: fs.createReadStream(file)
    });
    rl.on('line', (line)=>{
        process.pmode(line);
    });
    rl.on('close', (err)=>{
       close(file, process.result); 
    });
}

module.exports.checkExt = checkExt;
module.exports.swapExt = swapExt;
module.exports.writeFile = writeFile;
module.exports.appendFile = appendFile;
module.exports.readFile = readFile;
module.exports.readJSON = readJSON;
module.exports.updateJSON = updateJSON;
module.exports.updateProperties = updateProperties;
