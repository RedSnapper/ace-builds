define("ace/snippets/builder",["require","exports","module"],function(e,t,n){"use strict";t.snippetText="# Internal macros\nsnippet append \n	@iAppend(${1:~var},${0})\nsnippet ap\n	@iAppend(${1:~var},${0})\nsnippet birth\n	@iBirth(${1:NODEREF},${2:COMPARISON},${3:TRUE},${4:FALSE})\nsnippet console\n	@iConsole(${1:e|i|t|n|w},${2:MESSAGE})${0}\nsnippet co\n	@iConsole(${1:e|i|t|n|w},${2:MESSAGE})${0}\nsnippet content\n	@iContent(${1:NODEREF},${2:SEGNAME},${3:[METADATA]})${0}\nsnippet date\n	@iDate(${1:DATE},${2:FORMAT},${3:COMPARATOR},${4:[TRUE]},${5:[FALSE]})${0}\nsnippet death\n	@iDeath(${1:NODEREF},${2:COMPARISON},${3:TRUE},${4:FALSE})${0}\nsnippet decode\n	@iDecode(${0:CONTENT})\nsnippet digest\n	@iDigest(${1:CONTENT},${2:md4|md5|mdc3|sha1|sha256|sha384|sha512|dss1|ripemd160})${0}\nsnippet embed\n	@iEmbed(${1:REF},${2:[META]})${0}\nsnippet eq\n	@iEq(${1:A},${2:B},${3:TRUE},${4:FALSE})\nsnippet eqfamily\n	@iEqFamily(${1:TEST-NODE},${2:FAMILY-NODE},${3:TRUE},${4:FALSE})\nsnippet eqf\n	@iEqFamily(${1:TEST-NODE},${2:FAMILY-NODE},${3:TRUE},${4:FALSE})\nsnippet eqnode\n	@iEqNode(${1:NODE-A},${2:NODE-B},${3:TRUE},${4:FALSE})\nsnippet eqn\n	@iEqNode(${1:NODE-A},${2:NODE-B},${3:TRUE},${4:FALSE})\nsnippet eqsibs\n	@iEqSibs(${1:NODE-A},${2:NODE-B},${3:TRUE},${4:FALSE})\nsnippet eval\n	@iEval(${1:CONTENT},${2:CONTENT})${0}\nsnippet existcontent\n	@iExistContent(${1:NODE},${2:SEGMENT},${3:TRUE},${4:FALSE})\nsnippet exc\n	@iExistContent(${1:NODE},${2:SEGMENT},${3:TRUE},${4:FALSE})\nsnippet existmedia\n	@iExistMedia(${1:REF},${2:TRUE},${3:FALSE})\nsnippet exm\n	@iExistMedia(${1:REF},${2:TRUE},${3:FALSE})\nsnippet exnode\n	@iExistNode(${1:REF},${2:TRUE},${3:FALSE})\nsnippet exn\n	@iExistNode(${1:REF},${2:TRUE},${3:FALSE})\nsnippet existsimilar\n	@iExistSimilar(${1:REF},${2:TRUE},${3:FALSE})\nsnippet exists\n	@iExists(${1:VAR},${2:TRUE},${3:FALSE})\nsnippet ex\n	@iExists(${1:VAR},${2:TRUE},${3:FALSE})\nsnippet forancestry\n	@iForAncestry(${1:STARTNODE},${2:DIRECTION(F|R)},${3:TERMINATION-POINT},${4:PATTERN},\n		${0}\n	)\nsnippet fora\n	@iForAncestry(${1:STARTNODE},${2:DIRECTION(F|R)},${3:TERMINATION-POINT},${4:PATTERN},\n		${0}\n	)\nsnippet fornodes\n	@iForNodes(${1:LIST},${2:\\$NODE\\$},${3:\\$NODE\\$},${4:SORT},\n		${0}\n	)\nsnippet forn\n	@iForNodes(${1:LIST},${2:\\$NODE\\$},${3:\\$NUM\\$},${4:SORT},\n		${0}\n	)\nsnippet forpeers\n	@iForPeers(${1:NODE},${2:TERMINATION-POINT},${3:\\$NODE\\$},${4:\\$NUM\\$},${5:SORT},\n		${0}\n	)\nsnippet forp\n	@iForPeers(${1:NODE},${2:TERMINATION-POINT},${3:\\$NODE\\$},${4:\\$NUM\\$},${5:SORT},\n		${0}\n	)\nsnippet forsibs\n	@iForSibs(${1:NODE},${2:\\$NODE\\$},${3:\\$NUM\\$},\n		${0}\n	)\nsnippet fors\n	@iForSibs(${1:NODE},${2:\\$NODE\\$},${3:\\$NUM\\$},\n		${0}\n	)\nsnippet forsimilar\n	@iForSimilar(${1:NODE},${2:\\$NODE\\$},${3:SCORE-PATTERN},${4:TAX-ROOT},${5:DIRECTION},\n		${0}\n	)\nsnippet fortax\n	@iForTax(${1:NODE},${2:TAX-ROOT},${3:\\$NODE\\$},\n		${0}	\n	)\nsnippet fortaxnodes\n	@iForTaxNodes(${1:TAX-NODE},${2:\\$NODE\\$},${3:\\$NUM\\$},${4:SORT},\n		${0}\n	)\nsnippet get\n	@iGet(~${1:VAR})\nsnippet hex\n	@iHex(${1:CONTENT},${2:${2:[COMPARATOR,TRUE,FALSE]}})${0}\nsnippet id\n	@iID(${1:NODE})${0}\nsnippet lang\n	@iLang(${1:${2:[COMPARATOR,TRUE,FALSE]}})${0}\nsnippet langid\n	@iLangID(${1:${2:[COMPARATOR,TRUE,FALSE]}})${0}\nsnippet layout\n	@iLayout(${1:NODE},${2:COMPARATOR},${3:TRUE},${4:FALSE})\nsnippet la\n	@iLayout(${1:NODE},${2:COMPARATOR},${3:TRUE},${4:FALSE})\nsnippet layoutname\n	@iLayoutName(${1:NODE},${2:[COMP,TRUE,FALSE]})${0}\nsnippet left\n	@iLeft(${1:INPUT},${2:OFFSET},${3:${2:[COMPARATOR,TRUE,FALSE]}})\nsnippet length\n	@iLength(${1:INPUT},${2:${2:[COMPARATOR,TRUE,FALSE]}})\nsnippet link\n	@iLink(${1:NODE[:OFFSET]})${0}\nsnippet linkref\n	@iLinkRef(${1:NODE},${2:${2:[COMPARATOR,TRUE,FALSE]}})${0}\nsnippet lower\n	@iLower(${1:STRING},${2:[COMPARATOR,TURE,FALSE]})${0}\nsnippet math\n	@iMath(${1:-|*|x|m|L|G|=|f|c|Rf|R|Rx},${2:INPUT1},${3:INPUT2},${4:COMP},${5:TRUE},${6:FALSE})${0}\nsnippet media\n	@iMedia(${1:MEDIAREF},${2:[META]})${0}\nsnippet mid\n	@iMid(${1:STRING},${2:OFFSET},${3:SIZE},${4:[COMP,T,F]})\nsnippet index\n	@iIndex(${1:DELIMITER},${2:LIST},${3:normalise|size|find|resize|get|set|ifempty|erase|push|append|pop|drop|reverse},${4:[PARM1,PARM2]})\nsnippet null\n	@iNull(${1:CONTENT})${0}\nsnippet numchildren\n	@iNumChildren(${1:NODE},${2:${2:[COMPARATOR,TRUE,FALSE]}})\nsnippet numc\n	@iNumChildren(${1:NODE},${2:${2:[COMPARATOR,TRUE,FALSE]}})\nsnippet numgen\n	@iNumGen(${1:NODE},${2:${2:[COMPARATOR,TRUE,FALSE]}})\nsnippet numg\n	@iNumGen(${1:NODE},${2:${2:[COMPARATOR,TRUE,FALSE]}})\nsnippet numgens\n	@iNumGens(${1:[COMPARATOR,TRUE,FALSE]})\nsnippet numpage\n	@iNumPage(${1:[COMPARATOR,TRUE,FALSE]})\nsnippet nump\n	@iNumPage(${1:[COMPARATOR,TRUE,FALSE]})\nsnippet numpages\n	@iNumPages(${1:NODE},${2:[COMPARATOR,TRUE,FALSE]})\nsnippet numsib\n	@iNumSib(${1:NODE},${2:[COMPARATOR,TRUE,FALSE]})\nsnippet nums\n	@iNumSib(${1:NODE},${2:[COMPARATOR,TRUE,FALSE]})\nsnippet position\n	@iPosition(${1:HAYSTACK},${2:NEEDLE},${3:[COMPARATOR,TRUE,FALSE]})\nsnippet pos\n	@iPosition(${1:HAYSTACK},${2:NEEDLE},${3:[COMPARATOR,TRUE,FALSE]})\nsnippet preview\n	@iPreview(${1:PREVIEW},${2:LIVE})\nsnippet pr\n	@iPreview(${1:PREVIEW},${2:LIVE})\nsnippet regex\n	@iRegex(${1:NEEDLE},${2:REPLACE},${3:HAYSTACK})${0}\nsnippet reg\n	@iRegex(${1:NEEDLE},${2:REPLACE},${3:HAYSTACK})${0}\nsnippet rembr\n	@iRembr(${1:CONTENT})${0}\nsnippet rembrp\n	@iRembrp(${1:CONTENT})${0}\nsnippet replace\n	@iReplace(${1:NEEDLE},${2:REPLACE},${3:HAYSTACK})${0}\nsnippet rep\n	@iReplace(${1:NEEDLE},${2:REPLACE},${3:HAYSTACK})${0}\nsnippet reset\n	@iReset(${1:VARIABLE})${0}\nsnippet res\n	@iReset(${1:VARIABLE})${0}\nsnippet right\n	@iRight(${1:INPUT},${2:OFFSET},${3:[COMPARATOR,TRUE,FALSE]})\nsnippet segmentname\n	@iSegmentName(${1:[COMPARATOR,TRUE,FALSE]})${0}\nsnippet set\n	@iSet(~${1:VAR},${0:VALUE})\nsnippet setcache\n	@iSetCache(${1:VARIABLE},${0:VALUE})\nsnippet sig\n	@iSig(${1:VARIABLE},${2:TRUE},${3:FALSE})\nsnippet shorttitle\n	@iShortTitle(${1:NODE},${2:[COMPARATOR,TRUE,FALSE]})${0}\nsnippet stitle\n	@iShortTitle(${1:NODE},${2:[COMPARATOR,TRUE,FALSE]})${0}\nsnippet suffix\n	@iSuffix(${1:NODE:OFFSET},${2:[COMPARATOR,TRUE,FALSE]})${0}\nsnippet tax\n	@iTax(${1:NODE},${2:META},${3:[COMPARATOR,TRUE,FALSE]})\nsnippet team\n	@iTeam(${2:NODE},${2:[COMPARATOR,TRUE,FALSE]})\nsnippet tech\n	@iTech(${1:[COMPARATOR,TRUE,FALSE]})\nsnippet timing\n	@iTiming(${1:MODE})\nsnippet title\n	@iTitle(${1:NODE},${2:[COMPARATOR,TRUE,FALSE]})${0}\nsnippet urlencode\n	@iUrlEncode(${1:CONTENT})${0}\nsnippet unhex\n	@iUnHex(${1:CONTENT},${2:[COMPARATOR,TRUE,FALSE]})${0}\nsnippet upper\n	@iUpper(${1:CONTENT},${2:[COMPARATOR,TRUE,FALSE]})\nsnippet use\n	@iUse(${1:VARIABLE})${0}\n\n#HTML\nsnippet wa\n	@wa(${1},${0})\nsnippet wa+\n	@wa(${1},${2}) wa+${0}\nsnippet data\n	@wa(data-${1},${0})	\nsnippet href\n	@wa(href,${0})\nsnippet src\n	@wa(src,${0})\n# Elements\nsnippet .\n	@wDiv(@wa(class,${1}),\n		${0}\n	)\nsnippet a\n	@wA(@wa(href,${1}),${0})\nsnippet a.\n	@wA(@wa(class,${1})@wa(href,${2}),${0})\nsnippet article\n	@wArticle(${1},\n		${0}\n	)\nsnippet article.\n	@wArticle(@wa(class,${1}),\n		${0}\n	)\nsnippet aside\n	@wAside(${1},\n		${0}\n	)\nsnippet aside.\n	@wAside(@wa(class,${1}),\n		${0}\n	)\nsnippet blockquote\n	@wBlockquote(${1},\n		${0}\n	)\nsnippet blockquote.\n	@wBlockquote(@wa(class,${1}),\n		${0}\n	)\nsnippet button\n	@wButton(${1},${0})\nsnippet button.\n	@wButton(@wa(class,${1}),${0})\nsnippet dd\n	@wDd(${1},${0})\nsnippet dd.\n	@wDd(@wa(class,${1}),${0})\nsnippet div\n	@wDiv(${1},\n		${0}\n	)\nsnippet div.\n	@wDiv(@wa(class,${1}),\n		${0}\n	)\nsnippet dl\n	@wDl(${1},\n		${0}\n	)\nsnippet dl.\n	@wDl(@wa(class,${1}),\n		${0}\n	)\nsnippet dl+\n	@wDl(,\n		@wDt(,${1})\n		@wDd(,${2})\n		dt+${0}\n	)	\nsnippet dt\n	@wDt(${1},${0})\nsnippet dt.\n	@wDt(@wa(class,${1}),${0})	\nsnippet dt+\n	@wDt(,${1})\n	@wDd(,${2})\n	dt+${0}\nsnippet em\n	@wEm(${1},${0})\nsnippet em.\n	@wEm(@wa(class,${1}),${0})		\nsnippet fieldset\n	@wFieldset(${1},\n		${0}\n	)\nsnippet fieldset.\n	@wFieldset(@wa(class,${1}),\n		${0}\n	)		\nsnippet footer\n	@wFooter(${1},\n		${0}\n	)\nsnippet footer.\n	@wFooter(@wa(class,${1}),\n		${0}\n	)		\nsnippet form\n	@wForm(@wa(action,${1})@wa(method,${2}),\n		${0}\n	)\nsnippet form.\n	@wForm(@wa(class,${1})@wa(action,${2})@wa(method,${3}),\n		${0}\n	)		\nsnippet h1\n	@wH1(${1},${0})\nsnippet h1.\n	@wH1(@wa(class,${1}),${0})\nsnippet h2\n	@wH2(${1},${0})\nsnippet h2.\n	@wH2(@wa(class,${1}),${0})\nsnippet h3\n	@wH3(${1},${0})\nsnippet h3.\n	@wH3(@wa(class,${1}),${0})\nsnippet h4\n	@wH4(${1},${0})\nsnippet h4.\n	@wH4(@wa(class,${1}),${0})\nsnippet h5\n	@wH5(${1},${0})\nsnippet h5.\n	@wH5(@wa(class,${1}),${0})\nsnippet header\n	@wHeader(${1},\n		${0}\n	)\nsnippet header.\n	@wHeader(@wa(class,${1}),\n		${0}\n	)\nsnippet hgroup\n	@wHgroup(${1},\n		${0}\n	)\nsnippet hgroup.\n	@wHgroup(@wa(class,${1}),\n		${0}\n	)\nsnippet hr\n	@wHr(${1},\n		${0}\n	)\nsnippet hr.\n	@wHr(@wa(class,${1}),\n		${0}\n	)\nsnippet i\n	@wI(${1},\n		${0}\n	)\nsnippet i.\n	@wI(@wa(class,${1}),\n		${0}\n	)\nsnippet iframe\n	@wIframe(${1},\n		${0}\n	)\nsnippet iframe.\n	@wIframe(@wa(class,${1}),\n		${0}\n	)\nsnippet img\n	@wImg(@wa(src,${1})@wa(alt,${0}))\nsnippet img.\n	@wImg(@wa(src,${1})@wa(alt,${2})@wa(class,${0}))\nsnippet input\n	@wInput(@wa(type,${1})@wa(value,${0}))\nsnippet input.\n	@wInput(@wa(type,${1})@wa(value,${2})@wa(class,${0}))\nsnippet label\n	@wLabel(${1},${0})\nsnippet label.\n	@wLabel(@wa(class,${1}),${0})\nsnippet legend\n	@wLegend(${1},${0})\nsnippet legend.\n	@wLegend(@wa(class,${1}),${0})\nsnippet li\n	@wLi(${1},\n		${0}\n	)\nsnippet li.\n	@wLi(@wa(class,${1}),\n		${0}\n	)\nsnippet li+\n	@wLi(,${1})\n	li+${0}\nsnippet label\n	@wLabel(${1},\n		${0}\n	)\nsnippet label.\n	@wLabel(@wa(class,${1}),\n		${0}\n	)\nsnippet nav\n	@wNav(${1},\n		${0}\n	)\nsnippet nav.\n	@wNav(@wa(class,${1}),\n		${0}\n	)\nsnippet ol\n	@wOl(${1},\n		${0}\n	)\nsnippet ol.\n	@wOl(@wa(class,${1}),\n		${0}\n	)\nsnippet p\n	@wP(${1},\n		${0}\n	)\nsnippet p.\n	@wP(@wa(class,${1}),\n		${0}\n	)\nsnippet opt\n	@wOption(${1},${0})\nsnippet section\n	@wSection(${1},\n		${0}\n	)\nsnippet section.\n	@wSection(@wa(class,${1}),\n		${0}\n	)\nsnippet select\n	@wSelect(${1},\n		${0}\n	)\nsnippet select.\n	@wSelect(@wa(class,${1}),\n		${0}\n	)\nsnippet small\n	@wSmall(${1},${0})\nsnippet small.\n	@wSmall(@wa(class,${1}),${0})\nsnippet source\n	@wSource(@wa(src,${1})@wa(type,${2})@wa(media,${0}))\nsnippet span\n	@wSpan(${1},${0})\nsnippet span.\n	@wSpan(@wa(class,${1}),${0})\nsnippet strong\n	@wStrong(${1},${0})\nsnippet strong.\n	@wStrong(@wa(class,${1}),${0})\nsnippet table\n	@wTable(${1},\n		${0}\n	)\nsnippet table.\n	@wTable(@wa(class,${1}),\n		${0}\n	)\nsnippet tbody\n	@wtTbody(${1},\n		${0}\n	)\nsnippet tbody.\n	@wTbody(@wa(class,${1}),\n		${0}\n	)\nsnippet td\n	@wTd(${1},\n		${0}\n	)\nsnippet td.\n	@wTd(@wa(class,${1}),\n		${0}\n	)\nsnippet td+\n	@wTd(,${1})\n	td+${0}	\nsnippet textarea\n	@wTextarea(${1},\n		${0}\n	)\nsnippet textarea.\n	@wTextarea(@wa(class,${1}),\n		${0}\n	)\nsnippet tfoot\n	@wTfoot(${1},\n		${0}\n	)\nsnippet tfoot.\n	@wTfoot(@wa(class,${1}),\n		${0}\n	)\nsnippet th\n	@wTh(${1},${0})\nsnippet th.\n	@wTh(@wa(class,${1}),${0})\nsnippet th+\n	@wTh(,${1})\n	th+${0}\nsnippet thead\n	@wThead(${1},\n		${0}\n	)\nsnippet thead.\n	@wThead(@wa(class,${1}),\n		${0}\n	)\nsnippet time\n	@wTime(${1},${0})\nsnippet time.\n	@wTime(@wa(class,${1}),${0})\nsnippet ul\n	@wUl(${1},${0})\nsnippet ul.\n	@wUl(@wa(class,${1}),${0})\nsnippet video\n	@wVideo(@wa(src,${1})@wa(height,${2})@wa(width,${3})@wa(preload,${4})@wa(autoplay,${5:autoplay}),${0})\nsnippet video.\n	@wVideo(@wa(src,${1})@wa(height,${2})@wa(width,${3})@wa(preload,${4})@wa(autoplay,${5:autoplay})@wa(class,${0}),${7})\n\n\n\n\n\n\n\n\n\n",t.scope="builder"});                (function() {
                    window.require(["ace/snippets/builder"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            