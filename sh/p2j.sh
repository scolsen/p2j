#!/usr/bin/env bash
#bash implementation of p2j
VERSION=1.0.0
PROPERTIESFILES=()
JSONFILES=()
CONVERT=0

jsonStringify () {
	echo "$1" | sed -E 's/^(.*)/"\1/; s/:/":"/; s/(.*)$/\1",/;' 
}

version () {
	echo "$VERSION"
}

convert () {
	for k in "${PROPERTIESFILES[@]}"
	do
		if [ ! -f $k ]; then 
			echo "$k is not a file"
		else
			echo "$k is indeed a file"
		fi
		JTEXT="{"	
		while read -r line
		do
			echo "$line"
			rline="$(echo $line | sed s/=/:/)" 
			echo "$rline"
			jline="$(jsonStringify "$rline")"
			JTEXT="$JTEXT$jline"
		done < "$k"
		JTEXT="$JTEXT}"
		JTEXT="$(echo "$JTEXT" | sed s/,}/}/)"
		output="$(echo "$k" | sed s/.properties/.json/)"
		echo "$JTEXT"
		echo "$output"
		echo $JTEXT > $output		
	done
	
	for i in "${JSONFILES[@]}"
	do
		PROPTEXT=""
		echo "$i"
	done
}

while test $# -gt 0
do
	case $1 in 
		--version | -v )
			version
			;;
		--help | -h )
			help
			;;
		--convert | -c )
			CONVERT=1
			;;
		--update | -u )
			update
			;;
		--append | -a )
			append
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
echo "${PROPERTIESFILES[@]}"
echo "${JSONFILES[@]}"
if [ $CONVERT -eq 1 ]; then
	convert
fi
