const request = require("supertest");
const app = require("../index");

describe("GET /albums", () => {
  it("should return 400 if lyrics is not provided", async () => {
    const response = await request(app).post("/analyzer").send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Invalid or missing lyrics array" });
  });

  it("should return 400 if lyrics is not an array", async () => {
    const response = await request(app)
      .post("/analyzer")
      .send({ lyrics: "This is not an array" });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Invalid or missing lyrics array" });
  });

  // Not testing the analyzer logic
});
