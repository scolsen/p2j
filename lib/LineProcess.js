//LineProcess class for line processing functions.

class LineProcess {
   constructor({ json }){
        this.result = "";
        this.json = json;
        this.key = "";
   }; 
   jmode(line) {
        this.setKey(line);
   }
   pmode(line){
        this.setKey(line);
   }
   setKey(line){
        this.key = line.split('=', 2);
   }
} 

class Appender extends LineProcess {
    jmode(line, json) {
        super.jmode(line);
        console.log(json);
        json[this.key[0]] = this.key[1];
        this.result = JSON.stringify(json);
    }
    pmode(line, json){
        super.pmode(line);
        for (k in json){
            this.result = this.result + k + "=" + json[k] + "\n";
        } 
        return this.result;
    }
}

class Updater extends LineProcess {
    jmode(line){
        super.jmode(line);
        for(k in this.json){
             if(this.key[0] === k && this.key[1] !== this.json[k]) this.json[key[0]] = this.key[1];	
         }
         this.result = this.json;
    }
    pmode(line){
        super.pmode(line);
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
        return this.result;
    }
}

class Converter extends LineProcess {
    jmode(){
	for(let k in this.json){
	    this.result = this.result + k + "=" + this.json[k] + "\n";
	}
        return this.result;
    }
    pmode(line){
        super.pmode(line);
        if(line === "" || line.match(/^#.*/)){
	  return;  //skip blanks and comments
        }	
        this.json[this.key[0]] = this.key[1];
	this.result = this.json
    }
}

module.exports.Appender = Appender;
module.exports.Updater = Updater;
module.exports.Converter = Converter;
