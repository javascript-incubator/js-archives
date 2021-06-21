process.env.NODE_ENV = 'production';
const Lectro = require('@lectro/core');
const BuildTools = require('@lectro/enhancer-buildutils');
const path = require('path');

new Lectro('web')
  .use(BuildTools)
  .setEntry({
    worker: path.resolve(__dirname, 'src/itms-worker.js'),
  })
  .devtool('none')
  .build();

new Lectro().build();
