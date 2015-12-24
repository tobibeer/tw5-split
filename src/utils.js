/*\
title: $:/plugins/tobibeer/split/utils.js
type: application/javascript
module-type: utils

@preserve
\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
Utility function to retrieve items from an *arr*ay:
	> starting at a given *pos*ition
	> a given *num*ber of elements
	> strict, if we definitely require the *num*ber of elements asked for
*/
exports.getArrayItems = function(arr,pos,num,strict) {
	var results,
		// Parse num and pos as int
		n=parseInt(num),
		p=parseInt(pos),
		// How many results do we have?
		len = arr.length;
	// If we want to start at the end
	if(pos === "n") {
		// Initialize pos as last
		p = len;
	// If we want to start at the negative end, being the first
	} else if(pos === "-n") {
		// Set pos to first
		p = 1;
	// If there is no pos defined
	} else if(!pos) {
		// Start with first
		p = 1;
	}
	// All to the last?
	if(num === "n") {
		// Take that
		n = len;
	// All to the first?
	} else if(num === "-n") {
		// Length is is the opposite of
		n = -(
			// Negative pos?
			p < 0 ?
			// Subtract from total length and add 1
			len + p + 1 :
			// From wherever pos is
			p
		 );
	// Don't have a number?
	} else if(!num) {
		// So we just want one item
		n = 1;
	}
	// Compute pos as max of:
	p = Math.max(
		// Either 1 OR...
		1,
		// If we start from behind:
		p < 0 ?
		// Subtract pos from length and...
			// for negative num: subtract num, then add 2
			// for positiive num: add 1
		(len + p + (n < 0 ? n + 2 : 1)) :
		// If we start from the beginning:
			// for negative num: add start and length and 1
			// for positive num: take given pos, after all
		(n < 0 ? p + n + 1 : p)
	);
	// Calculate length as max of 1 or the absolute value of num
	n = Math.max(1,Math.abs(n));
	// Splice results according to calculated pos and num
	results = arr.splice(p-1,n);
	// If not of size asked for and we're strict about it
	if(results.length < n && strict) {
		// Discard all
		results = [];
	}
	// Return what we got
	return results;
};

})();