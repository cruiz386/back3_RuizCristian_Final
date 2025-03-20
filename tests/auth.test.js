import chai from 'chai';
import bcrypt from 'bcrypt';
import { createHash, passwordValidation } from '../src/utils/index.js';

const expect = chai.expect;

describe('Servicio de Autenticación (bcrypt)', () => {
  const password = 'miContraseñaSegura';

  it('debería hashear la contraseña correctamente', async () => {
    const hashedPassword = await createHash(password);
    expect(hashedPassword).to.be.a('string');
    expect(hashedPassword).to.not.equal(password);
  });

  it('debería comparar la contraseña correctamente', async () => {
    const hashedPassword = await createHash(password);
    const match = await bcrypt.compare(password, hashedPassword);
    expect(match).to.be.true;
  });

  it('debería fallar si la contraseña hasheada se altera', async () => {
    const hashedPassword = await createHash(password);
    const alteredHash = hashedPassword.slice(0, -10) + 'alterado';
    const match = await bcrypt.compare(password, alteredHash);
    expect(match).to.be.false;
  });
});