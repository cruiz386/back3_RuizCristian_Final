import request from 'supertest';
import app from '../../src/app.js';
import { usersService } from '../../src/services/index.js';
import chai from 'chai';

const expect = chai.expect;

describe('Pruebas del controlador de usuarios', () => {
    let idDeUsuarioValido;

    before(async () => {
        const nuevoUsuario = {
            first_name: 'Test',
            last_name: 'Usuario',
            email: `testuser${Date.now()}@example.com`,
            password: 'password123',
        };
        const usuarioCreado = await usersService.create(nuevoUsuario);
        idDeUsuarioValido = usuarioCreado._id.toString();
    });

    it('debería obtener todos los usuarios', async () => {
        const respuesta = await request(app).get('/api/users');
        expect(respuesta.status).to.equal(200);
        expect(respuesta.body.status).to.equal('success');
        expect(respuesta.body.payload).to.be.an('array');
    });

    it('debería obtener un usuario por ID', async () => {
        const respuesta = await request(app).get(`/api/users/${idDeUsuarioValido}`);
        expect(respuesta.status).to.equal(200);
        expect(respuesta.body.status).to.equal('success');
        expect(respuesta.body.payload).to.be.an('object');
        expect(respuesta.body.payload).to.have.property('_id', idDeUsuarioValido);
    });

    it('debería actualizar un usuario', async () => {
        const datosDeActualizacion = {
            first_name: 'Nombre Actualizado',
        };
        const respuesta = await request(app)
            .put(`/api/users/${idDeUsuarioValido}`)
            .send(datosDeActualizacion);
        expect(respuesta.status).to.equal(200);
        expect(respuesta.body.status).to.equal('success');
        expect(respuesta.body.message).to.equal('User updated');

        const usuarioActualizado = await usersService.getUserById(idDeUsuarioValido);
        expect(usuarioActualizado.first_name).to.equal(datosDeActualizacion.first_name);
    });

    it('debería eliminar un usuario', async () => {
        const respuesta = await request(app).delete(`/api/users/${idDeUsuarioValido}`);
        expect(respuesta.status).to.equal(200);
        expect(respuesta.body.status).to.equal('success');
        expect(respuesta.body.message).to.equal('User deleted');

        const usuarioEliminado = await usersService.getUserById(idDeUsuarioValido);
        expect(usuarioEliminado).to.be.null;
    });
});
