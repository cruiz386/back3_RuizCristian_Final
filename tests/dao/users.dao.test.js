import chai from 'chai';
import User from '../../src/dao/Users.dao.js';

const expect = chai.expect;

describe('Tests del DAO de Usuarios', () => {
    let userDao;
    let testUser;

    before(() => {
        userDao = new User();
        testUser = {
            first_name: 'John',
            last_name: 'Doe',
            email: `john.doe${Date.now()}@example.com`,
            password: 'password123'
        };
    });

    it('debería crear un nuevo usuario', async () => {
        const resultado = await userDao.save(testUser);
        expect(resultado).to.have.property('_id');
        expect(resultado.first_name).to.equal(testUser.first_name);
        expect(resultado.email).to.equal(testUser.email);
        testUser._id = resultado._id;
    });

    it('debería obtener usuarios por parámetros', async () => {
        const result = await userDao.get({ email: testUser.email });
        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf.at.least(1);
        expect(result[0].email).to.equal(testUser.email);
    });

    it('debería obtener un usuario por ID', async () => {
        const result = await userDao.getBy(testUser._id);
        expect(result).to.have.property('_id');
        expect(result._id.toString()).to.equal(testUser._id.toString());
    });

    it('debería actualizar un usuario', async () => {
        const newLastName = 'Doe Actualizado';
        const updatedUser = await userDao.update(testUser._id, { last_name: newLastName });
        expect(updatedUser.get('last_name')).to.equal(newLastName); 
    });

    it('debería eliminar un usuario', async () => {
        const resultado = await userDao.delete(testUser._id);
        expect(resultado._id.toString()).to.equal(testUser._id.toString());
    });
});