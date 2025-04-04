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

define("ace/mode/advanced_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {

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
	"iTitle","iTrim","iTW","iUnHex","iUpper","iUrlEncode","iUrl","iUse"];

	const brace_i = /⎡/;
	const brace_o = /⎤/;
	const literal_i = /⎣/;
	const literal_o = /⎦/;
	const literal_c = /[^⎦⌽]+|⌽(?!comment\()?/m;
	const comment_c = /[^()]+/m;
	const bracket_i = /\(/;
	const bracket_o = /\)/;
	const mt_tag = /^w[A-Z0-9]/;
	const mt_xml = /^w[a-z0-9]/;
	const inject = /⍟\^*([0-9]+|\([0-9]+\+?\)|[ijknK]([./+-][0-9]+)?|\([ijknK]([./+-][0-9]+)?\)|\(p([s]|[0-9]+)?\))/;
    const macro_inst = /⌽(\w+)\(/;
    const comment_inst = /⌽comment\(/;
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

define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"], function(require, exports, module) {
"use strict";

var oop = require("../../lib/oop");
var Range = require("../../range").Range;
var BaseFoldMode = require("./fold_mode").FoldMode;

var FoldMode = exports.FoldMode = function(commentRegex) {
    if (commentRegex) {
        this.foldingStartMarker = new RegExp(
            this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.start)
        );
        this.foldingStopMarker = new RegExp(
            this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.end)
        );
    }
};
oop.inherits(FoldMode, BaseFoldMode);

(function() {
    
    this.foldingStartMarker = /([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;
    this.foldingStopMarker = /^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;
    this.singleLineBlockCommentRe= /^\s*(\/\*).*\*\/\s*$/;
    this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/;
    this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/;
    this._getFoldWidgetBase = this.getFoldWidget;
    this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);
    
        if (this.singleLineBlockCommentRe.test(line)) {
            if (!this.startRegionRe.test(line) && !this.tripleStarBlockCommentRe.test(line))
                return "";
        }
    
        var fw = this._getFoldWidgetBase(session, foldStyle, row);
    
        if (!fw && this.startRegionRe.test(line))
            return "start"; // lineCommentRegionStart
    
        return fw;
    };

    this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline) {
        var line = session.getLine(row);
        
        if (this.startRegionRe.test(line))
            return this.getCommentRegionBlock(session, line, row);
        
        var match = line.match(this.foldingStartMarker);
        if (match) {
            var i = match.index;

            if (match[1])
                return this.openingBracketBlock(session, match[1], row, i);
                
            var range = session.getCommentFoldRange(row, i + match[0].length, 1);
            
            if (range && !range.isMultiLine()) {
                if (forceMultiline) {
                    range = this.getSectionRange(session, row);
                } else if (foldStyle != "all")
                    range = null;
            }
            
            return range;
        }

        if (foldStyle === "markbegin")
            return;

        var match = line.match(this.foldingStopMarker);
        if (match) {
            var i = match.index + match[0].length;

            if (match[1])
                return this.closingBracketBlock(session, match[1], row, i);

            return session.getCommentFoldRange(row, i, -1);
        }
    };
    
    this.getSectionRange = function(session, row) {
        var line = session.getLine(row);
        var startIndent = line.search(/\S/);
        var startRow = row;
        var startColumn = line.length;
        row = row + 1;
        var endRow = row;
        var maxRow = session.getLength();
        while (++row < maxRow) {
            line = session.getLine(row);
            var indent = line.search(/\S/);
            if (indent === -1)
                continue;
            if  (startIndent > indent)
                break;
            var subRange = this.getFoldWidgetRange(session, "all", row);
            
            if (subRange) {
                if (subRange.start.row <= startRow) {
                    break;
                } else if (subRange.isMultiLine()) {
                    row = subRange.end.row;
                } else if (startIndent == indent) {
                    break;
                }
            }
            endRow = row;
        }
        
        return new Range(startRow, startColumn, endRow, session.getLine(endRow).length);
    };
    this.getCommentRegionBlock = function(session, line, row) {
        var startColumn = line.search(/\s*$/);
        var maxRow = session.getLength();
        var startRow = row;
        
        var re = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;
        var depth = 1;
        while (++row < maxRow) {
            line = session.getLine(row);
            var m = re.exec(line);
            if (!m) continue;
            if (m[1]) depth--;
            else depth++;

            if (!depth) break;
        }

        var endRow = row;
        if (endRow > startRow) {
            return new Range(startRow, startColumn, endRow, line.length);
        }
    };

}).call(FoldMode.prototype);

});

define("ace/mode/advanced",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/matching_brace_outdent","ace/mode/behaviour/cstyle","ace/mode/advanced_highlight_rules","ace/mode/folding/cstyle"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;
var CstyleBehaviour = require("./behaviour/cstyle").CstyleBehaviour;
var AdvancedHighlightRules = require("./advanced_highlight_rules").BuilderHighlightRules;
var CStyleFoldMode = require("./folding/cstyle").FoldMode;

var Mode = function() {
    this.HighlightRules = AdvancedHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = new CstyleBehaviour();
    this.foldingRules = new CStyleFoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
    this.$id = "ace/mode/advanced";

    this.blockComment = {start: "⌽comment(", end: ")"};

    this.getNextLineIndent = function(state, line, tab) {
        return this.$getIndent(line);
    };

}).call(Mode.prototype);

exports.Mode = Mode;
});                (function() {
                    window.require(["ace/mode/advanced"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            