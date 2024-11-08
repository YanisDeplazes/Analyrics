const request = require("supertest");
const app = require("../app");

describe("GET /tracks", () => {
  it("should return 400 if ID is not provided", async () => {
    const response = await request(app).get("/tracks");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "ID parameter is required" });
  });

  it("should return 200 if the spotify request succeeds", async () => {
    const response = await request(app)
      .get("/tracks")
      .query({ id: "11dFghVXANMlKmJXsNCbNl" });
    expect(response.status).toBe(200);
  });

  it("should return 500 if the spotify request fails", async () => {
    const response = await request(app).get("/tracks").query({ id: "test" });
    expect(response.status).toBe(500);
  });
});
