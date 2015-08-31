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

    const mergeCurrentEvent = mergeEvent(event);

    const mousemove = compose(move, mergeCurrentEvent);
    const mouseup = compose(finish, mergeCurrentEvent);

    mousemoveStream(document.body).map(mousemove);
    mouseupStream(document.body).map(mouseup);

    return mousedownStream(el).map().onValue(start);
});

export default drag;
