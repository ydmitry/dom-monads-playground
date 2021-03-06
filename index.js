// Ramda
import curry from 'ramda/src/curry';
import pipe from 'ramda/src/pipe';
import map from 'ramda/src/map';
import lift from 'ramda/src/lift';
import tap from 'ramda/src/tap';
import prop from 'ramda/src/prop';
import compose from 'ramda/src/compose';
import flip from 'ramda/src/flip';

// Libs
import Bacon from 'baconjs';
import Future from 'data.future';

// own modules
import {IO, runIO, extendFn as extendFnIO} from 'io';
import {getRandomColor, contrastColor} from 'colors';
import drag from 'drag';

extendFnIO();

// HELPERS

const listen = curry(function (event, target) {
    return Bacon.fromEventTarget(target, event);
});

const log = function(x) {
    console.log(x);
    return x;
};

const fork = curry(function(f, future) {
    return future.fork(log, f);
});

const chain = curry(function(f, functor) {
    return functor.chain(f);
});

const setHtml = curry(function(el, x) {
    el.innerHtml = x;
    return el;
});

const setBackgroundColor = curry(function(el, color) {
    el.style.backgroundColor = color;
    return el;
});

const setColor = curry(function(el, color) {
    el.style.color = color;
    return el;
});

const setLeft = curry(function(el, left) {
    el.style.left = left + 'px';
    return el;
});

const setTop = curry(function(el, top) {
    el.style.top = top + 'px';
    return el;
});

// PURE

const eventTarget = prop('currentTarget');

const clickStream = compose(map(eventTarget), listen('click'));


// Color

const setBgColorAndContrastColor = curry(function(el, color) {
    let setColorEl = setColor(el).toIO();
    let setBackgroundColorEl = tap(setBackgroundColor(el)).toIO();

    return compose(
        chain(setColorEl),
        map(contrastColor),
        setBackgroundColorEl
    )(color);
});

const setRandomBgColorAndContrastColor = function(el) {
    return setBgColorAndContrastColor(el, getRandomColor());
};

// UNPURE

let el = document.getElementById('container');


// color change

let randCol = compose(
    runIO,
    setRandomBgColorAndContrastColor
);

clickStream(el).onValue(
    randCol
);

// drag element

let setPosition = curry(function(el, pos) {
    setLeft(el, pos.x);
    setTop(el, pos.y);
});

drag(el).onValue(setPosition(el));

//drag(el, dragStart, dragMoveImp, dragFinish);
