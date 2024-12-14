const request = require("supertest");
const app = require("../index");

describe("GET /search", () => {
  it("should return 400 if Query is not provided", async () => {
    const response = await request(app).get("/search");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Query parameter is required" });
  });

  it("should return 200 if the spotify request succeeds", async () => {
    const response = await request(app)
      .get("/search")
      .query({ query: "remaster%20track:Doxy%20artist:Miles%20Davis" });
    expect(response.status).toBe(200);
  });
});
