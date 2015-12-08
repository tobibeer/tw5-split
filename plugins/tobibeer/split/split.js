/*\
title: $:/plugins/tobibeer/split/split.js
type: application/javascript
module-type: filteroperator

Filter operator that splits each item at a specified separator.

@preserve
\*/
(function(){"use strict";exports.split=function(e,s){console.log("SUFFFFFFFIX",s.suffix);var i="",t,f,n,l,u,c="",r,a,h=s.operand,o=s.prefix==="!",p=s.suffix||"",$=[],b=[],g=[],x=[],F=[[/^\s/,function(){}],[/^\+(?:\s|$)/,function(){i=h}],[/^trim(?:\s|$)/i,function(){r=true}],[/^at(?:\s|$)/i,function(){t=parseInt(h);t=(isNaN(t)?0:t)-1}],[/^keep(?:\s|$)/i,function(){n=true}],[/^(\!)?(first|last|\$all|\$)(?:\s|$)/i,function(e){l=e[2];u=e[1]?true:false}],[/^(?:\+\(([^\)]*)\)|\(([^\)]*)\)\+)(?:\s|$)/,function(e){if(e[1]){i=e[1]}else{c=e[2]}}]];while(p){a=p;$tw.utils.each(F,function(e){var s=e[0].exec(p);if(s){e[1].call(this,s);p=p.substr(s[0].length);return false}});if(p===a){f=p.indexOf(" ");p=f<0?"":p.substr(f)}}e(function(e,s){var f,l;$.push(s);if(t){l=[s.substr(0,t)];f=s.substr(t);if(f){l.push(f)}}else{l=s.split(h)}if(l.length>1||n){b.push(s);$tw.utils.each(l,function(e){if(r){e=e.trim()}if(e){e=c+e+i;if(x.indexOf(e)<0){x.push(e)}}})}else{g.push(s)}});if(s.suffix){switch(l){case"$":x=b;break;case"$all":if(x.length){if(o){g=[]}else{x=$}}else if(o){g=$}break;case"first":if(u){x=x.length===1?[]:x.splice(1)}else{x.splice(1)}break;case"last":if(u){if(x.length>1){x.splice(x.length-1)}else{x=[]}}else{x=x.splice(x.length-1)}break}}return o?g:x}})();