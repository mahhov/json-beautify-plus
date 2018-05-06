const source = require('bb-better-binding')(__dirname, document);

source.pairs = [];

source.createPair = () => {
    let name = source.pairs.length;
    source.pairs.push({name, raw: ''});
};

source.setActivePair = pair => {
    source.activePair = pair;
};

source.rawChanged = () => {
    source.pretty = source.rawElem.value;
};
