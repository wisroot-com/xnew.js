import { xnew } from '../core/xnew';

export function DragEvent(xnode) {
    const base = xnew();

    base.on('pointerdown', (event) => {
        const id = event.pointerId;
        const rect = xnode.element.getBoundingClientRect();
        const position = getPosition(event, rect);
       
        xnode.emit('down', event, { type: 'down', position });
        let previous = position;

        const xwin = xnew(window);

        xwin.on('pointermove', (event) => {
            if (event.pointerId === id) {
                const position = getPosition(event, rect);
                const delta = { x: position.x - previous.x, y: position.y - previous.y };
                
                xnode.emit('move', event, { type: 'move', position, delta });
                previous = position;
            }
        });

        xwin.on('pointerup', (event) => {
            if (event.pointerId === id) {
                const position = getPosition(event, rect);
                xnode.emit('up', event, { type: 'up', position, });
                xwin.finalize();
            }
        });

        xwin.on('pointercancel', (event) => {
            if (event.pointerId === id) {
                const position = getPosition(event, rect);
                xnode.emit('cancel', event, { type: 'cancel', position, });
                xwin.finalize();
            }
        });
    });

    function getPosition(event, rect) {
        return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    }
}