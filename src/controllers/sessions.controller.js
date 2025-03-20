import { usersService } from "../services/index.js";
import { createHash, passwordValidation } from "../utils/index.js";
import jwt from 'jsonwebtoken';
import UserDTO from '../dto/User.dto.js';
import { logger } from '../utils/logger.js';

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
        const dateNow = Date.now();
        const result = await usersService.update(user._id, { last_connection: dateNow });
        
        logger.info("User logged in");
        res.cookie('coderCookie', token, { maxAge: 3600000 }).send({ status: "success", message: "Logged in" });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
};

const current = async (req, res) => {
    logger.info("Get current user");
    const cookie = req.cookies['coderCookie'];
    if (!cookie) {
        logger.error("Unauthorized: Cookie not found");
        return res.status(401).send({ status: "error", error: "Unauthorized" });
    }
    try {
        const user = jwt.verify(cookie, 'tokenSecretJWT');
        if (user) {
            logger.info("User found");
            return res.send({ status: "success", payload: user });
        }
    } catch (error) {
        logger.error("Invalid token");
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
    logger.info("Get unprotected current user");
    const cookie = req.cookies['unprotectedCookie'];
    if (!cookie) {
        logger.error("Unauthorized: Cookie not found");
        return res.status(401).send({ status: "error", error: "Unauthorized: Cookie not found" });
    }
    try {
        const user = jwt.verify(cookie, 'tokenSecretJWT');
        if (user) {
            logger.info("User found");
            return res.send({ status: "success", payload: user });
        } else {
            logger.error("Unauthorized: Invalid token");
            return res.status(401).send({ status: "error", error: "Unauthorized: Invalid token" });
        }
    } catch (error) {
        logger.error("Unauthorized: Invalid token");
        return res.status(401).send({ status: "error", error: "Unauthorized: Invalid token" });
    }
};

export default {
    current,
    login,
    register,
    unprotectedLogin,
    unprotectedCurrent
};

