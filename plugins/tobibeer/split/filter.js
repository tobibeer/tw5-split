/*\
title: $:/plugins/tobibeer/split/filter.js
type: application/javascript
module-type: filteroperator

Filter operator that splits each item at a specified separator.

@preserve
\*/
(function(){"use strict";exports.split=function(i,s){var e="",t,f,n,l,u,c="",r,a,h,p=s.operand,o=s.prefix==="!",$=s.suffix||"",b=[],g=[],x=[],k=[],w=[[/^\s/,function(){}],[/^\+(?:\s|$)/,function(){e=p}],[/^trim(?:\s|$)/i,function(){r=1}],[/^unique(?:\s|$)/i,function(){a=1}],[/^at(?:\s|$)/i,function(){t=parseInt(p);t=(isNaN(t)?0:t)-1}],[/^keep(?:\s|$)/i,function(){n=1}],[/^(\!)?(first|last|\$all|\$)(?:\s|$)/i,function(i){l=i[2];u=i[1]?true:false}],[/^(?:\+\(([^\)]*)\)|\(([^\)]*)\)\+)(?:\s|$)/,function(i){if(i[1]){e=i[1]}else{c=i[2]}}]];while($){h=$;$tw.utils.each(w,function(i){var s=i[0].exec($);if(s){i[1].call(this,s);$=$.substr(s[0].length);return false}});if($===h){f=$.indexOf(" ");$=f<0?"":$.substr(f)}}i(function(i,s){var f,l;b.push(s);if(t){l=[s.substr(0,t)];f=s.substr(t);if(f){l.push(f)}}else{l=s.split(p)}if(l.length>1||n){g.push(s);$tw.utils.each(l,function(i){if(r){i=i.trim()}if(i){i=c+i+e;if(!a||a&&k.indexOf(i)<0){k.push(i)}}})}else{x.push(s)}});if(s.suffix){switch(l){case"$":k=g;break;case"$all":if(k.length){if(o){x=[]}else{k=b}}else if(o){x=b}break;case"first":if(u){k=k.length===1?[]:k.splice(1)}else{k.splice(1)}break;case"last":if(u){if(k.length>1){k.splice(k.length-1)}else{k=[]}}else{k=k.splice(k.length-1)}break}}return o?x:k}})();