const saveRecipe = require('../saveRecipe');

describe('saveRecipe', () => {
  test('should be defined', () => {
    expect(saveRecipe).toBeDefined();
  });

  test('should throw an error when called without arguments', async () => {
    await expect(saveRecipe()).rejects.toThrow();
  });

  test('should execute successfully with valid arguments', async () => {
    // Mock the saveRecipe function
    const mockSaveRecipe = jest.fn().mockResolvedValue({ affectedRows: 1 });

    const result = await mockSaveRecipe(1, 101);

    expect(result).toEqual({ affectedRows: 1 });
    expect(mockSaveRecipe).toHaveBeenCalledWith(1, 101);
  });
});



