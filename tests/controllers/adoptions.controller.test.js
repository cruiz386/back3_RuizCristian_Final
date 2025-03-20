import chai from 'chai';
import request from 'supertest';
import app from '../../src/app.js';
import { petsService, usersService, adoptionsService } from '../../src/services/index.js';

const expect = chai.expect;

describe('Pruebas del Controlador de Adopciones', () => {
    let validUserId;
    let validPetId;
    let adoptionId;

    before(async () => {

    });

    it('deberia devolver todas las adopciones', async () => {
        const response = await request(app).get('/api/adoptions');
        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal('success');
        expect(response.body.payload).to.be.an('array');
    });

    it('deberia crear una adopcion', async () => {

        const newUser = {
            first_name: 'Test',
            last_name: 'User',
            email: `testuser${Date.now()}@example.com`,
            password: 'password123',
        };
        const createdUser = await usersService.create(newUser);
        validUserId = createdUser._id.toString();

        const newPet = {
            name: 'Test Pet',
            specie: 'Dog',
            birthDate: new Date(),
        };
        const createdPet = await petsService.create(newPet);
        validPetId = createdPet._id.toString();


        const response = await request(app)
            .post(`/api/adoptions?uid=${validUserId}&pid=${validPetId}`);

        adoptionId = response.body.payload._id;

        expect(response.status).to.equal(201);
        expect(response.body.status).to.equal('success');
        expect(response.body.payload).to.be.an('object');
        expect(response.body.payload).to.have.property('_id');
    });

    it('deberia devolver una adopcion por id', async () => {
        const response = await request(app).get(`/api/adoptions/${adoptionId}`);
        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal('success');
        expect(response.body.payload).to.be.an('object');
        expect(response.body.payload._id).to.equal(adoptionId);
    });

    after(async () => {

        if (adoptionId) {
            await adoptionsService.delete(adoptionId);
        }
        if (validPetId) {
            await petsService.delete(validPetId);
        }
        if (validUserId) {
            await usersService.delete(validUserId);
        }
    });
});