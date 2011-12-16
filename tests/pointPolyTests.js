/***************
 * Test values *
 ***************/

// Two polygons, generated from arrays of 'tuples'
// and Point objects respectively. 
var polyArray = new Polygon([[1,2],[3,4],[1,4]]);
var polyPoints = new Polygon([[1,2],[3,4],[1,4]].map(function(a){
	return new Point(a[0],a[1]);}));

// Segment 1 and 2 do not cross.
// Segment 3 intersects segment 2 and touches (interects for what is relevant to us) segment 3.
var segment1 = new Segment(new Point(1,1), new Point(5,1));
var segment2 = new Segment(new Point(1,2), new Point(1,5));
var segment3 = new Segment(new Point(4,1), new Point(0,5));

var pointInside = new Point(2, 3.5);
var pointOutsideTwoCrossings = new Point(2,5);
var pointOutsideNoCrossing = new Point(1,1);

/**************
 * Test start *
 **************/

module("Polygon generation");

test("Returns Polygon object from both array of tuples and array of points", function() {

	ok((getProtoName(polyArray) === "Polygon"),
		"Returns Polygon object from array of 'tuples'");	
	ok((getProtoName(polyPoints) === "Polygon"),
		"Returns Polygon object from array of Point objects");

});

test("Polygon generation has same number of vertices and sides", function(){
	ok((rightNumber(polyPoints) == rightNumber(polyArray) == true), 
		"Polygons have equal number of vertices and sides");
});

test("Polygon's vertices have no undefined x or y values", function() {
	ok((allDefined(polyPoints) == allDefined(polyArray) == true),
		"All vertices points are fine");
});

module("Intersection detector");

test("Intersections", function() {
	ok((!checkIntersection(segment1, segment2)),
		"The segments ((1,1), (5,1)) and ((1,2), (1,5)) don't intersect.");	
	ok((checkIntersection(segment1, segment3)),
		"The segments ((1,2), (1,5)) and ((4,1), (0,5)) intersect.");
	ok((checkIntersection(segment1, segment3)),
		"The segments ((1,1), (5,1)) and ((4,1), (0,5)) intersect. Edge case! Yea!");
});

module("Point in polygon");

test("Inside", function() {
	ok((polyArray.contains(pointInside)),
		"The point with one crossing is inside");
});
test("Outside", function() {
	ok((!polyArray.contains(pointOutsideNoCrossing)),
		"The point with no crossing is outside");
	ok((!polyArray.contains(pointOutsideTwoCrossings)),
		"The point with two crossing is outside");
});

/*********************
 * Utility functions *
 *********************/

function rightNumber(poly)
{
	return poly.vertices.length == poly.sides.length;
}

function allDefined(poly)
{
	var defined = true;
	for(i = 0; i < poly.vertices.length; i++)
		if ((poly.vertices.x === undefined) || (poly.vertices.y === undefined))
			defined = false;
	return defined;
}

function getProtoName(obj) {
    if (obj && obj.constructor && obj.constructor.toString) {
        var arr = obj.constructor.toString().match(
            /function\s*(\w+)/);

        if (arr && arr.length == 2) {
            return arr[1];
        }
    }

    return undefined;
}

