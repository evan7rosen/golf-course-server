const request = require("supertest");
const { app } = require("../../server");
const knex = require("../../db/knex");
const knexCleaner = require("knex-cleaner");

beforeEach(() => {
  return knexCleaner
    .clean(knex, {
      ignoreTables: ["knex_migrations", "knex_migrations_lock"]
    })
    .then(() => knex.seed.run());
});

describe("customers routes", () => {
  describe("get all customers", () => {
    it("should fetch all customers successfully", async () => {
      const res = await request(app).get("/customers");

      expect(res.status).toEqual(200);
      expect(res.body).toHaveLength(300);
    });
  });
  describe("get one customer", () => {
    it("should fetch one customers successfully", async () => {
      const id = 1;
      const res = await request(app).get(`/customers/${id}`);

      expect(res.status).toEqual(200);
      expect(res.body.id).toEqual(1);
    });
  });
  describe("add one customer", () => {
    it("should add one new customer successfully", async () => {
      const newCustomer = {
        name: "Winters Banks",
        company: "APEXIA",
        email: "wintersbanks@apexia.com",
        phone: "+1 (953) 410-3095",
        address: "929 Columbia Street, Gordon, New Mexico, 9816",
        created_at: "2014-05-10T01:42:45 +07:00",
        updated_at: "2017-10-05T08:15:11 +07:00"
      };
      const res = await request(app)
        .post("/customers")
        .send(newCustomer);

      expect(res.status).toEqual(200);
      expect(res.body.id).toEqual(301);
    });
  });
  describe("edit one customer", () => {
    it("should edit one customer successfully", async () => {
      const updatedCustomer = {
        name: "Dingus McLingus",
        company: "PHARMACON",
        email: "margiebarber@pharmacon.com",
        phone: "+1 (978) 466-3835",
        address: "580 Court Square, Blandburg, Arizona, 597",
        created_at: "2017-05-22T02:53:41 +07:00",
        updated_at: "2019-10-26T08:36:33 +07:00"
      };
      const id = 1;
      const res = await request(app)
        .patch(`/customers/${id}`)
        .send(updatedCustomer);

      expect(res.status).toEqual(200);
      expect(res.body.id).toEqual(1);
      expect(res.body.name).toEqual(updatedCustomer.name);
    });
  });
  describe("delete one customer", () => {
    it("should delete one customer successfully", async () => {
      const id = 1;
      const res = await request(app).delete(`/customers/${id}`);

      expect(res.status).toEqual(200);
      expect(res.body.id).toEqual(1);

      const customers = await knex("customers");
      expect(customers[0].id).toEqual(2);
    });
  });
});
