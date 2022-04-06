define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t,n){"use strict";var r=e("../range").Range,i=function(){};(function(){this.checkOutdent=function(e,t){return/^\s+$/.test(e)?/^\s*\}/.test(t):!1},this.autoOutdent=function(e,t){var n=e.getLine(t),i=n.match(/^(\s*\})/);if(!i)return 0;var s=i[1].length,o=e.findMatchingBracket({row:t,column:s});if(!o||o.row==t)return 0;var u=this.$getIndent(e.getLine(o.row));e.replace(new r(t,0,t,s-1),u)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(i.prototype),t.MatchingBraceOutdent=i}),define("ace/mode/behaviour/css",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/mode/behaviour/cstyle","ace/token_iterator"],function(e,t,n){"use strict";var r=e("../../lib/oop"),i=e("../behaviour").Behaviour,s=e("./cstyle").CstyleBehaviour,o=e("../../token_iterator").TokenIterator,u=function(){this.inherit(s),this.add("colon","insertion",function(e,t,n,r,i){if(i===":"&&n.selection.isEmpty()){var s=n.getCursorPosition(),u=new o(r,s.row,s.column),a=u.getCurrentToken();a&&a.value.match(/\s+/)&&(a=u.stepBackward());if(a&&a.type==="support.type"){var f=r.doc.getLine(s.row),l=f.substring(s.column,s.column+1);if(l===":")return{text:"",selection:[1,1]};if(/^(\s+[^;]|\s*$)/.test(f.substring(s.column)))return{text:":;",selection:[1,1]}}}}),this.add("colon","deletion",function(e,t,n,r,i){var s=r.doc.getTextRange(i);if(!i.isMultiLine()&&s===":"){var u=n.getCursorPosition(),a=new o(r,u.row,u.column),f=a.getCurrentToken();f&&f.value.match(/\s+/)&&(f=a.stepBackward());if(f&&f.type==="support.type"){var l=r.doc.getLine(i.start.row),c=l.substring(i.end.column,i.end.column+1);if(c===";")return i.end.column++,i}}}),this.add("semicolon","insertion",function(e,t,n,r,i){if(i===";"&&n.selection.isEmpty()){var s=n.getCursorPosition(),o=r.doc.getLine(s.row),u=o.substring(s.column,s.column+1);if(u===";")return{text:"",selection:[1,1]}}}),this.add("!important","insertion",function(e,t,n,r,i){if(i==="!"&&n.selection.isEmpty()){var s=n.getCursorPosition(),o=r.doc.getLine(s.row);if(/^\s*(;|}|$)/.test(o.substring(s.column)))return{text:"!important",selection:[10,10]}}})};r.inherits(u,s),t.CssBehaviour=u}),define("ace/mode/builder_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";var r=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules,s=function(){var e=["iAppend","iBase64","iBirth","iBuildMeta","iConsole","iContent","iDate","iDeath","iDecode","iDigest","iEmbed","iEncode","iEq","iEqFamily","iEqNode","iEqSibs","iEval","iExistContent","iExistMedia","iExistNode","iExists","iExistSimilar","iExpr","iField","iFile","iForAncestry","iForIndex","iForNodes","iForPeers","iForQuery","iForSibs","iForSimilar","iForSubs","iForTax","iForTaxNodes","iFullBuild","iGet","iHex","iID","iIndex","iKV","iLang","iLangID","iLayout","iLayoutName","iLeft","iLength","iLink","iLinkRef","iList","iLower","iMath","iMedia","iMid","Internal","iNull","iNumChildren","iNumGen","iNumGens","iNumPage","iNumPages","iNumSib","iPosition","iPreview","iRegex","iRembr","iRembrp","iReplace","iReset","iRight","iSegmentName","iSet","iSetCache","iShortTitle","iSig","iSize","iSuffix","iTax","iTeam","iTech","iTiming","iTitle","iTrim","iTW","iUnHex","iUpper","iUrlEncode","iUse"];const t=/\{(?!\|)/,n=/(?:(?!\|\})[^\0])\}/,r=/\{\|/,i=/\|\}/,s=/[^|]|\|[^}]+/m,o=/[^()]+/m,u=/\(/,a=/\)/,f=/^w[A-Z0-9]/,l=/^w[a-z0-9]/,c=/%\^*([0-9]+|\([0-9]+\+?\)|[ijknK]([./+-][0-9]+)?|\([ijknK]([./+-][0-9]+)?\)|\(p([s]|[0-9]+)?\))/;var h=0,p=0,d={regex:/@(\w+)\(/,push:"macro",token:function(t){if(t=="comment")return this.push="comment",this.nextState="comment",h=0,"storage";this.nextState="macro";var n=f;if(n.test(t))return this.nextState="tag","meta.tag";var r=l;return r.test(t)?(this.nextState="xml","meta.selector"):e.indexOf(t)!=-1?(this.nextState="internal","function.buildin"):"function"}},v={regex:t,token:"support.type",push:"brace"},m={regex:t,token:"variable.parameter",push:"mbrace"},g={regex:/,/,onMatch:function(e,t,n){var r;switch(t){case"internal":r="function.buildin";break;case"tag":r="meta.tag";break;default:r="function"}return r},merge:!1},y={regex:u,push:"bracket",token:"variable"},b={regex:c,token:"constant"},w={regex:r,token:function(e){var t="support.constant";return p==0&&(t="support.class"),p++,t},push:"literal",next:"literal"},E=[d,w,v,b],S=[E,g,m,y];this.$rules={start:[E],macro:[S,{token:"function",regex:a,merge:!1,next:"pop"},{defaultToken:"variable"}],internal:[S,{token:"function.buildin",regex:a,merge:!1,next:"pop"},{defaultToken:"variable"}],tag:[S,{token:"meta.tag",regex:a,merge:!0,next:"pop"},{defaultToken:"variable"}],xml:[S,{token:"meta.selector",regex:a,merge:!0,next:"pop"},{defaultToken:"variable"}],bracket:[E,y,v,{regex:a,token:"variable",next:"pop"},{defaultToken:"variable"}],brace:[E,v,{regex:n,token:"support.type",next:"pop"},{defaultToken:"support.type"}],comment:[{regex:u,token:function(e){return h++,"comment.documentation"},push:"comment"},{regex:a,token:function(e){var t="comment.documentation";return h==0&&(t="storage"),h--,t},next:"pop"},{regex:o,token:"comment.documentation"},{defaultToken:"comment.documentation"}],literal:[{regex:i,token:function(e){var t="support.constant";return p==1&&(t="support.class"),p--,t},next:"pop"},{regex:/@comment\(/,token:function(e){return h=0,"storage"},push:"comment",nextState:"comment"},{regex:s,token:"support.function",next:"literal"},{defaultToken:"support.constant"}]},this.normalizeRules()};r.inherits(s,i),t.BuilderHighlightRules=s}),define("ace/mode/builder",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/matching_brace_outdent","ace/mode/behaviour/css","ace/mode/builder_highlight_rules","ace/range"],function(e,t,n){"use strict";var r=e("../lib/oop"),i=e("./text").Mode,s=e("../tokenizer").Tokenizer,o=e("./matching_brace_outdent").MatchingBraceOutdent,u=e("./behaviour/css").CssBehaviour,a=e("./builder_highlight_rules").BuilderHighlightRules,f=e("../range").Range,l=function(){this.HighlightRules=a,this.$outdent=new o,this.$behaviour=new u};r.inherits(l,i),function(){this.$id="ace/mode/builder",this.getNextLineIndent=function(e,t,n){return this.$getIndent(t)}}.call(l.prototype),t.Mode=l});                (function() {
                    window.require(["ace/mode/builder"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            