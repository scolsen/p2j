//LineProcess class for line processing functions.

class LineProcess {
   constructor(){
        this.result = "";
        this.key = "";
   }; 
   setKey(line){
        this.key = line.split('=', 2);
   }
} 

class Converter extends LineProcess {
    jmode(line, json){
        this.result = ""; //run multiple times each line, reset result. Not ideal.
        for(let k in json){
	        this.result = this.result + k + "=" + json[k] + "\n";
	    }
        return this.result;
    }
    pmode(line, json){
        super.setKey(line);
        if(line === "" || line.match(/^#.*/)){
	        return;  //skip blanks and comments
        }
        json[this.key[0]] = this.key[1];
	    this.result = JSON.stringify(json);
    }
}

class Appender extends Converter {
    jmode(line, json) {
        super.setKey(line);
        json[this.key[0]] = this.key[1];
        this.result = JSON.stringify(json);
    }
    pmode(line, json){
       super.jmode(line, json);
    }
}

class Updater extends LineProcess {
    jmode(line, json){
        super.setKey(line);
        for(let k in json){
             if(this.key[0] === k && this.key[1] !== json[k]) json[this.key[0]] = this.key[1];
         }
         this.result = JSON.stringify(json);
    }
    pmode(line, json){
        super.setKey(line);
        let k = this.key;
        if(!json.hasOwnProperty(k[0]) || json.hasOwnProperty(k[0]) && json[k[0]] === k[1]) this.result = this.result + k[0] + "=" + k[1] + "\n";
        if(json.hasOwnProperty(k[0]) && k[1] !== json[k[0]]) this.result = this.result + k[0] + "=" + json[k[0]] + "\n";
        return this.result;
    }
}

module.exports.Appender = Appender;
module.exports.Updater = Updater;
module.exports.Converter = Converter;
