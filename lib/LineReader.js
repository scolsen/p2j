//Line Reader
const fs = require('fs');
const readline = require('readline');
const shared = require('./shared.js');

class LineReader {
    constructor({ source, file, lineProcessor, filewriter, output}){
        this.source = source;
        this.file = file;
        this.lineProcessor = lineProcessor;
        this.filewriter = filewriter;
        this.output = output;
    }
  
    initiateReader(){
        if(this.source.endsWith('.properties')){
            this.rl = readline.createInterface({
                input: fs.createReadStream(this.source)
            });
        } else {
            this.rl = readline.createInterface({
                input: fs.createReadStream(this.file)
            });
        }
    }

    setJSON(){
        if(this.file.endsWith('.json')) this.json = shared.readJSON(this.file);
        if(this.file.endsWith('.properties')) this.json = shared.readJSON(this.source);
    }
    
    read(){
        this.initiateReader();
        this.setJSON();
        this.rl.on('line', (line)=>{
            if(this.file.endsWith('.json')) this.lineProcessor.jmode(line, this.json);
            if(this.file.endsWith('.properties')) this.lineProcessor.pmode(line, this.json);
        });
        this.rl.on('close', (err)=>{
            if(err) console.log(err);
            this.filewriter(this.output, this.lineProcessor.result);
        });
    }
}

module.exports.LineReader = LineReader;
