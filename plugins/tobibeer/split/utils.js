/*\
title: $:/plugins/tobibeer/split/utils.js
type: application/javascript
module-type: utils

@preserve
\*/
(function(){"use strict";exports.getArrayItems=function(e,t,n,s){var i,a=parseInt(n),f=parseInt(t),r=e.length;if(t==="n"){f=r}else if(t==="-n"){f=1}else if(!t){f=1}if(n==="n"){a=r}else if(n==="-n"){a=-(f<0?r+f+1:f)}else if(!n){a=1}f=Math.max(1,f<0?r+f+(a<0?a+2:1):a<0?f+a+1:f);a=Math.max(1,Math.abs(a));i=e.splice(f-1,a);if(i.length<a&&s){i=[]}return i}})();