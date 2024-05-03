const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  // Convert a valid input such as 10L: GET request to /api/convert.
  test("Testing GET /api/convert with valid input", (done) => {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=10L")
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          initNum: 10,
          initUnit: "L",
          returnNum: 2.64172,
          returnUnit: "gal",
          string: "10 liters converts to 2.64172 gallons",
        });
        done();
      });
  });

  // Convert an invalid input such as 32g: GET request to /api/convert.
  test("Testing GET /api/convert with invalid unit", (done) => {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=32g")
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.text, "Invalid unit");
        done();
      });
  });

  // Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.
  test("Testing GET /api/convert with invalid number", (done) => {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=3/7.2/4kg")
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.text, "Invalid number");
        done();
      });
  });

  // Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.
  test("Testing GET /api/convert with invalid number and unit", (done) => {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=3/7.2/4kilomegagram")
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.text, "Invalid number and unit");
        done();
      });
  });

  // Convert with no number such as kg: GET request to /api/convert.
  test("Testing GET /api/convert with no number", (done) => {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=kg")
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          initNum: 1,
          initUnit: "kg",
          returnNum: 2.20462,
          returnUnit: "lbs",
          string: "1 kilograms converts to 2.20462 pounds",
        });
        done();
      });
  });
});
