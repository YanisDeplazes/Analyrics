const request = require("supertest");
const app = require("../app");

describe("GET /albums", () => {
  it("should return 400 if ID is not provided", async () => {
    const response = await request(app).get("/albums");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "ID parameter is required" });
  });

  it("should return 200 if the spotify request succeeds", async () => {
    const response = await request(app)
      .get("/albums")
      .query({ id: "4aawyAB9vmqN3uQ7FjRGTy" });
    expect(response.status).toBe(200);
  });

  it("should return 502 if the spotify request fails", async () => {
    const response = await request(app).get("/albums").query({ id: "test" });
    expect(response.status).toBe(502);
    expect(response.body).toEqual({ error: "Spotify API request failed" });
  });
});
