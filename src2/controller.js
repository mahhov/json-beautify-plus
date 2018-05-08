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
    let nameInputElem = buttonElem.parentElement.children[1];
    nameInputElem.value = pair.name;
    nameInputElem.focus();
};

source.endEditPairName = (thiz, event, pair) => {
    if (event && event.key !== 'Enter')
        return;
    pair.edittingName = false;
    pair.name = thiz.value;
    saveChanges();
    focus();
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
    getActivePair().raw = source.rawElem.value;
    saveChanges();
    updatePretty();
};

let saveChanges = () => {
    console.log('todo - save');
};

let updatePretty = () => source.pretty = getActivePair().raw;

let getActivePair = () => source.pairs[source.activePairIndex];

let focus = () => source.rawElem.focus();

source.dragPairStart = (event, index) => {
    event.dataTransfer.setData("pair", index);
    console.log('drag start');
};

source.dragPairOver = event => {
    if (!event.dataTransfer.types.includes('pair'))
        return;
    event.dataTransfer.dropEffect = "move";
    event.preventDefault();
};

source.dragPairEnd = event => {
    let sourceIndex = event.dataTransfer.getData("pair");
    let destination = event.path.find(pairElem => pairElem.getAttribute('draggable')).parentElement;
    let destinationIndex = Array.prototype.indexOf.call(destination.parentElement.children, destination);
    let sourcePair = source.pairs[sourceIndex];
    source.pairs[sourceIndex] = source.pairs[destinationIndex]; // todo reorder not swap, and check bounds
    source.pairs[destinationIndex] = sourcePair;
    event.preventDefault();
};

source.init = () => {
    source.pairs = [];
    source.createPair();
    source.setActivePairIndex(0);
};
source.init();

// todo
// styling
// json parse
// save to localhost
// unique names
// reorder improve bugginess
