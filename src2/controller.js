const source = require('bb-better-binding')(__dirname, document);

source.createPair = () => {
    let name = source.pairs.length;
    let pair = {name, raw: ''};
    source.pairs.push(pair);
    source.setActivePairIndex(source.pairs.length - 1);
    saveChanges();
    focus();
};

source.setActivePairIndex = index => {
    source.activePairIndex = index;
    source.rawElem.value = getActivePair().raw;
    updatePretty();
    focus();
};

source.deletePair = index => {
    if (source.pairs.length === 1)
        source.init();
    else {
        source.pairs.splice(index, 1);
        if (source.activePairIndex === index)
            source.setActivePairIndex(index < source.pairs.length ? index : source.pairs.length - 1);
        else if (source.activePairIndex > index)
            source.setActivePairIndex(source.activePairIndex - 1);
    }
    focus();
};

source.editPairName = (buttonElem, pair) => {
    pair.edittingName = true;
    buttonElem.parentNode.childNodes[3].focus();
};

source.endEditPairName = (pair, event) => {
    if (event && event.key !== 'Enter')
        return;
    pair.edittingName = false;
    // apply name change & save
};

source.copy = () => {
    navigator.clipboard.writeText(source.pretty).catch(() => {
        try {
            selectPretty();
            document.execCommand('copy');
        } catch (error) {
        }
    });
    focus();
};

let selectPretty = () => {
    let selection = window.getSelection();
    if (!selection.isCollapsed)
        return;
    let range = window.document.createRange();
    range.selectNodeContents(source.prettyElem);
    selection.removeAllRanges();
    selection.addRange(range);
};

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

let focus = () => source.rawElem.focus();

source.init = () => {
    source.pairs = [];
    source.createPair();
    source.setActivePairIndex(0);
};
source.init();

// todo
// rename
// reorder
// styling
// json parse
