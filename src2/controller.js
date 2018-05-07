const source = require('bb-better-binding')(__dirname, document);

// tabs

source.createPair = () => {
    let name = source.pairs.length;
    let pair = {name, raw: ''};
    source.pairs.push(pair);
    source.setActivePairIndex(source.pairs.length - 1);
    saveChanges();
    source.rawElem.focus();
};

source.setActivePairIndex = index => {
    source.activePairIndex = index;
    source.rawElem.value = getActivePair().raw;
    updatePretty();
};

source.deletePair = index => {
    if (source.pairs.length === 1)
        init();
    else {
        source.pairs.splice(index, 1);
        if (source.activePairIndex === index)
            source.setActivePairIndex(index < source.pairs.length ? index : source.pairs.length - 1);
        else if (source.activePairIndex > index)
            source.setActivePairIndex(source.activePairIndex - 1);
    }
};

// change in text

source.rawChanged = () => {
    saveChanges();
    updatePretty();
};

let saveChanges = () => {
    getActivePair().raw = source.rawElem.value;
    console.log('todo - save');
};

let updatePretty = () => source.pretty = getActivePair().raw;

let getActivePair = () => source.pairs[source.activePairIndex];

let init = () => {
    source.pairs = [];
    source.createPair();
    source.setActivePairIndex(0);
};
init();

// todo focus text on load
