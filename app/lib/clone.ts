export default function clone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    let temp = obj.constructor();
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            temp[key] = clone(obj[key]);
        }
    }
    return temp;
}
