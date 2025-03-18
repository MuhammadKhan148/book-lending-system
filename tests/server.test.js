const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

describe('Server Routes', () => {
    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('GET / should return welcome message', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Welcome to Book Lending System API');
    });
});