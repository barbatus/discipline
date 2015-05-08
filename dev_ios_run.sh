#!/bin/sh

DEVICE=0

opts=""
while [[ $# -ge 1 ]]
do
key="$1"

case $key in
    -d|--device)
    DEVICE=1
    ;;
    *)
    opts="$1 $opts"
    ;;
esac

shift
done

meteor="meteor run"
os="ios"
port=3200

if [[ $DEVICE -eq 1 ]]; then
	echo "Running on the device"
	meteor="$meteor $os-device" 
else
	echo "Running on the emulator"
	meteor="$meteor $os"
fi

echo "$meteor --port=$port $opts"

eval "$meteor --port=$port $opts" 
