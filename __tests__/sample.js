const request = require("supertest");
const app = require("../src/app");
const randomInt = require("random-int");
const faker = require("faker");
describe("Post Endpoints", () => {
  it("should create a new post", async () => {
    const userId = randomInt(1000);

    const postData = await request(app)
      .post(`/customers/${userId}`)
      .send({
        name: "scott",
        address: {
          street_address: "a",
          postal_code: "b",
          country: "c"
        }
      });

    const fetchData = await request(app).get(`/customers/${userId}`);

    expect(postData.statusCode).toEqual(200);
    expect(fetchData.statusCode).toEqual(200);
  });
});
