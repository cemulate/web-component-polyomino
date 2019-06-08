web-component-polyomino
=======================

A web component for creating, editing, or displaying polyominos (i.e. generalizations of tetris pieces). 
Useful for games, applications, or solvers that require the user to specify certain polyominos.

[Install from npm](https://www.npmjs.com/package/web-component-polyomino).

See [an example codepen demo](https://codepen.io/cemulate/pen/dExpJw) or a [project using this component](https://cemulate.github.io/polyomino-solver/).

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
<polyomino-control size=10 mode="create" value="[[0,0],[0,1],[1,0],[1,1]]"></polyomino-control>
```

Attributes on `polyomino-control` elements are as follows:

* `size`: The size of the (square) editing or display grid.
Has nothing to do with the style/CSS dimensions of the element, but only the logical polyomino grid.
* `value`: The polyomino (or, in `display-multiple` mode only, a list of polyominos) to display, represented as a list of coordinates `[[x1, y1], [x2, y2], ...]`
* `mode`: One of three string values:
    - `create`:
    The standard mode.
    Background grid cells are white, and filled-in cells representing the object polyomino are a chosen active color (`--create-color`)
    - `create-region`:
    Functionally equivalent to `create`, but with an inverse UI:
    The background is a blank canvas while only the filled in cells are visible and white.
    Intended for creating the destination areas in polyomino fitting problems, for example.
    - `display`:
    Editing is disabled, and background/blank grid cells are not displayed.
    Intended for displaying static polyominos.
    - `display-multiple`:
    In this mode, `value` takes a *list* of polyominos, all of which will be displayed.
    The first of the list is treated as a "backdrop" and will be displayed in white, while the rest will be displayed in differing colors on top.

The component respects the following CSS variables, which can be used to style it:

* `--cell-color`: The color of filled in cells during `create` and `display` mode.
Default `cyan`.
