// Parse recipe instructions into an ordered list
const parseInstructions = (recipe) => {
    const instructions = recipe.strInstructions;
    let steps = instructions.split('.').map(s => s.trim()).filter(s => s !== '');
    steps = steps.filter(element => isNaN(element));
    return steps;
}

module.exports = parseInstructions;

