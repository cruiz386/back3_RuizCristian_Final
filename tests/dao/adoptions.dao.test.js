import chai from 'chai';
import Adoption from '../../src/dao/Adoption.dao.js';

const expect = chai.expect;

describe('Tests del DAO de Adopciones', () => {
    let adoptionDao;
    let testAdoption;

    before(() => {
        adoptionDao = new Adoption();
        testAdoption = {
            owner: '605c72ef4a8b4e2f484b8a17',
            pet: '605c72ef4a8b4e2f484b8a18'
        };
    });

    it('debería crear una nueva adopción', async () => {
        const resultado = await adoptionDao.save(testAdoption);
        expect(resultado).to.have.property('_id');
        expect(resultado.owner.toString()).to.equal(testAdoption.owner);
        expect(resultado.pet.toString()).to.equal(testAdoption.pet);
        testAdoption._id = resultado._id;
    });

    it('debería obtener adopciones por ID de propietario', async () => {
        const result = await adoptionDao.get({ owner: testAdoption.owner });
        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf.at.least(1);
        expect(result[0].owner.toString()).to.equal(testAdoption.owner);
    });

    it('debería actualizar una adopción', async () => {
        const newOwner = '605c72ef4a8b4e2f484b8a19';
        const updatedAdoption = await adoptionDao.update(testAdoption._id, { owner: newOwner });
        expect(updatedAdoption.owner.toString()).to.equal(newOwner); 
    });

    it('debería eliminar una adopción', async () => {
        const resultado = await adoptionDao.delete(testAdoption._id);
        expect(resultado._id.toString()).to.equal(testAdoption._id.toString());
    });
});