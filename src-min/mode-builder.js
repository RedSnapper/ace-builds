define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t,n){"use strict";var r=e("../range").Range,i=function(){};(function(){this.checkOutdent=function(e,t){return/^\s+$/.test(e)?/^\s*\}/.test(t):!1},this.autoOutdent=function(e,t){var n=e.getLine(t),i=n.match(/^(\s*\})/);if(!i)return 0;var s=i[1].length,o=e.findMatchingBracket({row:t,column:s});if(!o||o.row==t)return 0;var u=this.$getIndent(e.getLine(o.row));e.replace(new r(t,0,t,s-1),u)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(i.prototype),t.MatchingBraceOutdent=i}),define("ace/mode/builder_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";var r=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules,s=function(){var e=["iAppend","iBase64","iBirth","iBuildMeta","iConsole","iContent","iDate","iDeath","iDecode","iDigest","iEmbed","iEncode","iEq","iEqFamily","iEqNode","iEqSibs","iEval","iExistContent","iExistMedia","iExistNode","iExists","iExistSimilar","iExpr","iField","iFile","iForAncestry","iForIndex","iForNodes","iForPeers","iForQuery","iForSibs","iForSimilar","iForSubs","iForTax","iForTaxNodes","iFullBuild","iGet","iHex","iID","iIndex","iKV","iLang","iLangID","iLayout","iLayoutName","iLeft","iLength","iLink","iLinkRef","iList","iLower","iMath","iMedia","iMid","Internal","iNull","iNumChildren","iNumGen","iNumGens","iNumPage","iNumPages","iNumSib","iPosition","iPreview","iRegex","iRembr","iRembrp","iReplace","iReset","iRight","iSegmentName","iSet","iSetCache","iShortTitle","iSig","iSize","iSuffix","iTax","iTeam","iTech","iTiming","iTitle","iTrim","iTW","iUnHex","iUpper","iUrlEncode","iUrl","iUse"];const t=/\{(?!\|)/,n=/\}/,r=/\{\|(?!\})/,i=/\|\}/,s=/[^\|@]|(\|[^}])+|@(?!comment\()?/m,o=/[^()]+/m,u=/\(/,a=/\)/,f=/^w[A-Z0-9]/,l=/^w[a-z0-9]/,c=/%\^*([0-9]+|\([0-9]+\+?\)|[ijknK]([./+-][0-9]+)?|\([ijknK]([./+-][0-9]+)?\)|\(p([s]|[0-9]+)?\))/,h=/@(\w+)\(/,p=/@comment\(/,d=/,/;var v=0,m=0,g={regex:h,push:"macro",token:function(t){if(t=="comment"){this.push="comment",this.nextState="comment",v++;var n="comment.documentation";return v==1&&(n="storage"),n}this.nextState="macro";var r=f;if(r.test(t))return this.nextState="tag","meta.tag";var i=l;return i.test(t)?(this.nextState="xml","meta.selector"):e.indexOf(t)!=-1?(this.nextState="internal","function.buildin"):"function"}},y={regex:t,token:"variable.parameter",push:"mbrace"},b={regex:d,onMatch:function(e,t,n){var r;switch(t){case"internal":r="function.buildin";break;case"tag":r="meta.tag";break;default:r="function"}return r},merge:!1},w={regex:u,push:"bracket",token:"variable"},E={regex:c,token:"constant"},S={regex:p,token:function(e){var t="comment.documentation";return v==0&&(t="storage"),v++,t},push:"comment"},x={regex:r,push:"literal",token:function(e){var t="support.function";return m==0&&(t="support.class"),m++,t}},T=[g,x,E,S],N=[T,y,w],C=[N,b];this.$rules={start:[T],macro:[C,{token:"function",regex:a,merge:!1,next:"pop"},{defaultToken:"variable"}],internal:[C,{token:"function.buildin",regex:a,merge:!1,next:"pop"},{defaultToken:"variable"}],tag:[C,{token:"meta.tag",regex:a,merge:!0,next:"pop"},{defaultToken:"variable"}],xml:[C,{token:"meta.selector",regex:a,merge:!0,next:"pop"},{defaultToken:"variable"}],bracket:[T,w,{regex:a,token:"variable",next:"pop"},{defaultToken:"variable"}],mbrace:[N,{regex:n,token:"variable.parameter",next:"pop"},{defaultToken:"variable.parameter"}],comment:[S,{regex:u,token:function(e){var t="comment.documentation";return v==0&&(t="storage"),v++,t},push:"comment"},{regex:a,next:"pop",token:function(e){v>0&&v--;var t="comment.documentation";return v==0&&(t="storage"),t}},{regex:o,token:"comment.documentation"},{defaultToken:"comment.documentation"}],literal:[S,x,{regex:i,token:function(e){m>0&&m--;var t="support.function";return m==0&&(t="support.class"),t},next:"pop"},{regex:s,token:"support.function"},{defaultToken:"support.function"}]},this.normalizeRules()};r.inherits(s,i),t.BuilderHighlightRules=s}),define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,n){"use strict";var r=e("../../lib/oop"),i=e("../../range").Range,s=e("./fold_mode").FoldMode,o=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};r.inherits(o,s),function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,n){var r=e.getLine(n);if(this.singleLineBlockCommentRe.test(r)&&!this.startRegionRe.test(r)&&!this.tripleStarBlockCommentRe.test(r))return"";var i=this._getFoldWidgetBase(e,t,n);return!i&&this.startRegionRe.test(r)?"start":i},this.getFoldWidgetRange=function(e,t,n,r){var i=e.getLine(n);if(this.startRegionRe.test(i))return this.getCommentRegionBlock(e,i,n);var s=i.match(this.foldingStartMarker);if(s){var o=s.index;if(s[1])return this.openingBracketBlock(e,s[1],n,o);var u=e.getCommentFoldRange(n,o+s[0].length,1);return u&&!u.isMultiLine()&&(r?u=this.getSectionRange(e,n):t!="all"&&(u=null)),u}if(t==="markbegin")return;var s=i.match(this.foldingStopMarker);if(s){var o=s.index+s[0].length;return s[1]?this.closingBracketBlock(e,s[1],n,o):e.getCommentFoldRange(n,o,-1)}},this.getSectionRange=function(e,t){var n=e.getLine(t),r=n.search(/\S/),s=t,o=n.length;t+=1;var u=t,a=e.getLength();while(++t<a){n=e.getLine(t);var f=n.search(/\S/);if(f===-1)continue;if(r>f)break;var l=this.getFoldWidgetRange(e,"all",t);if(l){if(l.start.row<=s)break;if(l.isMultiLine())t=l.end.row;else if(r==f)break}u=t}return new i(s,o,u,e.getLine(u).length)},this.getCommentRegionBlock=function(e,t,n){var r=t.search(/\s*$/),s=e.getLength(),o=n,u=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,a=1;while(++n<s){t=e.getLine(n);var f=u.exec(t);if(!f)continue;f[1]?a--:a++;if(!a)break}var l=n;if(l>o)return new i(o,r,l,t.length)}}.call(o.prototype)}),define("ace/mode/builder",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/matching_brace_outdent","ace/mode/behaviour/cstyle","ace/mode/builder_highlight_rules","ace/mode/folding/cstyle"],function(e,t,n){"use strict";var r=e("../lib/oop"),i=e("./text").Mode,s=e("./matching_brace_outdent").MatchingBraceOutdent,o=e("./behaviour/cstyle").CstyleBehaviour,u=e("./builder_highlight_rules").BuilderHighlightRules,a=e("./folding/cstyle").FoldMode,f=function(){this.HighlightRules=u,this.$outdent=new s,this.$behaviour=new o,this.foldingRules=new a};r.inherits(f,i),function(){this.$id="ace/mode/builder",this.blockComment={start:"@comment({|",end:"|})"},this.getNextLineIndent=function(e,t,n){return this.$getIndent(t)}}.call(f.prototype),t.Mode=f});                (function() {
                    window.require(["ace/mode/builder"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            