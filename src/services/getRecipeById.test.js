const getRecipeById = require('./getRecipeById');

// Mock the global fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      meals: [{
        idMeal: "53010",
        strMeal: "Mocked Recipe",
        strCategory: "Mocked Category",
        strInstructions: "Mocked Instructions"
      }]
    })
  })
);

test('retrieves a recipe using its ID', async () => {
  const recipe = await getRecipeById("53010"); // Simulating API call

  expect(recipe).toEqual({
    idMeal: "53010",
    strMeal: "Mocked Recipe",
    strCategory: "Mocked Category",
    strInstructions: "Mocked Instructions"
  });

  expect(fetch).toHaveBeenCalledWith("https://www.themealdb.com/api/json/v1/1/lookup.php?i=53010");
});
