const source = require('bb-better-binding')(__dirname, document);

source.pairs = [];

source.createPair = () => {
    let name = source.pairs.length;
    source.pairs.push({name, raw: ''});
};

source.rawChanged = () => {
    source.pretty = source.rawElem.value;
};
