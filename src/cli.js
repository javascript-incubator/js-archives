#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');

const workingDir = process.cwd();
const componentDir = process.argv[2];

fs.ensureDirSync(path.resolve(process.cwd(), componentDir));
process.chdir(componentDir);
fs.writeFileSync(
  path.resolve(process.cwd(), 'package.json'),
  JSON.stringify({
    name: componentDir.split('/').slice(-1)[0],
    main: 'build/main.js',
    files: ['build'],
    version: '0.1.0',
    scripts: {
      build: 'node build.js',
    },
  }, null, 2),
);

fs.ensureFileSync(path.resolve(process.cwd(), 'src/index.js'));

fs.writeFileSync(
  path.resolve(process.cwd(), 'build.js'),
  `require('@slayre/componentify')({ moduleDirectory: '${workingDir}' });`,
);
