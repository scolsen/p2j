//append.js
const fs = require('fs');
const readline = require('readline');

function parse(data){
	let obj = {};
	for (i = 0; i < data.length; i++){
		if(data[i] == "--src" || data[i] == "--source" || data[i] == "-s"){
			obj.src = data[i + 1];
		}
		if(data[i] == "--tar" || data[i] == "--target" || data[i] == "-t" ){
			obj.tar = data[i + 1];
		}
	}
	if(obj.tar.match(/.*.properties/)){
		let val = "";
		let src = JSON.parse(fs.readFileSync(obj.src));
		for (k in src){
			val = val + k + "=" + src[k] + "\n";
		}
		try {	
			fs.appendFileSync(obj.tar, val);
			console.log("Appended contents of" + obj.src + " to" + obj.tar);
		} catch (e) {
			console.log("Error appending to file.");
			process.exitCode = 1;
		}
	} else if (obj.tar.match(/.*.json/)){
		let pay = {};
		let rl = readline.createInterface({
			input: fs.createReadStream(obj.src)
		});
		rl.on('line', (line)=>{
			let key = line.split('=', 2);
			pay[key[0]] = pay[key[1]];
		});
		rl.on('close', ()=>{
			fs.appendFileSync(obj.tar, JSON.stringify(pay));
		});
	} else {
		console.log("error inputs are niether json nor properties files.");
	}
}

module.exports = function(opts){
	parse(opts);	
	console.log("Appending complete. Exiting.");
	process.exitCode = 0;
}
