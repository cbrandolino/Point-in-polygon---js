A javascript library for the point-in-polygon problem.
=============

How does it work?
----------

We'll call our point *a*.

We used the ray casting method (a segment *a->y* is traced from point *a* to a point *y* that's surely outside the polygon; we count the number of intersections between *a->y* and the polygon's sides).

To check for intersections, we used [the algorithm described here](http://compgeom.cs.uiuc.edu/~jeffe/teaching/373/notes/x06-sweepline.pdf).

Yea rite - I meant: How do I use it?
----------

You create a Polygon by either an array of Points:

    var triangle = new Polygon ([
        new Point(1,2),
        new Point(3,3),
        new Point(2,1)
    ]);

or an array of tuple-ish arrays:

   var triangle = new Polygon ([[1,2],[3,3],[2,1]]);

Then you create a Point:

   var maybeImIn = new Point(1,5);

... and finally:

   triangle.contains(maybeImIn); // returns Bool

Is it reliable?
----------

Apparently it works; I wouldn't plan any rocket launch with it though.

The code/tests ratio is ridiculous.
----------

Yep; I need to improve on the performance a lot and I'd like to be sure that any way I could break the code in the process is covered.

Is it fast?
----------

Nope. I originally wanted to make it purely functional (for the lulz).

Then, thinking it might have been actually useful and it was horribly slow, I refactored just as much as I needed to let it run decently.

License?
----------

MIT.
