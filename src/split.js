/*\
title: $:/plugins/tobibeer/split/split.js
type: application/javascript
module-type: filteroperator

Filter operator that splits each item at a specified separator.

@preserve
\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
Export filter function
*/
exports.split = function(source,operator) {
	var append = "", at, i, keep, mode, neg, prepend = "", trim, was,
		split = operator.operand,
		negate = operator.prefix === "!",
		s = operator.suffix || "",
		input = [], has = [], not = [], results = [],
		suffixes = [
			[/^\s/, function() {
				//just consume
			}],
			[/^\+(?:\s|$)/, function() {
				append = split;
			}],
			[/^trim(?:\s|$)/i, function() {
				trim = true;
			}],
			[/^at(?:\s|$)/i, function() {
				at = parseInt(split);
				at = (isNaN(at) ? 0 : at) -1;
			}],
			[/^keep(?:\s|$)/i, function() {
				keep = true;
			}],
			[/^(\!)?(first|last|\$all|\$)(?:\s|$)/i, function(match) {
				mode = match[2];
				neg = match[1] ? true : false;
			}],
			[/^(?:\+\(([^\)]*)\)|\(([^\)]*)\)\+)(?:\s|$)/, function(match) {
				if (match[1]) {
					prepend = match[1];
				} else {
					append = match[2];
				}
			}]
		];
	while(s){
		was = s;
		$tw.utils.each(suffixes, function(m) {
			var match = m[0].exec(s);
			if(match) {
				m[1].call(this,match);
				s = s.substr(match[0].length);
				return false;
			}
		});
		// no match?
		if (s === was) {
			i = s.indexOf(" ");
			s = i < 0 ? "" : s.substr(i);
		}
	}

	source(function(tiddler,title) {
		var s2,splits;
		input.push(title);
		if(at) {
			splits = [title.substr(0,at)];
			s2 = title.substr(at);
		  	if(s2) {
				splits.push(s2);
			}
		} else {
			splits = title.split(split);
		}
		if(splits.length > 1 || keep) {
			has.push(title);
			$tw.utils.each(
				splits,
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
	if(operator.suffix) {
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
