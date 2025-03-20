import UserDTO from '../../src/dto/User.dto.js';
import { expect } from 'chai';

describe('UserDTO', () => {
    it('El DTO de usuario debería unificar el nombre y apellido en fullName', () => {
        const user = {
            first_name: 'Juan',
            last_name: 'Pérez',
            email: 'juan.perez@example.com',
            password: 'contraseñaSecreta',
            role: 'admin',
            pets: [],
            __v: 0,
        };
        const result = new UserDTO(user);
        expect(result.name).to.equal(`${user.first_name} ${user.last_name}`);
    });

    it('El DTO de usuario debería eliminar las propiedades innecesarias', () => {
        const user = {
            first_name: 'Juan',
            last_name: 'Pérez',
            email: 'juan.perez@example.com',
            password: 'contraseñaSecreta',
            role: 'admin',
            pets: [],
            __v: 0,
        };
        const result = new UserDTO(user);
        expect(result).to.not.have.property('first_name');
        expect(result).to.not.have.property('last_name');
        expect(result).to.not.have.property('password');
        expect(result).to.not.have.property('__v');
    });

    it('debería conservar otras propiedades', () => {
        const user = {
            first_name: 'Juan',
            last_name: 'Pérez',
            email: 'juan.perez@example.com',
            password: 'contraseñaSecreta',
            role: 'admin',
            pets: [],
            __v: 0,
        };
        const result = new UserDTO(user);
        expect(result).to.have.property('name');
        expect(result).to.have.property('email');
        expect(result).to.have.property('role');
    });

    it('debería manejar usuarios sin pets', () => {
        const user = {
            first_name: 'Ana',
            last_name: 'García',
            email: 'ana.garcia@example.com',
            password: 'otraContraseña',
            role: 'user',
            __v: 0,
        };
        const result = new UserDTO(user);
        expect(result.name).to.equal(`${user.first_name} ${user.last_name}`);
        expect(result.email).to.equal(user.email);
        expect(result.role).to.equal(user.role);
    });

    it('debería manejar usuarios con propiedades adicionales', () => {
        const user = {
            first_name: 'Luis',
            last_name: 'Martínez',
            email: 'luis.martinez@example.com',
            password: 'claveSegura',
            role: 'admin',
            pets: [],
            __v: 0,
            extraProperty: 'value',
        };
        const result = new UserDTO(user);
        expect(result.name).to.equal(`${user.first_name} ${user.last_name}`);
        expect(result.email).to.equal(user.email);
        expect(result.role).to.equal(user.role);
        expect(result).to.not.have.property('extraProperty');
    });
});