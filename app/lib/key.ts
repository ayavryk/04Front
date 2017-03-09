let shiftDown = false;
let ctrlDown = false;
let altDown = false;

const setShiftDown = event => {
    switch (event.keyCode) {
        case 16:
            shiftDown = true;
            break;
        case 17:
            ctrlDown = true;
            break;
        case 18:
            altDown = true;
            break;
        default:
    }
};

const setShiftUp = event => {
    switch (event.keyCode) {
        case 16:
            shiftDown = false;
            break;
        case 17:
            ctrlDown = false;
            break;
        case 18:
            altDown = false;
            break;
        default:
    }

};

document.addEventListener('keydown', setShiftDown);
document.addEventListener('keyup', setShiftUp);

export {shiftDown, ctrlDown, altDown}
