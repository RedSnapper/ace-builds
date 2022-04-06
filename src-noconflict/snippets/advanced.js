ace.define("ace/snippets/advanced",["require","exports","module"], function(require, exports, module) {
"use strict";

exports.snippetText =undefined;
exports.scope = "advanced";

});                (function() {
                    ace.require(["ace/snippets/advanced"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            