#!/usr/bin/env bash
#bash implementation of p2j
VERSION=1.0.0
PROPERTIESFILES=()
JSONFILES=()
CONVERT=0
UPDATE=0
APPEND=0

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
			echo "$k is not a file, exiting."
			exit
		fi
		JTEXT="{"	
		while read -r line
		do
			if [[ $line == "#"* ]]; then 
				continue
			fi
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
		if [ ! -f $i ]; then 
			echo "$i is not a file, exiting."
			exit
		fi
		PROPTEXT=""
		TFILE=$(mktemp)
		tr -d '\n' < "$i" > "$TFILE"
		IFS="," read -ra ARR < "$TFILE"
		for m in "${ARR[@]}";
		do
			res="$(echo $m | sed 's/{//; s/}//; s/":"/=/; s/" : "/=/; s/"//g; s/$/\n/')"
			PROPTEXT="${PROPTEXT}${res}\n"
		done
		output="$(echo "$i" | sed s/.json/.properties/)"
		echo -e $PROPTEXT > $output
	done
	echo "Conversion complete, exiting."
	exit
}

update () {
	if [[ $TAR_FILE == *".properties" ]]; then 
		
	elif [[ $TAR_FILE == *".json"  ]]; then 

	else 

	fi
}

append () {
echo "test"
}

help_me () {
	echo -e "\033[1mName:\033[0m\n\tp2j\n\033[1mUsage:\033[0m\n\tp2j [option] [files...]\n\033[1mDescription:\033[0m\n\tp2j is a utility for converting json files to properties format and vice versa.\n\033[1m--convert | -c\033[0m\n\tConvert option. Convert input json files to properties, and input properties to json. Saves new files to the original file location."
}

while test $# -gt 0
do
	case $1 in 
		--version | -v )
			version
			;;
		--help | -h )
			help_me
			;;
		--convert | -c )
			CONVERT=1
			;;
		--update | -u )
			UPDATE=1
			;;
		--append | -a )
			APPEND=1
			;;
		*.properties )
			PROPERTIESFILES=("${PROPERTIESFILES[@]}" "$1")
			;;
		*.json )
			JSONFILES=("${JSONFILES[@]}" "$1")
			;;
		--source | -s | --src )
			SRC_FILE=$1
			;;
		--target | -t | --tar )
			TAR_FILE=$1
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
if [ $CONVERT -eq 1 ]; then
	convert
fi
if [ $UPDATE -eq 1 ]; then
	update
fi
if [ $APPEND -eq 1 ]; then
	append
fi
