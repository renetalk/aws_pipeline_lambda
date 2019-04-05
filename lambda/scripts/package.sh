#!/bin/#!/bin/sh
if [ -d "node_modules" ]; then
  mv node_modules node_modules_bak
fi

mkdir -p build
npm i --prod
zip -rq archive.zip package.json node_modules
mv archive.zip src/

# add content of src
cd src
zip -rq archive.zip *
mv archive.zip ../build/
cd ..

if [ -d "node_modules_bak" ]; then
  rm -rf node_modules
  mv node_modules_bak node_modules
fi
