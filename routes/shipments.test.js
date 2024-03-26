"use strict";

const request = require("supertest");
const app = require("../app");


describe("POST /", function () {
  test("valid", async function () {
    const resp = await request(app).post("/shipments").send({
        productId: 1,
        name: "Sam",
        addr: "123 Main St",
        zip: "94102"
 });

    expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });

  test("throws error if empty request body", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send();
    expect(resp.statusCode).toEqual(400);
  });

  test("invalid", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send({
          productId: 1,
          name: 5,
          addr: "123 Main St",
          zip: "94102"
   });
    expect(resp.statusCode).toEqual(400);
    expect(resp.body).toEqual({ error: {
      message: ["instance.name is not of a type(s) string"],
      "status": 400
	    }
    });
  });
});














