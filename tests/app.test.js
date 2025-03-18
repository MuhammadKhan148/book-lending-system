const request = require("supertest");
const app = require("../server");

describe("Book Lending System", () => {
    test("Register user", async () => {
        const res = await request(app).post("/auth/register").send({ username: "test", password: "test123" });
        expect(res.statusCode).toBe(200);
    });

    test("Login user", async () => {
        const res = await request(app).post("/auth/login").send({ username: "test", password: "test123" });
        expect(res.statusCode).toBe(200);
    });
});
