const getRecipeBySaves = require('../getRecipeBySaves');

test('Retrieves saved recipes for account ID 1', async () => {
    // Simulating API call
    const savedRecipes = await getRecipeBySaves(1);

    // Expected number of saved recipes 
    expect(savedRecipes.length).toBeGreaterThan(0);
});
