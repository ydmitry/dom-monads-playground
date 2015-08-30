import {curry, prop, compose, pipe} from 'ramda';
import {IO} from 'ramda-fantasy';
import './color';

var dragStart = function(start, move, finish) {
    var mousemove = function(originalEvent) {
        var fn = move(originalEvent);
        return function(event) {
            return fn(event);
        }
    };

    var mouseup = function(originalEvent, mousemove) {
        var fn = finish(originalEvent);
        return function mouseup(event) {
            fn(event);
            document.removeEventListener('mousemove', mousemove);
            document.removeEventListener('mouseup', mouseup);
        };
    };

    return function(event) {
        var mousemoveEvent = mousemove(event);
        var mouseupEvent = mouseup(event, mousemoveEvent);
        start(event);
        document.addEventListener('mousemove', mousemoveEvent);
        document.addEventListener('mouseup', mouseupEvent);
    };
};

var start = function(event) {
    console.log('start', event.currentTarget);
};

var setLeft = curry(function(el, left) {
    return new IO(function() {
        el.style.left = left + 'px';
        return el;
    });
});

var getLeft = function(el) {
    return new IO(function() {
        return el.style.left;
    });
};

var move = function(originalEvent) {
    let {pageX, target} = originalEvent;
    let left = parseInt(target.style.left) || 0;

    return function(event) {
        let newPageX = event.pageX;
        target.style.left = (left + newPageX - pageX) + 'px';
    }
};

var finish = curry(function(originalEvent, event) {
    console.log('finish', originalEvent, event);
});

var setLeftEventTarget = compose(setLeft, prop('target'));

var getLeftEventTarget = compose(getLeft, prop('target'));

var move1 = curry(function(originalEvent, event) {
    let pageX = prop('pageX', event);
    setLeftEventTarget(originalEvent)(pageX).runIO();
});

var container = document.getElementById('container');
container.addEventListener('mousedown', dragStart(start, move1, finish));
