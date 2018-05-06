const source = require('bb-better-binding')(__dirname, document);

source.createPair = () => {
    let name = source.pairs.length;
    let pair = {name, raw: ''};
    source.pairs.push(pair);
    source.setActivePair(pair);
    saveChanges();
};

source.setActivePair = pair => {
    source.activePair = pair;
    source.rawElem.value = pair.raw;
    updatePretty();
};

source.rawChanged = () => {
    saveChanges();
    updatePretty();
};

let saveChanges = () => {
    source.activePair.raw = source.rawElem.value;
    console.log('todo - save');
};

let updatePretty = () => source.pretty = source.activePair.raw;

let init = () => {
    source.pairs = [];
    source.createPair();
    source.setActivePair(source.pairs[0]);
};
init();
