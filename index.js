import curry from 'ramda/src/curry';
import pipe from 'ramda/src/pipe';
import map from 'ramda/src/map';
import lift from 'ramda/src/lift';
import prop from 'ramda/src/prop';
import compose from 'ramda/src/compose';
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

const setHtml = curry(function(el, x) {
    el.innerHtml = x;
    return el;
});

const setColor = curry(function(el) {
    el.style.backgroundColor = getRandomColor();
    return el;
});

// PURE

const eventTarget = prop('target');

const clickStream = compose(map(eventTarget), listen('click'));


// UNPURE

let el = document.getElementById('container');

clickStream(el).onValue(
    compose(runIO, setColor.toIO(el))
);

//let run = addEventListenerClickEl;
//console.log(run(el));



function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
