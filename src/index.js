import { Polyomino, tetrominos } from './Polyomino';
import PolyominoControl from './PolyominoControl';

if ('customElements' in window) {
    window.customElements.define('polyomino-control', PolyominoControl);
}

export {
    Polyomino,
    tetrominos,
    PolyominoControl,
};