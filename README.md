web-component-polyomino
=======================

A web component for creating, editing, or displaying polyominos (i.e. generalizations of tetris pieces). 
Useful for games, applications, or solvers that require the user to specify certain polyominos.
See examples of usage [here](https://cemulate.github.io/polyomino-solver).

[Install from npm](https://www.npmjs.com/package/web-component-polyomino)

## Usage

Import the library in your main entrypoint:

```
import 'web-component-polyomino';
```

Or with a script tag (using unpkg), as:
```
<script src="https://unpkg.com/web-component-polyomino@1/dist/web-component-polyomino.js"/>
```

The custom element is now available and may be used in HTML directly as with:
```
<polyomino-control id="editor" size=10 mode="create"></polyomino-control>
```

Or from code as with:
```
let el = document.createElement('polyomino-control');
el.style.cssText = 'width: 50px; height: 50px; display: inline-block';
el.mode = 'display';
document.getElementById('poly-container').appendChild(el);
```

`PolyominoControl` elements expose the following attributes:

* `size`: The size of the (square) editing or display grid
* `value`: The polyomino (or, in `display-multiple` mode only, a list of polyominos) to display, represented as a list of coordinates `[[x1, y1], [x2, y2], ...]`
* `mode`: One of three string values:
    - `create`:
    The standard mode.
    Background grid cells are white, and filled-in cells representing the object polyomino are light blue.
    - `create-region`:
    A slightly altered mode much like the above but with tweaked visuals: background cells are subdued gray while filled-in cells are white.
    Intended primarily for editing a grid region that polyominos might fit in to.
    - `display`:
    Editing is disabled, and background/blank grid cells are not displayed.
    - `display-multiple`:
    Given a list of polyominos (in `value`), the first will be treated as a background region, and the rest will be displayed in differing colors on top of the background region.

## Examples

This was created / extracted from my other project [polyomino-solver](https://github.com/cemulate/polyomino-solver) (use it [here](https://cemulate.github.io/polyomino-solver)), which can provide examples of its usage.