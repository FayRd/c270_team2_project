const getReviewsByUser = require('../getReviewsByUser');

test('Retrieves reviews for a user with account ID of 1', async () => {
    // Simulating API call
    const reviews = await getReviewsByUser(1);

    // Expected review content
    expect(reviews.length).toBeGreaterThan(0);
    expect(reviews[0].contents).toBe("I love this food!");
});
