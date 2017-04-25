# p2j
Simple utility for conversion of properties files and json.
This tool can:
* Convert properties files to JSON format or JSON files to properties format. 
* Update the contents of a properties file using the contents of a JSON file.
* Append new values to a properties file using the contents of a JSON file.

# Install 
There is both a node.js version and basic sh version of this tool. The sh version is still in development. To install the node version on your system, do the following:
```sh
git clone https://github.com/scolsen/p2j.git
```
After cloning run:
```sh
cd p2j
cd node 
npm install -g
```
**Note:** You may need to run `npm install -g` as root/administrator.

After installation is complete, you can run p2j and view basic help by running the following:

```sh
p2j
```
