const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('User',() =>{
    beforeAll(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });
    
    it('should be able to create a new user', async() =>{
        const response = await request(app)
            .post('/user')
            .send({
                email: "a@a.com",
                telefone: "12999999919",
                senha: "1234"
            });
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
    });

    it('should be able to make an user login', async() => {
        const response = await request(app)
            .post('/sessionsuser')
            .send({
                email: "a@a.com",
                senha: "1234"
            });
        
        expect(response.status).toBe(200);        
        expect(response.body).toHaveProperty('id');
    });
});