export { xnew, xnest, xfind, xextend, xcontext } from './src/core/xnew';

import { AnalogStick } from './src/components/AnalogStick';
import { CircleButton } from './src/components/CircleButton';
import { DPad } from './src/components/DPad';
import { DragEvent } from './src/components/DragEvent';
import { ScaleEvent } from './src/components/ScaleEvent';
import { Screen } from './src/components/Screen';

export const xcomponents = {
    AnalogStick,
    CircleButton,
    DPad,
    DragEvent,
    ScaleEvent,
    Screen
};
export const xcomps = xcomponents;
