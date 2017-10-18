//Line Reader

const readline = require('readline');

class LineReader {
    constructor({ source, file, lineprocessor, filewriter }){
        this.source = source;
        this.file = file;
        this.lineprocessor = lineprocessor;
        this.filewriter = filewriter;
    }
    
    initiateReader(){
        if(source.endsWith('.properties')){
            this.rl = readline.createInterface({
                input: fs.createReadStream(source);
            });
        } else {
            this.rl = readline.createInterface({
                input: fs.createReadStream(file);
            });
        }
    }

    read(){
        this.initiateReader();
        this.rl.on('line', (line)=>{
            if(this.file.endsWith('.json')) this.lineprocessor.jmode(line); 
            if(this.file.endsWith('.properties')) this.lineprocessor.pmode(line);
        });
        this.rl.on('close', (err)=>{
            if(err) console.log(err);
            this.filewriter(file, this.lineprocessor.result); 
        });
    }
}
