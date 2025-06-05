Your project setup looks solid! Based on the provided code, here's how you can structure and write tests for the recipes API using Jest.

---

### **Test Structure**

Organize your tests under a `tests/` folder to align with best practices:

```bash
tests/
├── controllers/
│   └── recipesController.test.js
├── services/
│   └── recipeService.test.js
└── integration/
    └── recipes.test.js
```

---

### **1. Unit Test for Recipe Service**

File: `tests/services/recipeService.test.js`

```javascript
import * as recipeService from '../../services/recipeService.js';
import RecipesModel from '../../models/recipesModel.js';

jest.mock('../../models/recipesModel.js'); // Mock the Recipe model

describe('Recipe Service', () => {
	describe('getAllRecipes', () => {
		it('should return all recipes', async () => {
			const mockRecipes = [
				{ id: 1, title: 'Recipe 1' },
				{ id: 2, title: 'Recipe 2' },
			];
			RecipesModel.find.mockResolvedValue(mockRecipes);

			const recipes = await recipeService.getAllRecipes();

			expect(recipes).toEqual(mockRecipes);
			expect(RecipesModel.find).toHaveBeenCalledWith({});
		});
	});

	describe('createRecipe', () => {
		it('should create a new recipe and return it', async () => {
			const mockRecipeData = { title: 'New Recipe', ingredients: 'Salt, Pepper' };
			const mockCreatedRecipe = { id: 1, ...mockRecipeData };

			RecipesModel.create.mockResolvedValue(mockCreatedRecipe);

			const recipe = await recipeService.createRecipe(mockRecipeData);

			expect(recipe).toEqual(mockCreatedRecipe);
			expect(RecipesModel.create).toHaveBeenCalledWith(mockRecipeData);
		});
	});
});
```

---

### **2. Unit Test for Recipe Controller**

File: `tests/controllers/recipesController.test.js`

```javascript
import * as recipeController from '../../controllers/recipesController.js';
import * as recipeService from '../../services/recipeService.js';

jest.mock('../../services/recipeService.js'); // Mock the Recipe service

describe('Recipe Controller', () => {
	describe('getAllRecipesHandler', () => {
		it('should respond with all recipes', async () => {
			const mockRecipes = [
				{ id: 1, title: 'Recipe 1' },
				{ id: 2, title: 'Recipe 2' },
			];
			recipeService.getAllRecipes.mockResolvedValue(mockRecipes);

			const req = {};
			const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
			const next = jest.fn();

			await recipeController.getAllRecipesHandler(req, res, next);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith({
				status: 'success',
				data: mockRecipes,
			});
		});
	});

	describe('createRecipeHandler', () => {
		it('should respond with the created recipe', async () => {
			const mockRecipeData = { title: 'New Recipe', ingredients: 'Salt, Pepper' };
			const mockCreatedRecipe = { id: 1, ...mockRecipeData };

			recipeService.createRecipe.mockResolvedValue(mockCreatedRecipe);

			const req = { body: mockRecipeData };
			const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
			const next = jest.fn();

			await recipeController.createRecipeHandler(req, res, next);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith({
				status: 'success',
				data: mockCreatedRecipe,
			});
		});
	});
});
```

---

### **3. Integration Test for the Recipes API**

File: `tests/integration/recipes.test.js`

```javascript
import request from 'supertest';
import app from '../../app.js';
import mongoose from 'mongoose';

beforeAll(async () => {
	await mongoose.connect('mongodb://127.0.0.1:27017/testdb', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
});

afterAll(async () => {
	await mongoose.connection.dropDatabase();
	await mongoose.connection.close();
});

describe('Recipes API', () => {
	it('GET /api/v1/recipes should return all recipes', async () => {
		const response = await request(app).get('/api/v1/recipes');

		expect(response.status).toBe(200);
		expect(response.body.status).toBe('success');
		expect(Array.isArray(response.body.data)).toBe(true);
	});

	it('POST /api/v1/recipes should create a new recipe', async () => {
		const newRecipe = { title: 'Test Recipe', ingredients: 'Sugar, Milk' };

		const response = await request(app).post('/api/v1/recipes').send(newRecipe);

		expect(response.status).toBe(200);
		expect(response.body.status).toBe('success');
		expect(response.body.data.title).toBe('Test Recipe');
	});
});
```

---

### **4. Run the Tests**

Run all tests using:

```bash
npm test
```

---

### **Tips for Testing**

1. **Mock External Dependencies**:

    - Use `jest.mock` for database models or services.

2. **Test Different Layers**:

    - Services: Test business logic.
    - Controllers: Test request/response.
    - Integration: Test the end-to-end flow.

3. **Use Test Databases**:

    - Set up a separate test database with MongoDB for integration tests.

4. **Clean Up**:
    - Use `beforeAll`, `beforeEach`, `afterEach`, and `afterAll` hooks for setup and cleanup.

Let me know if you need help with specific parts!
