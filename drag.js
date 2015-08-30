// libs
import Bacon from 'baconjs';

// ramda functions
import prop from 'ramda/src/prop';
import __ from 'ramda/src/__';
import merge from 'ramda/src/merge';
import compose from 'ramda/src/compose';
import curry from 'ramda/src/curry';


// Helpers
const listen = curry(function(event, target) {
    return Bacon.fromEventTarget(target, event);
});

const propCurrentTarget = prop('currentTarget');
const mousedownStream = listen('mousedown');
const mousemoveStream = listen('mousemove');
const mouseupStream = listen('mouseup');

const log = function(x) {
    console.log(x);
    return x;
};

const mergeEvent = curry(function(currentEvent, event) {
    event.currentEvent = currentEvent;
    return event;
});

// Drag

const drag = curry(function(el, start, move, finish) {

    let a, b;

    const fin = curry(function mouseup(mousemove, event) {
        finish(event);

        a();
        b();
        //document.removeEventListener('mousemove', mousemove);
        //document.removeEventListener('mouseup', mouseup);
    });

    const mousedown = function(event) {

        const mergeCurrentEvent = mergeEvent(event);

        const mousemove = compose(move, mergeCurrentEvent);
        const mouseup = compose(fin(mousemove), mergeCurrentEvent);

        // Call start
        start(event);

        a = mousemoveStream(el).onValue(mousemove);
        b = mouseupStream(el).onValue(mouseup);

        return event;
    };

    return mousedownStream(el).onValue(mousedown);
});

export default drag;
