const request = require("supertest");
const app = require("./../app");
const knex = require("./../data/db-config");

beforeEach(async () => {
  await knex.seed.run();
});

afterAll(async () => {
  await knex.destroy();
});

describe("recipes integration tests", () => {
  it("GET /api/recipes", async () => {
    const response = await request(app).get("/api/recipes");

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toHaveLength(7);
    expect(response.body[0].name).toBe("Buffalo Chicken Dip");
    expect(response.body[2].name).toBe("Pepper Poppers");
  });

  it("GET /api/recipes/:id", async () => {
    const response = await request(app).get("/api/recipes/1");

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body.name).toBe("Buffalo Chicken Dip");
    expect(response.body.description).toMatch(/Whenever I bring/);
  });

  it("GET /api/recipes/:id (not found)", async () => {
    const response = await request(app).get("/api/recipes/50");

    expect(response.status).toBe(404);
  });

  describe("ingredients", () => {
    it("GET /api/recipes/:id/shoppingList", async () => {
      const response = await request(app).get("/api/recipes/7/shoppingList");

      expect(response.status).toBe(200);
      expect(response.type).toBe("application/json");
      expect(response.body).toHaveLength(6);
      expect(response.body[0].name).toMatch(/medium/);
      expect(response.body[2].name).toBe("sugar");
    });
  });

  describe("cooking instructions", () => {
    it("GET /api/recipes/:id/instructions", async () => {
      const response = await request(app).get("/api/recipes/7/instructions");

      expect(response.status).toBe(200);
      expect(response.type).toBe("application/json");
      expect(response.body).toHaveLength(3);
      expect(response.body[0].recipeId).toBe(7);
      expect(response.body[0].instructions).toMatch(/Preheat oven to 350°/);
    });
  });
});
