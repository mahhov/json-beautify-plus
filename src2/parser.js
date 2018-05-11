// let input = `
// field: key 2nd : word,
// field2 no colons;
// x = 39 is my favorite number
// `;

// let output = {
//     field: 'key 2nd : word',
//     field2: 'no colons',
//     x: '39 is my favorite number'
// };

let input = `
    string: 'field 1', number: 23, boolean: true, null: null, undefined: undefined, array: [{obj: {key: 'field'}}, 3, 1, false] }
`;

let output = {string: 'field 1', number: 23, boolean: true, null: null, undefined: undefined, array: [{obj: {key: 'field'}}, 3, 1, false]};

let LexType = {
    UNPARSED: 'unparsed',
    STRING: 'string',
};

let lex = string => {
    string = removeNewLines(string);
    let lexed = [];
    while (string) {
        let start = findQuoteIndex(string);
        let end = findMatchingQuoteIndex(string.substr(start));
        lexed.push({type: LexType.STRING,})
    }

    return lexed
};

let parse = string => {
    string = string.trim();

    if (isString(string))
        return getString(string);
    if (isNumber(string))
        return getNumber(string);
    if (isBoolean(string))
        return getBoolean(string);
    if (isNull(string))
        return getNull(string);
    if (isUndefined(string))
        return getUndefined(string);
    if (isArray(string))
        return getArray(string).split(',').map(item => parse(item));

    removeOpeningCurlyBrace(string);
    let obj = {};
    string.split(',')
        .map(field => field.split(':'))
        .forEach(([key, value]) => obj[key] = parse(value));
    return obj;

    // todo can't split by ',' or ':', due to nested objects/arrays
    // todo whitepsace trim
    // todo arrays
};

let isString = string => /^'.*'$/.test(string) || /^".*"$/.test(string);

let getString = string => {
    let single = string.match(/^'(.*)'$/);
    let double = string.match(/^"(.*)"$/);
    return single && single[1] || double && double[1];
};

let isNumber = string => /^[0-9]+$/.test(string);

let getNumber = string => parseInt(string);

let isBoolean = string => string === 'true' || string === 'false';

let getBoolean = string => string === 'true';

let isNull = string => string === 'null';

let getNull = () => null;

let isUndefined = string => string === 'undefined';

let getUndefined = () => undefined;

let isArray = string => {
    let values = string.match(/^[(.*)]$/);
    return values && values[1];
};

let getArray = string => {
    let items = string.match(/^[(.*)]$/);
    console.log('is in get array', string, items);
    return items && items[1];
};

let findQuoteIndex = string => {
    let regex = /(^|[^\\])(\\{2})*['"]/;
    let match = string.match(regex);
    return match && match.index + match[0].length - 1;
};

let findMatchingQuoteIndex = string => {
    let regex = string[0] === '"' ? /[^\\](\\{2})*"/ : /[^\\](\\{2})*'/;
    let match = string.match(regex);
    return match && match.index + match[0].length - 1;
};

let removeNewLines = string => string.replace(/\n/g, '');

let hasOpeningCurlyBrace = string => /^\s*{/.test(string);

let removeOpeningCurlyBrace = string => string.match(/^\s*{(.*)/);

let getWord = (string, startIndex, deliminator) => {
    let subString = string.substr(startIndex);
    let match = subString.match(new RegExp(`(.*)[${deliminator}]`));
    return match && match.length > 1 ? match[1] : null;
};

let doIt = input => console.log(lex(input));


console.log('actual', doIt(input));
console.log('expected', output);
