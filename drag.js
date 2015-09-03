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

const mousedownStream = listen('mousedown');
const mousemoveStream = listen('mousemove');
const mouseupStream = listen('mouseup');

const detectSelectEventType = function() {
    return "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
};

const selectStream = listen(detectSelectEventType());

const log = function(x) {
    console.log(x);
    return x;
};


function xyFromEvent(v) {
    return {
        x: v.clientX,
        y: v.clientY
    };
}

function getDelta(t) {
    let [b, a] = t;
    return {
        x: a.x - b.x,
        y: a.y - b.y
    };
}

function add(p1, p2) {
    return {
        x: p1.x + p2.x,
        y: p1.y + p2.y
    };
}


// Drag

const drag = function(el) {
    let doc = document;
    let startDrag = mousedownStream(el);
    let endDrag = mouseupStream(doc).log();



    let draggingDeltas = startDrag.flatMap(function() {
        let moveDrag = mousemoveStream(doc);

        return moveDrag
            .map(xyFromEvent)
            .slidingWindow(2, 2)
            .map(getDelta)
            .takeUntil(endDrag);
    });


    return draggingDeltas.scan({
        x: 0,
        y: 0
    }, add);
};

export default drag;
