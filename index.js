import curry from 'ramda/src/curry';
import pipe from 'ramda/src/pipe';
import map from 'ramda/src/map';
import lift from 'ramda/src/lift';
import tap from 'ramda/src/tap';
import prop from 'ramda/src/prop';
import compose from 'ramda/src/compose';
import flip from 'ramda/src/flip';
import Bacon from 'baconjs';
import Future from 'data.future';
import {IO, runIO, extendFn} from 'io';

extendFn();

// HELPERS

const listen = curry(function (event, target) {
    return Bacon.fromEventTarget(target, event);
});

const log = function(x) { console.log(x); return x; };
const fork = curry(function(f, future) { return future.fork(log, f); });
const fmap = curry(function(f, functor) {
    return functor.map(f);
});

const chain = curry(function(f, functor) {
    return functor.chain(f);
});

const setHtml = curry(function(el, x) {
    el.innerHtml = x;
    return el;
});

const setBackgroundColor = curry(function(el, color) {
    log('setBackgroundColor');
    el.style.backgroundColor = color;
    return el;
});

const setColor = curry(function(el, color) {
    log('setColor');
    el.style.color = color;
    return el;
});

// PURE

const eventTarget = prop('target');

const clickStream = compose(map(eventTarget), listen('click'));


// UNPURE

let el = document.getElementById('container');

let setBgColorAndContrastColor = curry(function(el) {
    let setColorEl = setColor(el).toIO();
    let setBackgroundColorEl = tap(setBackgroundColor(el)).toIO();

    return compose(
        chain(setColorEl),
        log,
        map(contrastColor),
        log,
        setBackgroundColorEl
    );
});

let randCol = compose(
    runIO,
    log,
    setBgColorAndContrastColor(el),
    log,
    getRandomColor
);

clickStream(el).onValue(
    randCol
);

/*clickStream(el).onValue(
    compose(
        runIO,
        compose(setColor(el).toIO(), contrastColor),
        runIO,
        tap(setBackgroundColor(el)).toIO(),
        getRandomColor
    )
);*/


function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function contrastColor(hexColor)
{
    return (hexdec(hexColor) > 0xffffff/2) ? '#000000' : '#FFFFFF';
}

function hexdec(hex_string) {
    //  discuss at: http://phpjs.org/functions/hexdec/
    // original by: Philippe Baumann
    //   example 1: hexdec('that');
    //   returns 1: 10
    //   example 2: hexdec('a0');
    //   returns 2: 160

    hex_string = (hex_string + '')
        .replace(/[^a-f0-9]/gi, '');
    return parseInt(hex_string, 16);
}
