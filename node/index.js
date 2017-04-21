#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const readline = require('readline');
global.rootDir = path.resolve(__dirname);

function test(){
	console.log("hello world");
}

function help(){
	console.log("help");
}

function version(){
	console.log("version");
}

const options = {
	"version" : version,
	"help" : help,
	"update" : require(rootDir + "/lib/update.js"),
	"append" : require(rootDir + "/lib/append.js"),
	"convert" : require(rootDir + "/lib/convert.js"),
	"test" : test
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
		exit(0);
	} else {
		let args = process.argv.slice(2, process.argv.length);
		parseArgs(args);
	}
}
main();
