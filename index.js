"use strict";

(function (root) {

    const regexpEscape = /[\[\]\{\}\(\)\*\+\?\.\\\^\$\|\s]/g;
    const flagEscape = /(\\\\)*\\([gimuy]{1,5})$/;

    const reg_amp = /&/g;
    const reg_lt = /</g;
    const reg_gt = />/g;
    const reg_quot = /"/g;
    const reg_apos = /'/g;

    let domParser = null;

    function initDomParser() {
        if (typeof DOMParser !== 'undefined') {
            domParser = new DOMParser();
        } else {
            domParser = new (require('xmldom').DOMParser)();
        }
    }

    function escapeXml(str) {
        return str.replace(reg_amp, '&amp;')
            .replace(reg_lt, '&lt;')
            .replace(reg_gt, '&gt;')
            .replace(reg_quot, '&quot;')
            .replace(reg_apos, '&apos;');
    }

    const Tags = {};

    Tags.regexp = function (strings, ...values) {
        let len = values.length;
        let out = [];
        let i = 0;
        for (; i < len; ++i) {
            out.push(strings.raw[i]);
            out.push(values[i].replace(regexpEscape, "\\$&"));
        }

        let flags = '';

        function findFlag(m, m1, m2) {
            if (m2) {
                flags = m2;
            }
            if (m1) {
                return m1;
            }
            return '';
        }

        out.push(strings.raw[i].replace(flagEscape, findFlag));

        return new RegExp(out.join(''), flags);
    };

    Tags.xml = function (strings, ...values) {
        let len = values.length;
        let out = [];
        let i = 0;

        for (; i < len; ++i) {
            out.push(strings[i]);
            out.push(escapeXml(values[i]));
        }
        out.push(strings[i]);

        return out.join('');
    };

    Tags.dom_xml = function (strings, ...values) {
        if (domParser == null) {
            initDomParser();
        }
        let xmlstr = Tags.xml.apply(null, [strings].concat(values));
        return domParser.parseFromString(xmlstr, "application/xml");
    };

    Tags.dom_svg = function (strings, ...values) {
        if (domParser == null) {
            initDomParser();
        }
        let xmlstr = Tags.xml.apply(null, [strings].concat(values));
        return domParser.parseFromString(xmlstr, "image/svg+xml");
    };

    Tags.dom_html = function (strings, ...values) {
        if (domParser == null) {
            initDomParser();
        }
        let xmlstr = Tags.xml.apply(null, [strings].concat(values));
        return domParser.parseFromString(xmlstr, "text/html");
    };

    if (module && module.exports) {
        module.exports = Tags;
    } else {
        root.Tags = Tags;
    }
})(this);


