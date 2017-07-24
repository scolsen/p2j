//update properties file using json
const readline = require('readline');
const fs = require('fs');

function parse(data){
	let obj = {};
	//console.log("\n" + data);
	for (i = 0; i < data.length; i++){
		if(data[i] == "--src" || data[i] == "--source" || data[i] == "-s"){
			obj.src = data[i + 1];
		}
		if(data[i] == "--tar" || data[i] == "--target" || data[i] == "-t" ){
			obj.tar = data[i + 1];
		}
	}
	if(obj.tar.match(/.*.properties/)){
		let src = JSON.parse(fs.readFileSync(obj.src));
		let rl = readline.createInterface({
			input: fs.createReadStream(obj.tar)
		});
		let val = "";
		rl.on('line', (line)=>{
			if(line === "" || line === "\n"){
				val = val + line;
			} else if (line.match(/^#.*|^!.*/)){
				val = val + line;
			} else {
				let key = line.split('=', 2);
				let kflg = false;
				for(k in src){
					if(key[0] === k && key[1] !== src[k]){
						kflg = true;
						val = val + key[0] + "=" + src[k] + "\n";	
					} 
				}
				if(kflg === false){
					val = val + key[0] + "=" + key[1] + "\n";
				}
			}
		});
		rl.on('close', (err)=>{
			try {
				fs.writeFileSync(obj.tar, val);
				console.log("Updated " + obj.tar);
			} catch(e) {
				console.log("Error writing file" + e);
			}
		});
	} else if (obj.tar.match(/.*.json/)) {
		let jobj = {};
		let jtar = JSON.parse(fs.readFileSync(obj.tar));
		let rl = readline.createInterface({
			input: fs.createReadStream(obj.src)
		});
		rl.on('line', (line)=>{
			if(line.match(/^#.*|^!.*/)){
				return;//skip comments
			}
			let key = line.split('=', 2);
			for(k in jtar){
				if(key[0] === k && key[1] !== jtar[k]){
					jtar[key[0]] = key[1];		
				} else {
					//do nothing
				}
			}	
		});
		rl.on('close', ()=>{
			try {
				fs.writeFileSync(obj.tar, JSON.stringify(jtar));
				console.log('updated ' + obj.tar);
			} catch (e) {
				console.log("Error writing file.", e);
			}		
		});
	} else {
		console.log("File is niether a properties or json file.");
	}
}

module.exports = function (opts){
	parse(opts);
	console.log("Update complete. Exiting.");
	process.exitCode = 0;
}
