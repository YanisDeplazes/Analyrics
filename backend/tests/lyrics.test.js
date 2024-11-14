const request = require("supertest");
const app = require("../app");

describe("GET /lyrics", () => {
  it("should return 400 if Search Query is not provided", async () => {
    const response = await request(app).get("/lyrics");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Search query parameter is required",
    });
  });

  // TODO: Fails sometimes
  // it("should return 200 if the genius request succeeds", async () => {
  //   const response = await request(app)
  //     .get("/lyrics")
  //     .query({ q: "Queen Bohemian Rhapsody" });
  //   expect(response.status).toBe(200);
  // });

  it("should return 404 if no song exist", async () => {
    const response = await request(app)
      .get("/lyrics")
      .query({ q: "dhsuiagduzsagdisaidsa" });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "No results found" });
  });
});
