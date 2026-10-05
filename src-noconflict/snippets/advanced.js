ace.define("ace/snippets/advanced.snippets",["require","exports","module"], function(require, exports, module){module.exports = "";

});

ace.define("ace/snippets/advanced",["require","exports","module","ace/snippets/advanced.snippets"], function(require, exports, module){"use strict";
exports.snippetText = require("./advanced.snippets");
exports.scope = "advanced";

});                (function() {
                    ace.require(["ace/snippets/advanced"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            