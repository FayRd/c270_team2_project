const getRecipeList = require('../getRecipeList');

test('Retrieves a list of 6 randomly picked recipes', async () => {
    // Simulating API call
    const recipes = await getRecipeList();
    // The expected length of the recipe list
    expect(recipes.length).toBe(6);
    // Ensure each recipe has a 'strMeal' property 
    recipes.forEach(recipe => {
        expect(recipe).toHaveProperty('strMeal');
    });
});
