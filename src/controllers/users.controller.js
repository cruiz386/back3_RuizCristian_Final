import { usersService } from "../services/index.js";
import { createHash, passwordValidation } from "../utils/index.js";
import jwt from 'jsonwebtoken';
import UserDTO from '../dto/User.dto.js';
import { logger } from '../utils/logger.js';
import __dirname  from '../utils/index.js';

const register = async (req, res) => {
    try {
        logger.info("Register user");
        const { first_name, last_name, email, password } = req.body;
        if (!first_name || !last_name || !email || !password) {
            logger.error("Incomplete values");
            return res.status(400).send({ status: "error", error: "Incomplete values" });
        }
        const exists = await usersService.getUserByEmail(email);
        if (exists) {
            logger.error("User already exists");
            return res.status(400).send({ status: "error", error: "User already exists" });
        }
        const hashedPassword = await createHash(password);
        const user = {
            first_name,
            last_name,
            email,
            password: hashedPassword
        };
        const result = await usersService.create(user);
        logger.info("User created");
        res.status(201).send({ status: "success", payload: result._id });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
};

const login = async (req, res) => {
    try {
        logger.info("Login user");
        const { email, password } = req.body;
        if (!email || !password) {
            logger.error("Incomplete values");
            return res.status(400).send({ status: "error", error: "Incomplete values" });
        }
        const user = await usersService.getUserByEmail(email);
        if (!user) {
            logger.error("User doesn't exist");
            return res.status(404).send({ status: "error", error: "User doesn't exist" });
        }
        const isValidPassword = await passwordValidation(user, password);
        if (!isValidPassword) {
            logger.error("Incorrect password");
            return res.status(400).send({ status: "error", error: "Incorrect password" });
        }
        const userDto = UserDTO.getUserTokenFrom(user);
        const token = jwt.sign(userDto, 'tokenSecretJWT', { expiresIn: "1h" });
        logger.info("User logged in");
        res.cookie('coderCookie', token, { maxAge: 3600000 }).send({ status: "success", message: "Logged in" });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
};

const current = async (req, res) => {
    try {
        logger.info("Get current user");
        const cookie = req.cookies['coderCookie'];
        if (!cookie) {
            logger.error("Unauthorized");
            return res.status(401).send({ status: "error", error: "Unauthorized" });
        }
        const user = jwt.verify(cookie, 'tokenSecretJWT');
        if (user) {
            logger.info("User found");
            return res.status(200).send({ status: "success", payload: user });
        }
    } catch (error) {
        logger.error(error.message);
        return res.status(401).send({ status: "error", error: "Invalid token" });
    }
};

const unprotectedLogin = async (req, res) => {
    try {
        logger.info("Unprotected login user");
        const { email, password } = req.body;
        if (!email || !password) {
            logger.error("Incomplete values");
            return res.status(400).send({ status: "error", error: "Incomplete values" });
        }
        const user = await usersService.getUserByEmail(email);
        if (!user) {
            logger.error("User doesn't exist");
            return res.status(404).send({ status: "error", error: "User doesn't exist" });
        }
        const isValidPassword = await passwordValidation(user, password);
        if (!isValidPassword) {
            logger.error("Incorrect password");
            return res.status(400).send({ status: "error", error: "Incorrect password" });
        }
        const token = jwt.sign(user.toObject(), 'tokenSecretJWT', { expiresIn: "1h" });
        logger.info("User logged in");
        res.cookie('unprotectedCookie', token, { maxAge: 3600000 }).send({ status: "success", message: "Unprotected Logged in" });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
};

const unprotectedCurrent = async (req, res) => {
    try {
        logger.info("Get current user unprotected");
        const cookie = req.cookies['unprotectedCookie'];
        if (!cookie) {
            logger.error("Unauthorized");
            return res.status(401).send({ status: "error", error: "Unauthorized" });
        }
        const user = jwt.verify(cookie, 'tokenSecretJWT');
        if (user) {
            logger.info("User found");
            return res.status(200).send({ status: "success", payload: user });
        }
    } catch (error) {
        logger.error(error.message);
        return res.status(401).send({ status: "error", error: "Invalid token" });
    }
};

const getAllUsers = async (req, res) => {
    try {
        logger.info("Get all users");
        const users = await usersService.getAll();
        if (!users || users.length === 0) {
            logger.error("Users not found");
            return res.status(404).send({ status: "error", message: "Users not found" });
        }
        logger.info("Users found");
        res.status(200).send({ status: "success", payload: users });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send({ status: "error", message: "Internal server error" });
    }
};

const getUser = async (req, res) => {
    try {
        logger.info("Get user by id");
        const userId = req.params.uid;
        const user = await usersService.getUserById(userId);
        if (!user) {
            logger.error("User not found");
            return res.status(404).send({ status: "error", error: "User not found" });
        }
        logger.info("User found");
        res.status(200).send({ status: "success", payload: user });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
};

const updateUser = async (req, res) => {
    try {
        logger.info("Update user");
        const updateBody = req.body;
        const userId = req.params.uid;
        const user = await usersService.getUserById(userId);
        if (!user) {
            logger.error("User not found");
            return res.status(404).send({ status: "error", error: "User not found" });
        }
        const result = await usersService.update(userId, updateBody);
        logger.info("User updated");
        res.status(200).send({ status: "success", message: "User updated", payload: result });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
};

const deleteUser = async (req, res) => {
    try {
        logger.info("Delete user");
        const userId = req.params.uid;
        const result = await usersService.delete(userId);
        logger.info("User deleted");
        res.status(200).send({ status: "success", message: "User deleted", payload: result });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
};

const addDocuments = async (req, res) => {
    try {
        logger.info("Add documents to user");
        const userId = req.params.uid;
        const files = req.files;

        console.log("req.files:", files); 

        if (!files || files.length === 0) {
            return res.status(400).send({ status: "error", message: "No se subieron archivos." });
        }

        const documents = files.map(file => { 
            return {
                name: file.originalname,
                reference: `${__dirname}/../public/img/${file.filename}`
            }
        });

        const result = await usersService.addDocuments(userId, documents);
        logger.info("Documents added");
        res.status(200).send({ status: "success", message: "Documents added", payload: result });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
};

export default {
    current,
    login,
    register,
    unprotectedLogin,
    unprotectedCurrent,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    addDocuments
};
