import { adoptionsService, petsService, usersService } from "../services/index.js";
import { logger } from "../utils/logger.js";

const getAllAdoptions = async (req, res) => {
    try {
        logger.info("Getting all adoptions");
        const adoptions = await adoptionsService.getAll();
        logger.info("Adoptions found");
        res.status(200).send({ status: "success", payload: adoptions });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
};

const getAdoption = async (req, res) => {
    try {
        logger.info("Getting adoption by id");
        const adoptionId = req.params.aid;
        const adoption = await adoptionsService.getBy({ _id: adoptionId });
        if (!adoption) {
            logger.error("Adoption not found");
            return res.status(404).send({ status: "error", error: "Adoption not found" });
        }
        logger.info("Adoption found");
        res.status(200).send({ status: "success", payload: adoption });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
};

const createAdoption = async (req, res) => {
    try {
        logger.info("Creating adoption");

        const pet = req.query.pid; 
        const user = req.query.uid; 

        const petDoc = await petsService.getBy({ _id: pet });
        if (!petDoc) {
            logger.error("Pet not found");
            return res.status(404).send({ status: "error", error: "Pet not found" });
        }

        const userDoc = await usersService.getUserById(user);
        if (!userDoc) {
            logger.error("User not found");
            return res.status(404).send({ status: "error", error: "User not found" });
        }

        if (petDoc.adopted) {
            logger.error("Pet is already adopted");
            return res.status(400).send({ status: "error", error: "Pet is already adopted" });
        }

        userDoc.pets.push(petDoc._id);
        await usersService.update(userDoc._id, { pets: userDoc.pets });
        await petsService.update(petDoc._id, { adopted: true, owner: userDoc._id });

        const adoption = await adoptionsService.create({ owner: userDoc._id, pet: petDoc._id });
        logger.info("Adoption created");
        
        res.status(201).send({ status: "success", message: "Pet adopted", payload: adoption });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
};

export default {
    createAdoption,
    getAllAdoptions,
    getAdoption,
};