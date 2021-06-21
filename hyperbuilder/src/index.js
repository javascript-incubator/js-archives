import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './app';
import fs from 'fs';
import path from 'path';
import express from 'express';
import { ServerStyleSheet } from '@elementary/components';

const SSH = new ServerStyleSheet();
const app = express();

const statichtml =
  ReactDOMServer.renderToString(SSH.collectStyles(<App />)) +
  SSH.getStyleTags();

fs.writeFileSync(
  path.resolve(__dirname, '..', 'public/index.html'),
  statichtml,
  'utf8',
);

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.listen(3303, 'localhost', err => {
  if (err) console.log('Error in serving');
  console.log('Serving on 3303');
});
