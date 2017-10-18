//Line Reader
const fs = require('fs');
const readline = require('readline');
const shared = require('./shared.js');
const Converter = require('./LineProcess').Converter;

class LineReader {
    constructor({ source, file, lineProcessor, filewriter, output}){
        this.source = source;
        this.file = file;
        this.lineProcessor = lineProcessor;
        this.filewriter = filewriter;
        this.output = output;
        if(this.source === null || this.source === undefined) this.source = "NULL"; //set source to file if only a file is given
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
        if(this.file.endsWith('.properties') && this.source.endsWith('.json')) this.json = shared.readJSON(this.source);
        if(this.json === undefined) this.json = {};
    }

    read(file, lineProcessor, filewriter, output){
       if(arguments.length === 4){
         this.next= {
            file: file,
            lineProcessor:lineProcessor,
            filewriter: filewriter,
            output: output
        };
       }
        this.initiateReader();
        this.setJSON();
        this.rl.on('line', (line)=>{
            if(this.file.endsWith('.json')) this.lineProcessor.jmode(line, this.json);
            if(this.file.endsWith('.properties')) this.lineProcessor.pmode(line, this.json);
        });
        this.rl.on('close', (err)=>{
            if(err) console.log(err);
            this.filewriter(this.output, this.lineProcessor.result);
            if(this.next){
                new LineReader({
                    source: this.output,
                    file: this.next.file,
                    lineProcessor: this.next.lineProcessor,
                    filewriter: this.next.filewriter,
                    output: this.next.output
                }).read();
            }
        });
    }
}

module.exports.LineReader = LineReader;
