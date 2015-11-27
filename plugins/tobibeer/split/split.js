/*\
title: $:/plugins/tobibeer/split/split.js
type: application/javascript
module-type: filteroperator

Filter operator that splits each item at a specified separator.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
Export filter function
*/
exports.split = function(source,operator) {
	var append = "", mode, neg, prepend = "", split, trim,
		at = operator.operand,
		negate = operator.prefix === "!",
		suffix = operator.suffix || "",
		input = [], has = [], not = [], results = [];

	$tw.utils.each(
		(operator.suffix || "").split(" "),
		function(s) {
			s = s.trim().toLowerCase();
			if(s) {
				switch (s) {
					case "+":
						append = at;
						break;
					case "trim":
						trim = true;
						break;
					default:
						if(s.substr(0,1) === "!") {
							neg = true;
							s = s.substr(1);
						}
						if(s.substr(0,2) === "+(" && s.substr(s.length-1) == ")") {
							append = s.substr(2,s.length-3);
						}
						if(s.substr(0,1) === "(" && s.substr(s.length-2) === ")+") {
							prepend = s.substr(1,s.length-3);
						}
						mode = s ? s : "";
						break;
				}
			}
		}
	);
	source(function(tiddler,title) {
		input.push(title);
		split = title.split(at);
		if(split.length > 1) {
			has.push(title);
			$tw.utils.each(
				split,
				function(item) {
					if(trim) {
						item = item.trim();
					}
					item = prepend + item + append;
					if(results.indexOf(item) < 0) {
						results.push(item);
					}
				}
			);
		} else {
			not.push(title);
		}
	});
	if(suffix) {
		switch(mode) {
			case "$":
				results = has;
				break;
			case "$all":
				if(results.length) {
					if(negate) {
						not = [];
					} else {
						results = input;
					}
				} else if(negate) {
					not = input;
				}
				break;
			case "first":
				if(neg) {
					results = results.splice(1);
				} else {
					results.splice(1);
				}
				break;
			case "last":
				if(neg) {
					results.splice(results.length-1);
				} else {
					results = results.splice(results.length-1);
				}
				break;
		}
	}
	return negate ? not : results;
};

})();
