#!/usr/bin/env bash

cp ~/projects/private/hue-server/app.js ~/pi/
cp -r ~/projects/private/hue-server/bin/ ~/pi/bin

cp ~/projects/private/hue-server/package-lock.json ~/pi
cp ~/projects/private/hue-server/package.json ~/pi/

cp -r ~/projects/private/hue-server/public ~/pi/
cp -r ~/projects/private/hue-server/routes ~/pi/
cp -r ~/projects/private/hue-server/views ~/pi/
