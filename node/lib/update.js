//update properties file using json
const readline = require('readline');
const fs = require('fs');

function parse(data){
	let obj = {};
	for (i = 0; i < data.length; i++){
		if(data[i] == "--src" || data[i] == "-source" || data[i] == "-s"){
			obj.src = data[i + 1];
		}
		if(data[i] == "--tar" || data[i] == "--target" || data[i] == "-t" ){
			obj.tar = data[i + 1];
		}
	}
	
	if(obj.tar.match(/.*.properties/)){
		let src = fs.readFileSync(obj.src);
		let rl = readline.createInterface({
			input: fs.createReadStream(obj.tar);
		});
		let val = "";
		let jsrc = JSON.parse(src); 
		rl.on('line', (line)=>{
			let key = line.split('=', 2);
			for(k in jsrc){
				if(key[0] === k && key[1] !== jsrc[k]){
					val = val + key[0] + "=" + jsrc[k] + "\n";	
				} else {
					val = val + line;
				}
			}
		});
		rl.on('close', (err)=>{
			try {
				fs.writeFileSync(obj.tar, val);
				console.log("Updated" + obj.tar);
			} catch(e) {
				console.log("Error writing file" + e);
			}
		});
	} else if (obj.tar.match(/.*.json/)) {
		let jobj = {};
		let jtar = JSON.parse(fs.readFileSync(obj.tar));
		let rl = rl.createInterface({
			input: fs.createReadStream(obj.src);
		});
		rl.on('line' (line)=>{
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
				console.log('updated' + obj.tar);
			} catch (e) {
				console.log("Error writing file.", e);
			}		
		});
	} else {
		console.log("File is niether a properties or json file.");
	}
}

module.exports = function (){
	parse(opts[i]);
	console.log("Update complete. Exiting.");
	process.exitCode = 0;
}
