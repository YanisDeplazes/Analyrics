const request = require("supertest");
const app = require("../app");

describe("GET /playlists", () => {
  it("should return 400 if ID is not provided", async () => {
    const response = await request(app).get("/playlists");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "ID parameter is required" });
  });

  it("should return 200 if the spotify request succeeds", async () => {
    const response = await request(app)
      .get("/playlists")
      .query({ playlist_id: "3cEYpjA9oz9GiPac4AsH4n" });
    expect(response.status).toBe(200);
  });

  it("should return 500 if the spotify request fails", async () => {
    const response = await request(app)
      .get("/playlists")
      .query({ playlist_id: "test" });
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Spotify API request failed" });
  });
});
