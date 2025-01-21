const getRecipeById = require('./getRecipeById');

// Mock the global fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      meals: [{
        idMeal: "12345",
        strMeal: "Mocked Recipe",
        strCategory: "Mocked Category",
        strInstructions: "Mocked Instructions"
      }]
    })
  })
);

test('retrieves a recipe using its ID', async () => {
  const recipe = await getRecipeById("12345"); // Simulating API call

  expect(recipe).toEqual({
    idMeal: "12345",
    strMeal: "Mocked Recipe",
    strCategory: "Mocked Category",
    strInstructions: "Mocked Instructions"
  });

  expect(fetch).toHaveBeenCalledWith("https://www.themealdb.com/api/json/v1/1/lookup.php?i=12345");
});
