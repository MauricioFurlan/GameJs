/* eslint-disable no-undef */
'use strict';
const webpack = require('webpack');
const path = require('path');
// eslint-disable-next-line no-unused-vars
module.exports = {
  entry: './public/game.js',
  context: path.resolve(__dirname),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'pathOrUrlWhenProductionBuild'
  },
   module: {
     rules: [{
       test: [/\.js$/],
       use: [
         {
           loader: 'babel-loader'
         },
       ]
     }]
   }
   };
