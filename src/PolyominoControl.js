import { LitElement, html, css } from 'lit';
import { computeColoring } from './coloring';

function* coords(size) {
    for (let i = 0; i < size; i ++) {
        for (let j = 0; j < size; j ++) {
            yield [ i, j ];
        }
    }
}

function preventDefault(handler) {
    return e => {
        e.preventDefault();
        handler(e);
    }
}

// const defaulSixColoring = [ 'red', 'green', 'blue', 'cyan', 'magenta', 'yellow' ];
// const defaulSixColoring = [ 'cyan', 'green', 'red', 'yellow', 'purple', 'orange' ];
const defaultSixColoring = [ 'bisque', 'cyan', 'royalblue', 'indianred', 'limegreen', 'darkviolet' ];

function compareCoords(a, b) {
    return a[0] == b[0] && a[1] == b[1];
}

export default class PolyominoControl extends LitElement {
    static get properties() {
        return {
            // One of: 'create', 'create-region', 'display', or 'display-multiple'
            mode: { type: String },
            // The (square) integer size of the grid
            size: { type: Number },
            // The polyomino to display, as a list of integer coordinates [ [ x1, y1 ], [ x2, y2 ], ... ]
            // OR, in 'display-multiple' mode, a list of such polyominos
            value: { type: Array },
        };
    }
    static get styles() {
        return css`
            :host {
                display: block;
                touch-action: none;
                user-select: none;
            }
            .grid-container {
                display: grid;
                width: 100%;
                height: 100%;
                outline: 2px solid black;
                grid-template: repeat($rows, 1fr) / repeat($columns, 1fr);
                grid-gap: 2px;
            }
            .grid-container.display, .grid-container.display-multiple {
                outline: none;
            }
            
            .cell {
                outline: 2px solid black;
            }

            .cell.active {
                background-color: var(--cell-color);
            }

            .grid-container.display .cell {
                outline: none;
            }

            .grid-container.display .cell.active, .grid-container.display-multiple .cell.active {
                outline: 2px solid black;
            }

            .grid-container.create-region .cell, .grid-container.display-multiple .cell {
                outline: none;
            }

            .grid-container.create-region .cell.active {
                outline: 2px solid black;
            }
        `;
    }
    constructor() {
        super();
        this.mode = 'create';
        this.size = 4;
        this.value = [];

        this.pointerDown = false;
        this.cachedColorMap = null;
    }
    updated(changedProps) {
        if (changedProps.has('value') && this.mode == 'display-multiple') this.computeColoring();
    }
    computeColoring() {
        const coloring = computeColoring(this.value.slice(1));
        const colors = Array.from({ length: this.value.length - 1 }, (x, i) => defaultSixColoring[coloring.get(i)]);
        this.cachedColorMap = [ 'white', ...colors ];
    }
    render() {
        const polys = this.mode == 'display-multiple' ? this.value : [ [], this.value ];

        let colorMap = null;
        if (this.mode == 'display-multiple') {
            if (this.cachedColorMap == null) this.computeColoring();
            colorMap = this.cachedColorMap;
        } else if (this.mode == 'create-region') {
            colorMap = [ 'white', 'white' ];
        } else {
            colorMap = [ 'white', null ];
        }

        return html`
            <div class="grid-container ${ this.mode }">
                ${ Array.from(coords(this.size)).map(([ x, y ]) => {
                    const col = x + 1;
                    const row = this.size - y;

                    let classes = [ 'cell' ];
                    let overrideColor = null;
                    for (let [ index, p ] of polys.entries()) {
                        if (p.some(c => compareCoords(c, [ x, y ]))) {
                            classes.push('active');
                            overrideColor = colorMap[index];
                        }
                    }

                    const onTouch = preventDefault(e => {
                        this.pointerDown = true;
                        this.toggle(x, y);
                        e.target.releasePointerCapture(e.pointerId);
                    });
                    const onMove = preventDefault(e => this.pointerDown ? this.toggle(x, y) : null);
                    const onRelease = preventDefault(e => { this.pointerDown = false; });

                    const hasEvents = this.mode.startsWith('create');
                    const optionalColorStyle = overrideColor != null ? `background-color: ${ overrideColor }` : '';
                    return html`
                        <div 
                            class="${ classes.join(' ') }"
                            style="grid-column: ${ col }; grid-row: ${ row }; ${ optionalColorStyle }"
                            @pointerdown=${ hasEvents ? onTouch : null }
                            @pointerenter=${ hasEvents ? onMove : null }
                            @pointerup=${ hasEvents ? onRelease : null }
                            @pointercancel=${ hasEvents ? onRelease : null }
                        >
                        </div>
                    `;
                }) }
            </div>
        `;
    }
    toggle(tx, ty) {
        const t = [ tx, ty ];
        let loc = this.value.findIndex(x => compareCoords(x, t));
        if (loc >= 0) {
            this.value = this.value.filter((v, i) => i != loc);
        } else {
            this.value = [ ...this.value, t ];
        }
        this.dispatchEvent(new Event('change'));
    }
}
  
  