/*\
title: test-tobibeer/split-filter.js
type: application/javascript
tags: [[$:/tags/test-spec]]

Tests the make filter.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

describe("test split filter", function() {

	// Create a wiki
	var wiki = new $tw.Wiki({});

	// Tests
	it("simple split", function() {
		expect(wiki.filterTiddlers(
			"[[1-2]split[-]]"
		).join(",")).toBe("1,2");
	});
	it("append split as suffix", function() {
		expect(wiki.filterTiddlers(
			"[[1-2]split:+[-]]"
		).join(",")).toBe("1-,2-");
	});
	it("prefix", function() {
		expect(wiki.filterTiddlers(
			"[[1-2]split:+(X)[-]]"
		).join(",")).toBe("X1,X2");
	});
	it("suffix", function() {
		expect(wiki.filterTiddlers(
			"[[1-2]split:(X)+[-]]"
		).join(",")).toBe("1X,2X");
	});
	it("prefix and suffix", function() {
		expect(wiki.filterTiddlers(
			"[[1-2]split:+(X)(Y)+[-]]"
		).join(",")).toBe("X1Y,X2Y");
	});
	it("first", function() {
		expect(wiki.filterTiddlers(
			"1-2 3-4 +[split:first[-]]"
		).join(",")).toBe("1,3");
	});
	it("last", function() {
		expect(wiki.filterTiddlers(
			"1-2 3-4 +[split:last[-]]"
		).join(",")).toBe("2,4");
	});
	it("pos=1", function() {
		expect(wiki.filterTiddlers(
			"1-2 3-4 +[split:pos=1[-]]"
		).join(",")).toBe("1,3");
	});
	it("pos=n", function() {
		expect(wiki.filterTiddlers(
			"1-2 3-4 +[split:pos=n[-]]"
		).join(",")).toBe("2,4");
	});
	it("pos=2", function() {
		expect(wiki.filterTiddlers(
			"1-2 3-4 +[split:pos=2[-]]"
		).join(",")).toBe("2,4");
	});
	it("pos=3 with only 2 each", function() {
		expect(wiki.filterTiddlers(
			"1-2 3-4 +[split:pos=3[-]]"
		).join(",")).toBe("");
	});
	it("pos=2 with 3 each", function() {
		expect(wiki.filterTiddlers(
			"1-2-3 4-5-6 +[split:pos=2[-]]"
		).join(",")).toBe("2,5");
	});
	it("pos=1, num=2, two each", function() {
		expect(wiki.filterTiddlers(
			"1-2 3-4 +[split:pos=1 num=2[-]]"
		).join(",")).toBe("1,2,3,4");
	});
	it("pos=1, num=3, only two each", function() {
		expect(wiki.filterTiddlers(
			"1-2 3-4 +[split:pos=1 num=3[-]]"
		).join(",")).toBe("1,2,3,4");
	});
	it("pos=1, num=3, only two each AND strict", function() {
		expect(wiki.filterTiddlers(
			"1-2 3-4 +[split:pos=1 num=3 strict[-]]"
		).join(",")).toBe("");
	});
	it("num=4, only three each AND strict", function() {
		expect(wiki.filterTiddlers(
			"a-b-c d-e-f +[split:num=4 strict[-]]"
		).join(",")).toBe("");
	});
	it("pos=1, num=2, three each", function() {
		expect(wiki.filterTiddlers(
			"1-2-3 4-5-6 +[split:pos=1 num=2[-]]"
		).join(",")).toBe("1,2,4,5");
	});
	it("pos=2, num=n, three each", function() {
		expect(wiki.filterTiddlers(
			"1-2-3 4-5-6 +[split:pos=2 num=n[-]]"
		).join(",")).toBe("2,3,5,6");
	});
	it("pos=-n, three each", function() {
		expect(wiki.filterTiddlers(
			"1-2-3 4-5-6 +[split:pos=-n[-]]"
		).join(",")).toBe("1,4");
	});
	it("pos=n, num=-2, three each", function() {
		expect(wiki.filterTiddlers(
			"1-2-3 4-5-6 +[split:pos=n num=-2[-]]"
		).join(",")).toBe("2,3,5,6");
	});
	it("$first", function() {
		expect(wiki.filterTiddlers(
			"1-2 3-4 +[split:$first[-]]"
		).join(",")).toBe("1");
	});
	it("$last", function() {
		expect(wiki.filterTiddlers(
			"1-2 3-4 +[split:$last[-]]"
		).join(",")).toBe("4");
	});
	it("$pos=1", function() {
		expect(wiki.filterTiddlers(
			"1-2 3-4 +[split:$pos=1[-]]"
		).join(",")).toBe("1");
	});
	it("$pos=n", function() {
		expect(wiki.filterTiddlers(
			"1-2 3-4 +[split:$pos=n[-]]"
		).join(",")).toBe("4");
	});
	it("$pos=2", function() {
		expect(wiki.filterTiddlers(
			"1-2 3-4 +[split:$pos=2[-]]"
		).join(",")).toBe("2");
	});
	it("$pos=3 with only 2 each", function() {
		expect(wiki.filterTiddlers(
			"1-2 3-4 +[split:$pos=3[-]]"
		).join(",")).toBe("3");
	});
	it("$pos=2 with 3 each", function() {
		expect(wiki.filterTiddlers(
			"1-2-3 4-5-6 +[split:$pos=2[-]]"
		).join(",")).toBe("2");
	});
	it("$pos=1, $num=2, two each", function() {
		expect(wiki.filterTiddlers(
			"1-2 3-4 +[split:$pos=1 $num=2[-]]"
		).join(",")).toBe("1,2");
	});
	it("$pos=1, $num=2, three each", function() {
		expect(wiki.filterTiddlers(
			"1-2-3 4-5-6 +[split:$pos=1 $num=2[-]]"
		).join(",")).toBe("1,2");
	});
	it("$pos=2, $num=n, three each", function() {
		expect(wiki.filterTiddlers(
			"1-2-3 4-5-6 +[split:$pos=2 $num=n[-]]"
		).join(",")).toBe("2,3,4,5,6");
	});
	it("$pos=-n, three each", function() {
		expect(wiki.filterTiddlers(
			"1-2-3 4-5-6 +[split:$pos=-n[-]]"
		).join(",")).toBe("1");
	});
	it("$pos=n, $num=-2, three each", function() {
		expect(wiki.filterTiddlers(
			"1-2-3 4-5-6 +[split:$pos=n $num=-2[-]]"
		).join(",")).toBe("5,6");
	});
	it("$pos=1, $num=3 but only two splits", function() {
		expect(wiki.filterTiddlers(
			"1-2 +[split:$pos=1 $num=3[-]]"
		).join(",")).toBe("1,2");
	});
	it("$pos=1, $num=3 but only two splits AND strict", function() {
		expect(wiki.filterTiddlers(
			"1-2 +[split:$pos=1 $num=3 strict[-]]"
		).join(",")).toBe("");
	});
	it("1-2 1-2 first => duplicates", function() {
		expect(wiki.filterTiddlers(
			"1-2 1-3 +[split:first[-]]"
		).join(",")).toBe("1,1");
	});
	it("1-2 1-2 first AND unique", function() {
		expect(wiki.filterTiddlers(
			"1-2 1-3 +[split:first unique[-]]"
		).join(",")).toBe("1");
	});
	it("at[2]", function() {
		expect(wiki.filterTiddlers(
			"1-2 3-4 +[split:at[2]]"
		).join(",")).toBe("1,-2,3,-4");
	});
	it("at[2] too short", function() {
		expect(wiki.filterTiddlers(
			"1-2 3 +[split:at[2]]"
		).join(",")).toBe("1,-2");
	});
	it("at[2] too short AND keep", function() {
		expect(wiki.filterTiddlers(
			"1-2 3 +[split:keep at[2]]"
		).join(",")).toBe("1,-2,3");
	});
	it("123456 at[4] first", function() {
		expect(wiki.filterTiddlers(
			"123456 +[split:first at[4]]"
		).join(",")).toBe("123");
	});
	it("blanks, NO trim", function() {
		expect(wiki.filterTiddlers(
			"[[ 1 - 2 ]] [[ 3 - 4 ]] +[split:[-]]"
		).join(",")).toBe(" 1 , 2 , 3 , 4 ");
	});
	it("blanks AND trim", function() {
		expect(wiki.filterTiddlers(
			"[[ 1 - 2 ]] [[ 3 - 4 ]] +[split:trim[-]]"
		).join(",")).toBe("1,2,3,4");
	});
	it("$", function() {
		expect(wiki.filterTiddlers(
			"1-2 3-4 5 6 +[split:$[-]]"
		).join(",")).toBe("1-2,3-4");
	});
	it("$ AND keep", function() {
		expect(wiki.filterTiddlers(
			"1-2 3-4 5 6 +[split:$ keep[-]]"
		).join(",")).toBe("1-2,3-4,5,6");
	});
	it("$all", function() {
		expect(wiki.filterTiddlers(
			"1-2 3 4 +[split:$all[-]]"
		).join(",")).toBe("1-2,3,4");
	});
	it("!first", function() {
		expect(wiki.filterTiddlers(
			"1-2-3 4-5-6 +[split:!first[-]]"
		).join(",")).toBe("2,3,5,6");
	});
	it("!last", function() {
		expect(wiki.filterTiddlers(
			"1-2-3 4-5-6 +[split:!last[-]]"
		).join(",")).toBe("1,2,4,5");
	});
	it("!$first", function() {
		expect(wiki.filterTiddlers(
			"1-2-3 4-5-6 +[split:!$first[-]]"
		).join(",")).toBe("2,3,4,5,6");
	});
	it("!$last", function() {
		expect(wiki.filterTiddlers(
			"1-2-3 4-5-6 +[split:!$last[-]]"
		).join(",")).toBe("1,2,3,4,5");
	});
});

})();