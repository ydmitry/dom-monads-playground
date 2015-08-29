export function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export function contrastColor(hexColor) {
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
