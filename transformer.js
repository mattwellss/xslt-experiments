/**
 * Obviously this isn't great code, but how neat is it?
 *
 * First: rendering templates with XSLT--available almost everywhere!
 * Second: using mutation observers on the source data to handle re-render
 */

let parser = new DOMParser();

let document = require('document');

let makeDataId = (function () {
    let id = 0;
    return function () {
        return 'xslt.'+id++;
    }
}());

function parseXML (str) {
    return parser.parseFromString(str, 'text/xml');
}

function parseHTML (str) {
    return parser.parseFromString(str, 'text/html');
}

class XSLTComponent {

    constructor(xmlDoc) {
        this.doc = xmlDoc;
    }

    bindTemplate(xslDoc) {
        return new XSLTTemplate(this, xslDoc);
    }

    update(xpath, newElem) {
        let y = this.doc.evaluate(xpath, this.doc, null, XPathResult.ANY_TYPE, null);
        console.time('new stuff');
        y.iterateNext().appendChild(newElem.documentElement);
        console.timeEnd('new stuff');
    }
}

class XSLTTemplate {

    constructor(component, xslDoc) {
        this.proc = new XSLTProcessor;
        this.component = component;
        this.xslDoc = xslDoc;
        this.observer = new TemplateDataMutationObserver(this);
        this.proc.importStylesheet(this.xslDoc);
    }

    get component() {
        return this._component.doc;
    }

    set component(comp) {
        this._component = comp;
    }

    get transformedComponent() {
        return this._transformedComponent.firstElementChild.cloneNode(true);
    }

    set transformedComponent(tComp) {
        this._transformedComponent = tComp;
    }

    insertInto(elem) {
        this.transformComponent();
        this.elem = elem;
        this.elem.appendChild(this.transformedComponent);
    }

    transformComponent() {
        this._transformedComponent = this.proc.transformToFragment(this.component, document);
        this._transformedComponent.firstElementChild.setAttribute('data-id', makeDataId());
    }

    updateTransformedComponent() {
        var oldId = this.transformedComponent.getAttribute('data-id');
        this.transformComponent();
        this.elem.replaceChild(this.transformedComponent,
            this.elem.querySelector('[data-id="'+oldId+'"]'));
    }

}

class TemplateDataMutationObserver {
    constructor(xsltTemplate) {
        this.observer = new MutationObserver(muts => muts.forEach(function (mut) {
            MutationHandlers[mut.type](this);
        }, this));

        this.template = xsltTemplate;
        this.observer.observe(xsltTemplate.component, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
        });
    }
}

const MutationHandlers = {
    attributes: function (record) {
        // stub
    },

    childList: function (xslt) {
        xslt.template.updateTransformedComponent();
    },

    characterData: function (record) {
        // stub
    }
}

export { XSLTComponent, parseXML, parseHTML };
