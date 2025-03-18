const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");

let token = "";

describe("Basic API Tests", () => {
    afterAll(async () => {
        await mongoose.connection.close();
    });

    test("GET / should return welcome message", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Welcome to Book Lending System API");
    });

    test("Register user", async () => {
        const res = await request(app).post("/auth/register").send({
            username: "testuser",
            password: "password123"
        });
        expect(res.statusCode).toBe(200);
    });

    test("Login user", async () => {
        const res = await request(app).post("/auth/login").send({
            username: "testuser",
            password: "password123"
        });
        expect(res.statusCode).toBe(200);
        token = res.body.token; // Save token for next test
    });

    test("Lend a book", async () => {
        const res = await request(app)
            .post("/books/lend")
            .set("Authorization", token)
            .send({
                title: "Test Book",
                author: "Author Name",
                category: "Fiction",
                borrower: "John Doe",
                dueDate: "2025-01-01"
            });
        expect(res.statusCode).toBe(200);
    });
});
