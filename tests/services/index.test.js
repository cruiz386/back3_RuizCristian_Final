import chai from 'chai';
import { usersService, petsService, adoptionsService } from '../../src/services/index.js';

const expect = chai.expect;

describe('Servicios', () => {
    it('debe tener los servicios definidos', () => {
        expect(usersService).to.be.an('object');
        expect(petsService).to.be.an('object');
        expect(adoptionsService).to.be.an('object');
    });
});

