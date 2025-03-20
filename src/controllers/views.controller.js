import { Router } from 'express';
import path from 'path';

const router = Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'register.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
});

router.get('/pets', (req, res) => { 
    res.sendFile(path.join(__dirname, '..', 'views', 'pets.html'));
});

router.get('/adoptions', (req, res) => { 
    res.sendFile(path.join(__dirname, '..', 'views', 'adoptions.html'));
});

router.get('/users', (req, res) => { 
    res.sendFile(path.join(__dirname, '..', 'views', 'users.html'));
});


export default router;
