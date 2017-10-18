#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const readline = require('readline');
let program = require('commander');

program
    .version("1.0.0")
    .command('update [options] [files...]', 'Update the contents of a json or properties file with the contents of a json or properties file.')
    .command('append [options] [files...]', 'Append the contents of a json or properties file to a json or properties file.')
    .command('convert [options] [files...]', 'Convert a json or properties file to a json or properties file.')
    .parse(process.argv);
