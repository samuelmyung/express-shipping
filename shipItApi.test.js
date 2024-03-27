"use strict";

const fetchMock = require("fetch-mock");

const {
  shipProduct,
  SHIPIT_SHIP_URL,
  SHIPIT_API_KEY
} = require("./shipItApi");


// mocking mimics the response that is sent back ********
// body should hold response of what the request would be
// look foor this in the post request

test("mockFetch", async function () {

  // mocking our fetch request invoked within our post function
  fetchMock.post(SHIPIT_SHIP_URL, {
      receipt: { itemId: 1000,
        name: "Test Tester",
        addr: "100 Test St",
        zip: "12345-6789",
        shipId: 1
      }
    }
  )

  // mocking our function in the API
  const res = await shipProduct({
    productId: 1000,
    name: "Test Tester",
    addr: "100 Test St",
    zip: "12345-6789",
  });

  expect(res).toEqual(1);
});

