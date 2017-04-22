#!/usr/bin/env bash
#bash implementation of p2j
VERSION=1.0.0


version () {
	echo "$VERSION"
}

while test $# -gt 0
do
	case $1 in 
		--version | -v )
			version
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
