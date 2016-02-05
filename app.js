import { XSLTComponent, parseXML, parseHTML } from './transformer.js';
let document = require('document');

let dogs = new XSLTComponent(parseXML(require('./Dogs.xml')));

let boundTemplate = dogs.bindTemplate(parseXML(require('./Dogs-template.xsl')));

let button = parseHTML('<input type="button" value="add some dogs" />').documentElement;
button.addEventListener('click', function (e) {
    let i = 0;
    let me = (new DOMParser).parseFromString(
        '<dog><name>Matt</name><breed>not dog</breed></dog>', 'text/xml'
    );
    while (i++ < 100) {
        dogs.update('dogs', me.cloneNode(true));
    }
});
document.body.appendChild(button);

boundTemplate.insertInto(document.body);

