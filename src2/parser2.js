let findMatchingQuoteIndex = string => {
    let regex = string[0] === '"' ? /[^\\](\\{2})*"/ : /[^\\](\\{2})*'/;
    let match = string.match(regex);
    return match.index + match[0].length - 1;
};

let input = `
    string: 'field 1', number: 23, boolean: true, null: null, undefined: undefined, array: [{obj: {key: 'field'}}, 3, 1, false] }
`;


let pr

// let findIndex = (string, regex) => string.search(regex);
//
// let findEndIndex = (string, regex) => {
//     let match = string.match(regex);
//     return match && match.index + match[0].length - 1;
// };


