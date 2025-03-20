import request from 'supertest';
import app from '../../src/app.js';
import { expect } from 'chai';
import { petsService } from '../../src/services/index.js';

describe('Pruebas del controlador de Mascotas', () => {
    let validPetId;

    before(async () => {
        const newPet = {
            name: 'Suerte',
            specie: 'Gato',
            birthDate: '2023-01-01',
        };
        const createdPet = await petsService.create(newPet);
        validPetId = createdPet._id.toString();
    });

    it('debería crear una mascota', async () => {
        const nuevaMascota = {
            name: 'Suerte',
            specie: 'Gato',
            birthDate: '2023-01-01',
        };
        const respuesta = await request(app)
            .post('/api/pets')
            .send(nuevaMascota);

        expect(respuesta.status).to.equal(201);
        expect(respuesta.body.status).to.equal('success');
        expect(respuesta.body.payload).to.be.an('object');
        expect(respuesta.body.payload).to.have.property('_id');
    });

    it('debería obtener todas las mascotas', async () => {
        const respuesta = await request(app)
            .get('/api/pets')
            .expect(200)
            .expect('Content-Type', /json/);

        expect(respuesta.body.status).to.equal('success');
        expect(respuesta.body.payload).to.be.an('array');
    });

    it('debería obtener una mascota por ID', async () => {
        const respuesta = await request(app)
            .get(`/api/pets/${validPetId}`)
            .expect(200);

        expect(respuesta.body.status).to.equal('success');
    });

    it('debería actualizar una mascota', async () => {
        const datosDeActualizacion = {
            name: 'Suerte Actualizada',
        };
        const respuesta = await request(app)
            .put(`/api/pets/${validPetId}`)
            .send(datosDeActualizacion);
        expect(respuesta.status).to.equal(200);
        expect(respuesta.body.status).to.equal('success');
        expect(respuesta.body.message).to.equal('Pet updated');

        const mascotaActualizada = await petsService.getBy(validPetId); 
        expect(mascotaActualizada.name).to.equal(datosDeActualizacion.name);
    });

    it('debería eliminar una mascota', async () => {
        const respuesta = await request(app).delete(`/api/pets/${validPetId}`);
        expect(respuesta.status).to.equal(200);
        expect(respuesta.body.status).to.equal('success');
        expect(respuesta.body.message).to.equal('Pet deleted');

        const mascotaEliminada = await petsService.getBy(validPetId); 
        expect(mascotaEliminada).to.be.null;
    });
});