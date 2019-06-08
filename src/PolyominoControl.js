import { LitElement, html, css } from 'lit-element';
import Please from 'pleasejs';

function* coords(size) {
    for (let i = 0; i < size; i ++) {
        for (let j = 0; j < size; j ++) {
            yield [ i, j ];
        }
    }
}

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
    }
    render() {
        const polys = this.mode == 'display-multiple' ? this.value : [ [], this.value ];

        let colorMap = null;
        if (this.mode == 'display-multiple') {
            // Generate different colors at each index
            // Since the first in the list 
            const dHue = Math.round(360 / (this.value.length - 1));
            const start = Math.floor(Math.random() * 360);
            colorMap = [ 'white', ...polys.slice(1).map((p, i) => {
                const h = (start + dHue * i) % 360;
                return Please.make_color({ golden: false, hue: h, saturation: 0.8 })[0];
            }) ];
        } else if (this.mode == 'create-region') {
            colorMap = [ 'white', 'white' ];
        } else {
            const cellColor = window.getComputedStyle(this).getPropertyValue('--cell-color');
            colorMap = [ 'white', cellColor || 'cyan' ];
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
                    const mousedown = e => this.toggle(x, y);
                    const mouseenter = e => {
                        if (e.buttons == 1) this.toggle(x, y);
                    };
                    const hasEvents = this.mode.startsWith('create');
                    const optionalColorStyle = overrideColor != null ? `background-color: ${ overrideColor }` : '';
                    return html`
                        <div 
                            class="${ classes.join(' ') }"
                            style="grid-column: ${ col }; grid-row: ${ row }; ${ optionalColorStyle }"
                            @mousedown=${ hasEvents ? mousedown : null }
                            @mouseenter=${ hasEvents ? mouseenter : null }
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
    }
}
  
  