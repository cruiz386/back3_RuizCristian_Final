import chai from 'chai';
import Pet from '../../src/dao/Pets.dao.js';


const expect = chai.expect;

describe('Tests del DAO de Mascotas', () => {
    let petDao;
    let testPet;

    before(() => {
        petDao = new Pet();
        testPet = {
            name: 'Firulais',
            specie: 'Perro',
            birthDate: new Date('2020-01-01')
        };
    });

    it('debería crear una nueva mascota', async () => {
        const resultado = await petDao.save(testPet);
        expect(resultado).to.have.property('_id');
        expect(resultado.name).to.equal(testPet.name);
        expect(resultado.specie).to.equal(testPet.specie);
        testPet._id = resultado._id;
    });

    it('debería obtener mascotas por parámetros', async () => {
        const result = await petDao.get({ specie: testPet.specie });
        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf.at.least(1);
        expect(result[0].specie).to.equal(testPet.specie);
    });

    it('debería obtener una mascota por ID', async () => {
        const result = await petDao.getBy(testPet._id);
        expect(result).to.have.property('_id');
        expect(result._id.toString()).to.equal(testPet._id.toString());
    });

    it('debería actualizar una mascota', async () => {
        const newName = 'Firulais Actualizado';
        const updatedPet = await petDao.update(testPet._id, { name: newName });
        expect(updatedPet.get('name')).to.equal(newName); 
    });

    it('debería eliminar una mascota', async () => {
        const resultado = await petDao.delete(testPet._id);
        expect(resultado._id.toString()).to.equal(testPet._id.toString());
    });
});