web-component-polyomino
=======================

A web component for creating, editing, or displaying polyominos (i.e. generalizations of tetris pieces). 
Useful for games, applications, or solvers that require the user to specify certain polyominos.
See examples of usage [here](https://cemulate.github.io/polyomino-solver).

## Usage

The library provides:

* `Polyomino`: A class representing a polyomino, can be created from integer coordinates and manipulated via transformations
* `PolyominoControl`: The actual web component for displaying and editing `Polyomino` instances.
* `tetrominos`: An object containing the standard tetrominos from Tetris, keyed by their standard one-letter designation (I, O, T, J, L, S, Z).

First, register the web component in your main entry point:

```
import { PolyominoControl } from 'web-component-polyomino';
window.customElements.define('polyomino-control', PolyominoControl);
```

It can now be used in HTML directly as with:
```
<polyomino-control id="editor" size=10 mode="create-region"></polyomino-control>
```

Or from code as with:
```
let el = document.createElement('polyomino-control');
el.style.cssText = 'width: 50px; height: 50px; display: inline-block';
el.mode = 'display';
document.getElementById('poly-container').appendChild(el);
```


`PolyominoControl` elements expose two custom attributes:

* `size`: The size of the (square) editing or display grid
* `mode`: One of three string values:
    - `create-poly`:
    The standard mode.
    Background grid cells are white, and filled-in cells representing the object polyomino are light blue.
    - `create-region`:
    A slightly altered mode much like the above but with tweaked visuals: background cells are subdued gray while filled-in cells are white.
    Intended primarily for editing a grid region that polyominos might fit in to.
    - `display`:
    Editing is disabled, and background/blank grid cells are not displayed.

And have the following public interface:

* `getPolyomino(p)`: Get the `Polyomino` currently displayed / represented by the element.
* `setPolyomino(poly=null, fit=false)`: Set the polyomino.
If `fit` is true, alter the size of the grid to best accomodate the polyomino.
* `redraw()`: Re-render the current polyomino (after changing `size`, for example)
* `setMultiplePolyominosWithBackground(polys, background)`: 
A special method that only works in `display` mode.
Displays a list of `Polyomino`s each with different colors against a background region again represented by a `Polyomino`

A `Polyomino` is essentially represented by a collection of integer coordinates.
They provide the following public interface:
* `constructor(coords)`: Create a polyomino from a list of coordinates of the form `[[x1, y1], [x2, y2], ...]`
* `clone()`: Retrieve a new polyomino with the same coordinates
* `rotate(n)`: Retrieve a new polyomino obtained by rotating this one counterclockwise by `n * 90` degrees
* `reflect()`: Retrieve a new polyomino obtained by reflecting across the y-axis
* `translate(dx, dy)`: Retrieve a new polyomino obtained by translating this one.
* `isDisjointFrom(other)`: Determines if two polyominos are disjoint
* `getMinimalNonNegative()`: Retrieve a new polyomino that is identical to this one, but translated appropriately so that all the coordinates are the smallest possible non-negative integers.
* `getWidth()` / `getHeight()`: Get the horizontal (resp. vertical) span of the polyomino
* `containsCoordinate(c)`: Determines if the polyomino contains a coordinate.

## Examples

This was created / extracted from my other project [polyomino-solver](https://github.com/cemulate/polyomino-solver) (use it [here](https://cemulate.github.io/polyomino-solver)), which can provide examples of its usage.