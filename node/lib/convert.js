const fs = require('fs');
const readline = require('readline');

function parse(data){
	let properties = {};
	let jProps = "";
	if(data.match(/.*.properties/)){
		let rl = readline.createInterface({
			input: fs.createReadStream(data)
		});
		rl.on('line', (line)=>{
			if(line === "" || line.match(/^#.*/)){
				//skip blanks and comments
			} else {
				let keyVal;
				line = line.replace(/"/g, "");
				if(line.match(/=/) !== null){
					keyVal = line.split("=", 2);
				} else {
					keyVal = line.split(":", 2);
				}
				let k = keyVal[0];
				properties[k] =keyVal[1];
			}
		});
		rl.on('error', (err)=>{
			conosle.log("Error reading file", err);
		});
		rl.on('close', ()=>{
			let name = data.replace(/\.properties/, ".json");
			fs.writeFileSync(name, JSON.stringify(properties));
		});
	} else if (data.match(/.*.json/)){
		let content = fs.readFileSync(data);
		let j = JSON.parse(content);
		for(let k in j){
			jProps = jProps + k + "=" + j[k] + "\n";
		}
		let name = data.replace(/\.json/, ".properties");
		fs.writeFileSync(name, jProps);
	} else {
		console.log("Error. File is not a json or properties file");
	}
}

module.exports = function (opts){
	for(i = 0; i < opts.length; i++){
		parse(opts[i]);
	}
	console.log("Conversions complete. Exiting.");
	process.exitCode = 0;
}
