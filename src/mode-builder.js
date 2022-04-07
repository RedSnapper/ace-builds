define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"], function(require, exports, module) {
"use strict";

var Range = require("../range").Range;

var MatchingBraceOutdent = function() {};

(function() {

    this.checkOutdent = function(line, input) {
        if (! /^\s+$/.test(line))
            return false;

        return /^\s*\}/.test(input);
    };

    this.autoOutdent = function(doc, row) {
        var line = doc.getLine(row);
        var match = line.match(/^(\s*\})/);

        if (!match) return 0;

        var column = match[1].length;
        var openBracePos = doc.findMatchingBracket({row: row, column: column});

        if (!openBracePos || openBracePos.row == row) return 0;

        var indent = this.$getIndent(doc.getLine(openBracePos.row));
        doc.replace(new Range(row, 0, row, column-1), indent);
    };

    this.$getIndent = function(line) {
        return line.match(/^\s*/)[0];
    };

}).call(MatchingBraceOutdent.prototype);

exports.MatchingBraceOutdent = MatchingBraceOutdent;
});

define("ace/mode/behaviour/css",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/mode/behaviour/cstyle","ace/token_iterator"], function(require, exports, module) {
"use strict";

var oop = require("../../lib/oop");
var Behaviour = require("../behaviour").Behaviour;
var CstyleBehaviour = require("./cstyle").CstyleBehaviour;
var TokenIterator = require("../../token_iterator").TokenIterator;

var CssBehaviour = function () {

    this.inherit(CstyleBehaviour);

    this.add("colon", "insertion", function (state, action, editor, session, text) {
        if (text === ':' && editor.selection.isEmpty()) {
            var cursor = editor.getCursorPosition();
            var iterator = new TokenIterator(session, cursor.row, cursor.column);
            var token = iterator.getCurrentToken();
            if (token && token.value.match(/\s+/)) {
                token = iterator.stepBackward();
            }
            if (token && token.type === 'support.type') {
                var line = session.doc.getLine(cursor.row);
                var rightChar = line.substring(cursor.column, cursor.column + 1);
                if (rightChar === ':') {
                    return {
                       text: '',
                       selection: [1, 1]
                    };
                }
                if (/^(\s+[^;]|\s*$)/.test(line.substring(cursor.column))) {
                    return {
                       text: ':;',
                       selection: [1, 1]
                    };
                }
            }
        }
    });

    this.add("colon", "deletion", function (state, action, editor, session, range) {
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && selected === ':') {
            var cursor = editor.getCursorPosition();
            var iterator = new TokenIterator(session, cursor.row, cursor.column);
            var token = iterator.getCurrentToken();
            if (token && token.value.match(/\s+/)) {
                token = iterator.stepBackward();
            }
            if (token && token.type === 'support.type') {
                var line = session.doc.getLine(range.start.row);
                var rightChar = line.substring(range.end.column, range.end.column + 1);
                if (rightChar === ';') {
                    range.end.column ++;
                    return range;
                }
            }
        }
    });

    this.add("semicolon", "insertion", function (state, action, editor, session, text) {
        if (text === ';' && editor.selection.isEmpty()) {
            var cursor = editor.getCursorPosition();
            var line = session.doc.getLine(cursor.row);
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar === ';') {
                return {
                   text: '',
                   selection: [1, 1]
                };
            }
        }
    });

    this.add("!important", "insertion", function (state, action, editor, session, text) {
        if (text === '!' && editor.selection.isEmpty()) {
            var cursor = editor.getCursorPosition();
            var line = session.doc.getLine(cursor.row);

            if (/^\s*(;|}|$)/.test(line.substring(cursor.column))) {
                return {
                    text: '!important',
                    selection: [10, 10]
                };
            }
        }
    });

};
oop.inherits(CssBehaviour, CstyleBehaviour);

exports.CssBehaviour = CssBehaviour;
});

define("ace/mode/builder_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {

"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;


var BuilderHighlightRules = function() {
	var internals = ["iAppend","iBase64","iBirth","iBuildMeta","iConsole",
	"iContent","iDate","iDeath","iDecode","iDigest","iEmbed","iEncode","iEq",
	"iEqFamily","iEqNode","iEqSibs","iEval","iExistContent","iExistMedia",
	"iExistNode","iExists","iExistSimilar","iExpr","iField","iFile",
	"iForAncestry","iForIndex","iForNodes","iForPeers","iForQuery","iForSibs",
	"iForSimilar","iForSubs","iForTax","iForTaxNodes","iFullBuild","iGet",
	"iHex","iID","iIndex","iKV","iLang","iLangID","iLayout","iLayoutName",
	"iLeft","iLength","iLink","iLinkRef","iList","iLower","iMath","iMedia",
	"iMid","Internal","iNull","iNumChildren","iNumGen","iNumGens","iNumPage",
	"iNumPages","iNumSib","iPosition","iPreview","iRegex","iRembr","iRembrp",
	"iReplace","iReset","iRight","iSegmentName","iSet","iSetCache",
	"iShortTitle","iSig","iSize","iSuffix","iTax","iTeam","iTech","iTiming",
	"iTitle","iTrim","iTW","iUnHex","iUpper","iUrlEncode","iUse"];

    const brace_i = /\{(?!\|)/;
    const brace_o = /\}/;
    const literal_i = /\{\|(?!\})/;
    const literal_o = /\|\}/;
    const literal_c = /[^\|@]|(\|[^}])+|@(?!comment\()?/m;
    const comment_c = /[^()]+/m;
    const bracket_i = /\(/;
    const bracket_o = /\)/;
    const mt_tag = /^w[A-Z0-9]/;
    const mt_xml = /^w[a-z0-9]/;
    const inject = /%\^*([0-9]+|\([0-9]+\+?\)|[ijknK]([./+-][0-9]+)?|\([ijknK]([./+-][0-9]+)?\)|\(p([s]|[0-9]+)?\))/;
    const macro_inst = /@(\w+)\(/;
    const comment_inst = /@comment\(/;
    const comma = /,/;

	var comment_count = 0;
	var literal_count = 0;
	

	var macro = {
		regex: macro_inst,
		push: "macro",
		token: function (value) {
			if(value == "comment") {
			    this.push = "comment";
				this.nextState = "comment";
			    comment_count++;
    		    var result = "comment.documentation";
    		    if (comment_count == 1) {
    				result = "storage";
    		    }
    			return result;
			} else {
    			this.nextState = "macro";
     			var tag = mt_tag;
    			if(tag.test(value)) {
   				    this.nextState = "tag";
    				return "meta.tag";
    			}
     			var xml = mt_xml;
    			if(xml.test(value)) {
   				    this.nextState = "xml";
    				return "meta.selector";
    			}
    			if (internals.indexOf(value) != -1) {
    				this.nextState = "internal";
    				return "function.buildin";
    			}
    			return "function";
			}
		},
	},
	mbrace = {
		regex : brace_i,
		token: "variable.parameter",
		push: "mbrace"
	},
	mcomma = {
		regex: comma,
		onMatch: function(value,state,stack) {
			var retval;
			switch(state) {
				case "internal": retval="function.buildin"; break;
				case "tag": retval="meta.tag"; break;
				default: retval="function";
			}
			return retval;
		},
		merge: false
	},
	mbracket = {
		regex: bracket_i,
		push: "bracket",
		token: "variable"
	},
	injection = {
	    regex : inject,  //%i or %(j.4) 
		token: "constant"
	},
	comment = {
		regex: comment_inst,
		token: function (value) {
		    var result = "comment.documentation";
		    if (comment_count == 0) {
				result = "storage";
		    }
		    comment_count++;
			return result;
 		},
 		push: "comment"
	},
	literal = {
		regex: literal_i,
		push: "literal",
		token: function (value) {
		    var result = "support.function";
		    if (literal_count == 0) {
				result = "support.class";
		    }
		    literal_count++;
			return result;
 		}
 	};

	var defaultRules = [macro,literal,injection,comment];
	var mbraceRules = [defaultRules,mbrace,mbracket];
	var macroRules = [mbraceRules,mcomma];

	this.$rules = {
		"start" : [
			defaultRules
		],
		"macro" : [
			macroRules,
			{
				token : "function",
				regex : bracket_o,
				merge: false,
				next:	"pop"
			},
			{defaultToken: "variable"}
		],
		
		"internal" : [
			macroRules,
			{
				token : "function.buildin",
				regex : bracket_o,
				merge: false,
				next: "pop"
			},
			{defaultToken: "variable"}
		],

		"tag" : [
			macroRules,
			{
				token : "meta.tag",
				regex : bracket_o,
				merge: true,
				next: "pop"
			},
			{defaultToken: "variable"}
		],
		
		"xml" : [
			macroRules,
			{
				token : "meta.selector",
				regex : bracket_o,
				merge: true,
				next: "pop"
			},
			{defaultToken: "variable"}
		],

		"bracket": [
			defaultRules,
			mbracket,
			{
				regex : bracket_o,
				token: "variable",
				next: "pop"
			},
			{
				defaultToken: "variable"
			}
		],
		"mbrace": [
			mbraceRules,
            {
				regex : brace_o,
				token: "variable.parameter",
				next: "pop"
			},{
				defaultToken: "variable.parameter"
			}
		],
		"comment": [
		    comment,
            {
            		regex: bracket_i,
            		token: function (value) {
            		    var result = "comment.documentation";
            		    if (comment_count == 0) {
            				result = "storage";
            		    }
            		    comment_count++;
            			return result;
             		},
             		push: "comment"
	        },		    
			{
        		regex: bracket_o,
         		next: "pop",
       		    token: function (value) {
    			    if (comment_count > 0) {
    			        comment_count--;
    			    }
        		    var result = "comment.documentation";
        		    if (comment_count == 0) {
        				result = "storage";
        		    }
        			return result;
         		}
 			},
			{
        		regex: comment_c,
        		token: "comment.documentation"
			},
			{
				defaultToken: "comment.documentation"
			}
		],

		"literal": [
		    comment,literal,
			{
        		regex: literal_o,
        		token: function (value) {
    			    if (literal_count > 0) {
    			        literal_count--;
   			        }
        		    var result = "support.function";
    			    if (literal_count == 0) {
        				result = "support.class";
    			    }
         			return result;
         		},
         		next: "pop"
			},
			{
        		regex: literal_c,
        		token: "support.function",
			},
			{
				defaultToken: "support.function"
			}
		],
	};
	this.normalizeRules();
};

oop.inherits(BuilderHighlightRules, TextHighlightRules);
exports.BuilderHighlightRules = BuilderHighlightRules;
});

define("ace/mode/builder",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/matching_brace_outdent","ace/mode/behaviour/css","ace/mode/builder_highlight_rules","ace/range"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var Tokenizer = require("../tokenizer").Tokenizer;
var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;
var CssBehaviour = require("./behaviour/css").CssBehaviour;
var BuilderHighlightRules = require("./builder_highlight_rules").BuilderHighlightRules;
var Range = require("../range").Range;

var Mode = function() {
    this.HighlightRules = BuilderHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = new CssBehaviour();
};
oop.inherits(Mode, TextMode);

(function() {
    this.$id = "ace/mode/builder";
    this.getNextLineIndent = function(state, line, tab) {
        return this.$getIndent(line);
    };

}).call(Mode.prototype);

exports.Mode = Mode;
});                (function() {
                    window.require(["ace/mode/builder"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            