const getRecipeById = require('../getRecipeById');

test('Retrieves a recipe with ID of 53010', async () => {
  // Simulating API call
  const recipe = await getRecipeById("53010");
  // The expected name of the recipe
  expect(recipe.strMeal).toBe("Lamb Tzatziki Burgers");

});
