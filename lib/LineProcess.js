//LineProcess class for line processing functions.

class LineProcess {
   constructor({ json }){
        this.result = "";
        this.json = json;
        this.mode = mode;
        this.key = "";
   }; 
   jmode(line) {
        return line; 
   }
   pmode(line){
        return line;
   }
   setKey(line){
        this.key = line.split('=', 2);
   }
} 

class Appender extends LineProcess {
    jmode(line) {
        this.setKey(line);
        this.json[this.key[0]] = this.json[this.key[1]];
    }
    pmode(){
        this.setKey(line);
        for (k in this.json){
            this.result = this.result + k + "=" + this.json[k] + "\n";
        } 
        return this.result;
    }
}

class Updater extends LineProcess {
    jmode(line){
        this.setKey(line);
        for(k in this.json){
             if(this.key[0] === k && this.key[1] !== this.json[k]) this.json[key[0]] = this.key[1];	
         });
    }
    pmode(line){
        this.setKey(line);
        let kflg = false;
        for(k in this.json){
             if(this.key[0] === k && this.key[1] !== this.json[k]){
                 kflg = true;
                 this.result = this.result + this.key[0] + "=" + this.json[k] + "\n";	
             } 
         }
         if(kflg === false){
             this.result = this.result+ this.key[0] + "=" + this.key[1] + "\n";
         }
    }
    return this.result;
}

module.exports.Appender = Appender;
module.exports.Updater = Updater;
