//shared

const fs = require('fs');

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
    try {	
        fs.appendFileSync(file, content);
	console.log("Appended contents to " + file);
    } catch (e) {
	console.log("Error appending to file." + e);
	process.exitCode = 1;
    }
}

function readFile(file){
    return fs.readFileSync(file);
}

function readJSON(file){
    return JOSN.parse(readFile(file));
}

function updateJSON(source, file, process, close){
    let rl = readline.createInterface({
        input: fs.createReadStream(source)
    });
    rl.on('line', (line)=>{
       process.jmode(line); 
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

module.exports.writeFile = writeFile;
module.exports.appendFile = appendFile;
module.exports.readFile = readFile;
module.exports.updateJSON = updateJSON;
module.exports.updateProperties = updateProperties;
