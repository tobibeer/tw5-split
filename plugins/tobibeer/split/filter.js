/*\
title: $:/plugins/tobibeer/split/filter.js
type: application/javascript
module-type: filteroperator

Filter operator that splits each item at a specified separator.

@preserve
\*/
(function(){"use strict";exports.split=function(e,s){var i="",t,f,n,l,u,r="",c,a,h=s.operand,p=s.prefix==="!",o=s.suffix||"",$=[],b=[],g=[],x=[],k=[[/^\s/,function(){}],[/^\+(?:\s|$)/,function(){i=h}],[/^trim(?:\s|$)/i,function(){c=true}],[/^at(?:\s|$)/i,function(){t=parseInt(h);t=(isNaN(t)?0:t)-1}],[/^keep(?:\s|$)/i,function(){n=true}],[/^(\!)?(first|last|\$all|\$)(?:\s|$)/i,function(e){l=e[2];u=e[1]?true:false}],[/^(?:\+\(([^\)]*)\)|\(([^\)]*)\)\+)(?:\s|$)/,function(e){if(e[1]){i=e[1]}else{r=e[2]}}]];while(o){a=o;$tw.utils.each(k,function(e){var s=e[0].exec(o);if(s){e[1].call(this,s);o=o.substr(s[0].length);return false}});if(o===a){f=o.indexOf(" ");o=f<0?"":o.substr(f)}}e(function(e,s){var f,l;$.push(s);if(t){l=[s.substr(0,t)];f=s.substr(t);if(f){l.push(f)}}else{l=s.split(h)}if(l.length>1||n){b.push(s);$tw.utils.each(l,function(e){if(c){e=e.trim()}if(e){e=r+e+i;if(x.indexOf(e)<0){x.push(e)}}})}else{g.push(s)}});if(s.suffix){switch(l){case"$":x=b;break;case"$all":if(x.length){if(p){g=[]}else{x=$}}else if(p){g=$}break;case"first":if(u){x=x.length===1?[]:x.splice(1)}else{x.splice(1)}break;case"last":if(u){if(x.length>1){x.splice(x.length-1)}else{x=[]}}else{x=x.splice(x.length-1)}break}}return p?g:x}})();