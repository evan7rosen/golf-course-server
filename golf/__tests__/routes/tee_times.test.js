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

describe("tee_times routes", () => {
  describe("get all tee_times", () => {
    it("should fetch all tee_times successfully", async () => {
      const res = await request(app).get("/tee_times");

      expect(res.status).toEqual(200);
      expect(res.body).toHaveLength(500);
    });
  });
  describe("get one tee_time", () => {
    it("should fetch one tee_times successfully", async () => {
      const id = 1;
      const res = await request(app).get(`/tee_times/${id}`);

      expect(res.status).toEqual(200);
      expect(res.body.id).toEqual(1);
    });
  });
  describe("add one tee_time", () => {
    it("should add one new tee_time successfully", async () => {
      const newTeeTime = {
        time: "2019-12-09T01:57:19+07:00"
      };
      const res = await request(app)
        .post("/tee_times")
        .send(newTeeTime);

      expect(res.status).toEqual(200);
      expect(res.body.id).toEqual(501);
    });
  });
  describe("edit one tee_time", () => {
    it("should edit one tee_time successfully", async () => {
      const updatedTeeTime = {
        time: "2019-12-09T01:57:19+07:00"
      };
      const id = 1;
      const res = await request(app)
        .patch(`/tee_times/${id}`)
        .send(updatedTeeTime);

      expect(res.status).toEqual(200);
      expect(res.body.id).toEqual(1);
      expect(res.body.time).toEqual(updatedTeeTime.time);
    });
  });
  describe("delete one tee_time", () => {
    it("should delete one tee_time successfully", async () => {
      const id = 1;
      const res = await request(app).delete(`/tee_times/${id}`);

      expect(res.status).toEqual(200);
      expect(res.body.id).toEqual(1);

      const teeTimes = await knex("tee_times");
      expect(teeTimes[0].id).toEqual(2);
    });
  });
});
