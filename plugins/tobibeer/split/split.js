/*\
title: $:/plugins/tobibeer/split/split.js
type: application/javascript
module-type: filteroperator

Filter operator that splits each item at a specified separator.

@preserve
\*/
(function(){"use strict";exports.split=function(s,e){var i="",t,f,n,l,u,r="",c,a,p=e.operand,h=e.prefix==="!",o=e.suffix||"",$=[],b=[],x=[],g=[],k=[[/^\s/,function(){}],[/^\+(?:\s|$)/,function(){i=p}],[/^trim(?:\s|$)/i,function(){c=true}],[/^at(?:\s|$)/i,function(){t=parseInt(p);t=(isNaN(t)?0:t)-1}],[/^keep(?:\s|$)/i,function(){n=true}],[/^(\!)?(first|last|\$all|\$)(?:\s|$)/i,function(s){l=s[2];u=s[1]?true:false}],[/^(?:\+\(([^\)]*)\)|\(([^\)]*)\)\+)(?:\s|$)/,function(s){if(s[1]){i=s[1]}else{r=s[2]}}]];while(o){a=o;$tw.utils.each(k,function(s){var e=s[0].exec(o);if(e){s[1].call(this,e);o=o.substr(e[0].length);return false}});if(o===a){f=o.indexOf(" ");o=f<0?"":o.substr(f)}}s(function(s,e){var f,l;$.push(e);if(t){l=[e.substr(0,t)];f=e.substr(t);if(f){l.push(f)}}else{l=e.split(p)}if(l.length>1||n){b.push(e);$tw.utils.each(l,function(s){if(c){s=s.trim()}s=r+s+i;if(g.indexOf(s)<0){g.push(s)}})}else{x.push(e)}});if(e.suffix){switch(l){case"$":g=b;break;case"$all":if(g.length){if(h){x=[]}else{g=$}}else if(h){x=$}break;case"first":if(u){g=g.splice(1)}else{g.splice(1)}break;case"last":if(u){g.splice(g.length-1)}else{g=g.splice(g.length-1)}break}}return h?x:g}})();