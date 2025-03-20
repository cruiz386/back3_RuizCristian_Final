// views.router.js
import { Router } from "express";
import usersModel from "../dao/models/User.js";
import petsModel from "../dao/models/Pet.js"; 
import adoptionsModel from "../dao/models/Adoption.js"; 


const viewsRouter = Router();

viewsRouter.get('/', (req, res) => {
    res.render('index');
})

viewsRouter.get('/register', (req, res) => {
    res.render('register');
})

viewsRouter.get('/login', (req, res) => {
    res.render('login');
})


viewsRouter.get('/pets', async (req, res) => {
    const pets = await petsModel.find().lean(); 
    res.render('pets', { pets: pets }); 
});

viewsRouter.get('/adoptions', async (req, res) => {
    const adoptions = await adoptionsModel.find().lean(); 
    res.render('adoptions', { adoptions: adoptions}); 
});

viewsRouter.get('/users', async (req, res) => {
    const users = await usersModel.find().lean(); 
    res.render('users', { users: users }); 
});


export default viewsRouter;