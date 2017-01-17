/*\
title: $:/plugins/tobibeer/split/filter.js
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
exports.split = function(source,operator,options) {
	var at,was,
		wiki = options.wiki,
		// Shorthand for suffix
		s = operator.suffix || "",
		// Output arrays
		has=[],input=[],not=[],results=[],
		// Defaults for options object ...using one simplifies debugging a lot
		$ = {
			// Global negation
			negate: operator.prefix === "!",
			// Splitting by the operand
			split: operator.operand,
			// No prefix or suffix
			prefix: "",
			suffix: "",
			// Default both lengths to 1 if not specified
			num: 1,
			$num: 1
		},
		// Suffix regexp patterns
		suffixes = [
			// One or more White-spaces
			[/^\s+/, function() {
				// Just consume
			}],
			// Any of num:<num>, pos:<num>, $num:<num>, $pos:<num> ...ignore case
			[/^(num|pos|\$num|\$pos)=(n|-n|\d+|-\d+)(?:\s|$)/i, function(match) {
				// Remember how many for marker
				$[match[1]] = match[2];
				// Output mode?
				if(match[1].charAt(0) === "$") {
					// Set $pos as mode
					$.mode = "$pos";
				}
				// Only final number given but no final pos (yet)?
				if(match[1] === "$num" && !$.$pos) {
					// Set num to first
					$.$pos = 1;
				}
				// Only number given but no pos (yet)?
				if(match[1] === "num" && !$.pos) {
					// Set num to first
					$.pos = 1;
				}
			}],
			// Any of at, first, last, keep, strict or unique ...ignore case
			[/^(\+|at|first|!first|last|!last|list|keep|strict|\$strict|trim|unique)(?:\s|$)/i, function(match) {
				// The match
				var m = match[1];
				// By default set option to 1
				$[m] = 1;
				// Check variants
				switch(m) {
					// Operand as prefix
					case "+":
						$.suffix = $.split;
						break;
					// Split at character
					case "at":
						// Match range
						at = $.split.match(/(\d+),(\d+)/);
						// When range
						if(at){
							// Get from and to
							$.at = parseInt(at[1]);
							$.to = parseInt(at[2]);
						// Otherwise get position
						} else {
							// Parse as num
							$.at = parseInt($.split);
						}
						// Not a number?
						if(isNaN($.at)) {
							// Error
							throw "suffix 'at' must be numeric: " + $.at;
						// Got a number?
						} else {
							// Subtract one for string ops
							$.at = $.at-1;
						}
						break;
					case "list":
						$.list = "list";
						break;
					// First?
					case "first":
						// Set pos to first
						$.pos = 1;
						break;
					// All but first?
					case "!first":
						// Set pos to second
						$.pos = 2;
						// Set num to end
						$.num = "n";
						break;
					// Last?
					case "last":
						// Set pos to last
						$.pos = "n";
						break;
					// All but last?
					case "!last":
						// Set pos to second last
						$.pos = "-2";
						// Set num to "-n", i.e. first
						$.num = "-n";
						break;
				}
			}],
			// list=field
			[/^list\=\s*([^\s]+)(?:\s|$)/i, function(match) {
				// Save specified field
				$.list = match[1];
			}],
			// Any of $first, $last, $all or $ ...ignore case
			[/^(\!)?(\$|\$all|\$first|\$last)(?:\s|$)/i, function(match) {
				// The match
				var m = match[2];
				// Remember mode
				$.mode = m;
				// And negation
				$.neg = match[1] ? 1 : 0;
				// Want final first?
				if(m === "$first") {
					if($.neg) {
						// Set final pos to second
						$.$pos = 2;
						// Set final num to end
						$.$num = "n";
					} else {
						// Set final pos to first
						$.$pos = 1;
					}
				// Want final last?
				} else if(m === "$last"){
					if($.neg) {
						// Set final pos to second last
						$.$pos = "-2";
						// Set final num to "-n", i.e. first
						$.$num = "-n";
					} else {
						// Set final pos to last
						$.$pos = "n";
					}
				}
			}],
			// Any of +\any thing\ or \any thing\+
			[/^(?:\+\\([^\\]+)\\|\\([^\\]+)\\\+)/, function(match) {
				// Prefix match?
				if (match[1]) {
					// Set prefix
					$.prefix = match[1];
				// Suffix match?
				} else {
					// Set suffix
					$.suffix = match[2];
				}
			}]
		];
	// Catch errors
	try {
	// Still got some suffix left?
	while(s){
		// Remember suffix remainder we started out with
		was = s;
		// Loop suffix regex patterns
		$tw.utils.each(suffixes, function(m) {
			// Test pattern
			var match = m[0].exec(s);
			// Got a match?
			if(match) {
				// Call handler function
				m[1].call(this,match);
				// Consume
				s = s.substr(match[0].length);
				// Start over
				return false;
			}
		});
		// No match?
		if (s === was) {
			throw "invalid suffix(es) '" + s + "'";
		}
	}
	// Split operand as list?
	if($.list && $.split) {
		// Parse operand as list
	 	results = $tw.utils.parseStringArray($.split);
	// Otherwise
	} else {
		// Loop input titles
		source(function(tiddler,title) {
			var wasSplit,s2,splits;
			// Remember input title
			input.push(title);
			// Split at character?
			if($.at) {
				if($.to) {
					splits = [title.substr($.at,$.to)];
					if($.keep || title.length > $.at + $.to){
						s2 = title.substr(0,$.at) + title.substr($.at+$.to);
						// Got some?
						if(s2) {
							// Add to splits
							splits.push(s2);
						}
					}
				} else {
					// Add left part to splits
					splits = [title.substr(0,$.at)];
					// Take right part
					s2 = title.substr($.at);
					// Got some?
					if(s2) {
						// Add to splits
						splits.push(s2);
					}
				}
			// Parse list-field?
			} else if($.list) {
				// Get titles from list field
				splits = wiki.getTiddlerList(title,$.list);
			// Otherwise simply...
			} else {
				// Split at split character(s)
				splits = title.split($.split);
			}
			// Remember if we did split anything
			wasSplit = splits.length > 1 || $.list;
			// Retrieve only certain items?
			if($.pos) {
				// Retrieve items
				splits = $tw.utils.getArrayItems(splits,$.pos,$.num,$.strict);
			}
			// If we...
			if(
				// Have anything left
				splits.length && (
					// Did split OR keep non-splits
					wasSplit || $.keep
				)
			) {
				// Add to results
				has.push(title);
				// Loop split items
				$tw.utils.each(
					splits,
					function(item) {
						// Do we want to trim it?
						if($.trim) {
							// Trim then
							item = item.trim();
						}
						// Got an item?
						if(item) {
							// Only add once when unique, otherwise always add
							if(!$.unique || $.unique  && results.indexOf(item) < 0) {
								// Add suffix, prefix and push into output
								results.push($.prefix + item + $.suffix);
							}
						}
						//else {what to do with empty strings?}
					}
				);
			// No considerable results
			} else {
				// Remember this title as having no matches
				not.push(title);
			}
		});
	}
	// Got any suffix?
	if(operator.suffix) {
		// Check mode
		switch($.mode) {
			// Pass titles with splits?
			case "$":
				// Ok, let's take them then
				results = has;
				break;
			// Pass all titles if any had splits?
			case "$all":
				// Got any splits at all?
				if(results.length) {
					// Negating?
					if($.negate) {
						// Ok, we'll take none
						not = [];
					// Not negating?
					} else {
						// Return all input titles
						results = input;
					}
				// Got no splits and we're negating?
				} else if($.negate) {
					// Ok then return all, since none had splits
					not = input;
				}
				break;
			// Output a given (number of) item(s)
			case "$first":
			case "$last":
			case "$pos":
				// Retrieve results
				results = $tw.utils.getArrayItems(results,$.$pos,$.$num,$.$strict);
				break;
		}
	}
	// Catch errors
	} catch (e) {
		return ["split syntax error:" + e];
	}
	// Return results according to negation
	return $.negate ? not : results;
};

})();
