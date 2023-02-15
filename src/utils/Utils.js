/**
 * @author pschroen / https://ufo.ai/
 */

export function degrees(radians) {
    return radians * 180 / Math.PI;
}

export function radians(degrees) {
    return degrees * Math.PI / 180;
}

export function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

export function range(value, oldMin, oldMax, newMin, newMax, isClamp) {
    const newValue = ((value - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin;

    if (isClamp) {
        return clamp(newValue, Math.min(newMin, newMax), Math.max(newMin, newMax));
    }

    return newValue;
}

export function mix(a, b, alpha) {
    return a * (1 - alpha) + b * alpha;
}

export function step(edge, value) {
    return value < edge ? 0 : 1;
}

export function smoothstep(min, max, value) {
    const x = clamp((value - min) / (max - min), 0, 1);

    return x * x * (3 - 2 * x);
}

export function smootherstep(min, max, value) {
    const x = clamp((value - min) / (max - min), 0, 1);

    return x * x * x * (x * (x * 6 - 15) + 10);
}

export function parabola(x, k) {
    return Math.pow(4 * x * (1 - x), k);
}

export function pcurve(x, a, b) {
    const k = Math.pow(a + b, a + b) / (Math.pow(a, a) * Math.pow(b, b));

    return k * Math.pow(x, a) * Math.pow(1 - x, b);
}

export function fract(value) {
    return value - Math.floor(value);
}

export function lerp(value, target, alpha) {
    return value + (target - value) * alpha;
}

export function mod(value, n) {
    return (value % n + n) % n;
}

export function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

export function random(min, max, precision = 0) {
    const multiplier = Math.pow(10, precision);

    return Math.round((Math.random() * (max - min) + min) * multiplier) / multiplier;
}

export function headsTails(heads, tails) {
    if (typeof heads === 'undefined') {
        return random(0, 1);
    }

    return random(0, 1) ? tails : heads;
}

export function guid() {
    return (Date.now() + random(0, 99999)).toString();
}

export function brightness(color) {
    return color.r * 0.3 + color.g * 0.59 + color.b * 0.11;
}

export function basename(path, ext) {
    const name = path.split('/').pop().split('?')[0];

    return !ext ? name.split('.')[0] : name;
}

export function extension(path) {
    return path.split('.').pop().split('?')[0].toLowerCase();
}

export function absolute(path) {
    if (path.includes('//')) {
        return path;
    }

    const port = Number(location.port) > 1000 ? `:${location.port}` : '';
    const pathname = path.startsWith('/') ? path : `${location.pathname.replace(/\/[^/]*$/, '/')}${path}`;

    return `${location.protocol}//${location.hostname}${port}${pathname}`;
}

export function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

export function getConstructor(object) {
    const isInstance = typeof object !== 'function';
    const code = isInstance ? object.constructor.toString() : object.toString();
    const name = code.match(/(?:class|function)\s([^\s{(]+)/)[1];

    return { name, code, isInstance };
}
