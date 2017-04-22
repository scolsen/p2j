#!/usr/bin/env bash
#bash implementation of p2j
VERSION=1.0.0
PROPERTIESFILES=()
JSONFILES=()

version () {
	echo "$VERSION"
}

convert () {
	for k in "${PROPERTIESFILES[@]}"
	do
		echo "$k"
	done
	for i in "${JSONFILES[@]}"
	do
		echo "$i"
	done
}

while test $# -gt 0
do
	case $1 in 
		--version | -v )
			version
			;;
		--convert | -c )
			convert
			;;
		*.properties )
			PROPERTIESFILES=("${PROPERTIESFILES[@]}" "$1")
			;;
		*.json )
			JSONFILES=("${JSONFILES[@]}" "$1")
			;;
		-* )
			echo "Unrecognized command: $1"
			exit 1
			;;
		* ) 
			break
			;;
	esac
	shift
done
