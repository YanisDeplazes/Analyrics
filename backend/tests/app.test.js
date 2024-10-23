const request = require("supertest");
const app = require("../app"); // Path to your Express app

describe("GET /", () => {
  it("should respond with 200 and return HTML content", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toMatch(/html/);
  });
});
