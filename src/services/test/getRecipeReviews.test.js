const getRecipeReviews = require('../getRecipeReviews');

test('Retrieves reviews for a recipe with ID of 52874', async () => {
    // Simulating API call
    const reviews = await getRecipeReviews(52874);

    // Expected review content
    expect(reviews.length).toBeGreaterThan(0);
    expect(reviews[0].contents).toBe("I love this food!");
});
