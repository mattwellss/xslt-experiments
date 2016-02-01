/**
 * Obviously this isn't great code, but how neat is it?
 *
 * First: rendering templates with XSLT--available almost everywhere!
 * Second: using mutation observers on the source data to handle re-render
 */

let parser = new DOMParser();

function parseXML (str) {
    return parser.parseFromString(str, 'text/xml');
}

function transformDocument (xmlData, xslSheets, doc) {
    let proc = applyXSLSheets(xmlData, xslSheets);

    let observer = new MutationObserver(function(mutations) {
        mutations.forEach(function (mut) {
            if (MutationHandlers[mut.type]) {
                MutationHandlers[mut.type](mut, xmlData, xslSheets);
            }
        });
    });

    // configuration of the observer:
    let config = {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
    };

    // pass in the target node, as well as the observer options
    observer.observe(xmlData, config);

    return proc.transformToFragment(xmlData, doc);
}

function applyXSLSheets(xmlData, xslSheets) {
    let proc = new XSLTProcessor();

    if (xslSheets instanceof Array === false) {
        xslSheets = [xslSheets];
    }

    xslSheets.forEach(xslSheet => proc.importStylesheet(xslSheet));

    return proc;
}

const MutationHandlers = {
    attributes: function (record) {
        // stub
    },

    childList: function (record, xmlData, xslSheets) {
        for (var node of record.addedNodes) {
            let proc = applyXSLSheets(node, xslSheets);
            proc.transformToFragment(node, xmlData);
            // OK, now where do we put it?
        }
    },

    characterData: function (record) {
        // stub
    }
}

module.exports = {
    parseXML: parseXML,
    transformDocument: transformDocument
};
