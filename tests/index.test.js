const supertest = require("supertest");

// Application
const server = require("../index.js");
const requestWithSupertest = supertest(server);

// Album

describe("Album Endpoints", () => {
  it("GET /album should return a paginated result of all albums", async () => {
    const res = await requestWithSupertest.get("/album");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    // expect(res.body).toHaveProperty("albums");
  });

  it("GET /album/:id should return an album", async () => {
    const res = await requestWithSupertest.get("/album/2");
    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    // expect(res.body).toHaveProperty("album");
  });
});
