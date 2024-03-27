"use strict";

// this is what we're mocking away
const shipitApi = require("../shipItApi");
shipitApi.shipProduct = jest.fn();

const request = require("supertest");
const app = require("../app");

describe("POST /", function () {
  test("valid", async function () {
    // setting shipProduct to 1 (mocking shipProduct function)
    shipitApi.shipProduct.mockReturnValue(1);

    // testing our route but shipProduct is 1
    const resp = await request(app).post("/shipments").send({
        productId: 1000,
        name: "Sam",
        addr: "123 Main St",
        zip: "94102"
    });

    // get value as 1
    expect(resp.body).toEqual({ shipped: 1 });
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
          productId: 1000,
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
















