import {parseXML, transformDocument } from './transformer.js';
let document = require('document');

let dogs = parseXML(require('./Dogs.xml'));
let dogsDocument = transformDocument(
    dogs,
    parseXML(require('./Dogs-template.xsl')),
    document);

document.body.appendChild(dogsDocument);

dogs.documentElement.appendChild(
    (new DOMParser).parseFromString(
        '<dog><name>Matt</name><breed>not dog</breed></dog>', 'text/xml'
    ).documentElement);
