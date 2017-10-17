#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const readline = require('readline');
let program = require('commander');

let pkg = fs.readFileSync(__dirname + '/package.json'); 

function help(){
	console.log("\033[1mName:\033[0m\n\tp2j\n\033[1mUsage:\033[0m\n\tp2j [mode] [files...] [--source] [file] [--target] [file]\n\033[1mDescription:\033[0m\n\tp2j is a utility for converting json files to properties files and vice versa.\n\033[1mOptions:\033[0m\n\t\033[1mconvert\033[0m\n\tConverts any input files of type .json into type .properties, and any files of extension .properties into extension .json. Files are saved in the same location as the original source file and with the same name.\n\t\033[1mupdate\033[0m\n\tUpdates a file specified by the --source flag with the contents of the file specified by the --target flag. Only matched values are updated. If --source is a json file, a properties target is expected. If source is a properties file, a json target is expected.\n\t\033[1mappend\033[0m\n\tAppends the contents of the file specified with --source to the contents of the file specified as --target. Same as update, but appends contents to the end of the file, rather than over write matching contents.");
}

const options = {
	"help" : help,
	"update" : require(rootDir + "/lib/update.js"),
	"append" : require(rootDir + "/lib/append.js"),
	"convert" : require(rootDir + "/lib/convert.js"),
}

function parseArgs(a){
	let c = a[0];
	let opts = a.slice(1, a.length);
	if(options.hasOwnProperty(c)){
		options[c](opts);
	} else {
		console.log("Unrecognized command: " + c + "\n exiting");
		process.exitCode = 1;
	}
}

function main(){
	if(process.argv.length <= 2){
		options.help();
		process.exitCode = 0;
	} else {
		let args = process.argv.slice(2, process.argv.length);
		parseArgs(args);
	}
}

program
    .version("1.0.0")
    .command('update [files]')
    .command('append [files]')
    .command('convert [files]')
    .parse(process.argv);
