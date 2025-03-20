import { expect } from 'chai';
import PetDTO from '../../src/dto/Pet.dto.js';

describe('PetDTO', () => {
    describe('constructor', () => {
        it('debería crear una instancia de PetDTO con las propiedades correctas', () => {
            const petData = {
                name: 'Firulais',
                specie: 'Perro',
                image: 'firulais.jpg',
                birthDate: '2020-01-01',
                adopted: true,
            };
            const petDTO = new PetDTO(petData);

            expect(petDTO.name).to.equal(petData.name);
            expect(petDTO.specie).to.equal(petData.specie);
            expect(petDTO.image).to.equal(petData.image);
            expect(petDTO.birthDate).to.equal(petData.birthDate);
            expect(petDTO.adopted).to.equal(petData.adopted);
        });
    });

    describe('getPetInputFrom', () => {
        it('debería crear un objeto con los valores proporcionados', () => {
            const petData = {
                name: 'Mittens',
                specie: 'Gato',
                image: 'mittens.png',
                birthDate: '2021-05-15',
            };
            const petInput = PetDTO.getPetInputFrom(petData);

            expect(petInput.name).to.equal(petData.name);
            expect(petInput.specie).to.equal(petData.specie);
            expect(petInput.image).to.equal(petData.image);
            expect(petInput.birthDate).to.equal(petData.birthDate);
            expect(petInput.adopted).to.equal(false); 
        });

        it('debería usar valores predeterminados si no se proporcionan valores', () => {
            const petInput = PetDTO.getPetInputFrom({});

            expect(petInput.name).to.equal('');
            expect(petInput.specie).to.equal('');
            expect(petInput.image).to.equal('');
            expect(petInput.birthDate).to.equal('12-30-2000');
            expect(petInput.adopted).to.equal(false);
        });

         it('debería usar valores predeterminados si se proporcionan valores null o undefined', () => {
            const petData = {
                name: null,
                specie: undefined,
                image: null,
                birthDate: undefined,
            };
             const petInput = PetDTO.getPetInputFrom(petData);

            expect(petInput.name).to.equal('');
            expect(petInput.specie).to.equal('');
            expect(petInput.image).to.equal('');
            expect(petInput.birthDate).to.equal('12-30-2000');
            expect(petInput.adopted).to.equal(false);
        });

    });
});