const request = require("supertest");
const app = require("../src/app");
const randomInt = require("random-int");
const faker = require("faker");

describe("Basic Create and Read", () => {
  it("should create customer and return the correct data", async () => {
    const name = faker.name.firstName();
    const street_address = faker.address.cityPrefix();
    const postal_code = faker.address.cityPrefix();
    const country = faker.address.countryCode();
    const userId = randomInt(1000);
    const postData = await request(app)
      .post(`/customers/${userId}`)
      .send({
        name,
        address: {
          street_address,
          postal_code,
          country
        }
      });

    expect(postData.statusCode).toEqual(200);

    const fetchData = await request(app).get(`/customers/${userId}`);

    expect(fetchData.statusCode).toEqual(200);
    expect(fetchData.body.name).toEqual(name);
    expect(fetchData.body.street_address).toEqual(street_address);
    expect(fetchData.body.country);
  });
});
