const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONGs', () => {
    let idOng = '';
    let idCaso = '';

    beforeAll(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG',async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                nome: "a",
                email: "a@gmail.com",
                whatsapp: "12912341234",
                cidade: "sjc",
                estado: "SP"
            });
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
        idOng = response.body.id;
    });
    
    it('should be able to get all ONGs', async() => {
        const response = await request(app).get('/ongs');
        const resp = [{
            id: idOng,
            nome: "a",
            email: "a@gmail.com",
            whatsapp: "12912341234",
            cidade: "sjc",
            estado: "SP"
        }];

        expect(response.status).toBe(200);
        expect(response.body).toEqual(resp);
    });

    it('should be able to make an ONG login', async() => {
        const response = await request(app)
            .post('/sessions')
            .send({id: idOng});

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('nome');
    });

    describe('Casos', () => {
        it('should be able to create an incident',async() => {
            const response = await request(app)
                .post('/casos')
                .set('auth',idOng)
                .send({
                    titulo: "z",
                    descricao: "zzz",
                    valor: 120
                });
            
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id');
            idCaso = response.body.id;
        });

        it('should be able to list all incidents', async() =>{
            const response = await request(app).get('/casos');
            const resp = [{
                id: idCaso,
                titulo: "z",
                descricao: "zzz",
                valor: 120,
                ongs_id: idOng,
                nome: "a",
                email: "a@gmail.com",
                whatsapp: "12912341234",
                cidade: "sjc",
                estado: "SP"
            }];

            expect(response.status).toBe(200);
            expect(response.body).toEqual(resp);
            expect(response.header).toHaveProperty('x-total-count');
        });

        
        it('should be able to list all incidents of an ONG', async() =>{
            const response = await request(app)
                .get('/perfil')
                .set('auth',idOng);
            
            const resp = [{
                id: idCaso,
                titulo: "z",
                descricao: "zzz",
                valor: 120,
                ongs_id: idOng
            }];

            expect(response.status).toBe(200);
            expect(response.body).toEqual(resp);
        });

        it('should be able to delete an incident', async() => {
            const response = await request(app)
                .delete('/casos/'+idCaso)
                .set('auth',idOng);
            
            expect(response.status).toBe(204);
        });
    });
});