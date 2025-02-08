const getRecipeListByList = require('../getRecipeListByList');

test('Retrieves a list of recipes with the same length as the input list', async () => {
    const inputList = [{ recipe_id: "53010" }, { recipe_id: "53011" }];
    const recipes = await getRecipeListByList(inputList);
    // The expected length of the returned list
    expect(recipes.length).toBe(inputList.length);
    // Ensure each returned recipe contains a 'strMeal' property
    recipes.forEach(recipe => {
        expect(recipe).toHaveProperty('strMeal');
    });
});
