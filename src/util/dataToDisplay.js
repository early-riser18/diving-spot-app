const dataToDisplay = {
adaptedFor(value) {
    switch (value) {
        case 'all':
            return 'tous';
        case 'scubaDiving':
            return 'la plongée bouteille';
        case 'snorkeling':
            return 'la plongée palme / tuba';
        default: return 'tous';
    };
},


caracteristics(value){
    let toDisplay = [];
    if (value['fishy']){
        toDisplay.push('Poissoneux');
    };
    if (value['reef']){
        toDisplay.push("Récif");
    };
    if (value['shipwreck']){
        toDisplay.push("Épave");
    };
    if (value['wall']){
        toDisplay.push("Tombant");
    };
    return toDisplay;
}
}
export default dataToDisplay;