import {logger} from "../utils/logger.js";
import PetDTO from "../dto/Pet.dto.js";
import { petsService } from "../services/index.js";
import __dirname from "../utils/index.js";

const getAllPets = async (req, res) => {
    try {
        logger.info("Getting all pets");
        const pets = await petsService.getAll();
        res.status(200).send({ status: "success", payload: pets });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
};

const createPet = async (req, res) => {
    try {
        logger.info("Creating pet");
        const { name, specie, birthDate } = req.body;
        if (!name || !specie || !birthDate) {
            logger.error("Incomplete values");
            return res.status(400).send({ status: "error", error: "Incomplete values" });
        }
        const pet = PetDTO.getPetInputFrom({ name, specie, birthDate });
        const result = await petsService.create(pet);
        logger.info("Pet created");
        res.status(201).send({ status: "success", payload: result });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
};

const updatePet = async (req, res) => {
    try {
        logger.info("Updating pet");
        const petUpdateBody = req.body;
        const petId = req.params.pid;
        const result = await petsService.update(petId, petUpdateBody);
        logger.info("Pet updated");
        res.status(200).send({ status: "success", message: "Pet updated", payload: result });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
};

const deletePet = async (req, res) => {
    try {
        logger.info("Deleting pet");
        const petId = req.params.pid;
        const result = await petsService.delete(petId);
        logger.info("Pet deleted");
        res.status(200).send({ status: "success", message: "Pet deleted", payload: result });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
};

const getPetById = async (req, res) => {
    try {
        logger.info("Getting pet by id");
        const petId = req.params.pid;
        const pet = await petsService.getBy(petId);
        if (!pet) {
            logger.error("Pet not found");
            return res.status(404).send({ status: "error", error: "Pet not found" });
        }
        logger.info("Pet found");
        res.status(200).send({ status: "success", payload: pet });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
};

const createPetWithImage = async (req, res) => {
    try {
        logger.info("Creating pet with image");
        const file = req.file;
        const { name, specie, birthDate } = req.body;
        if (!name || !specie || !birthDate) {
            logger.error("Incomplete values");
            return res.status(400).send({ status: "error", error: "Incomplete values" });
        }
        const pet = PetDTO.getPetInputFrom({
            name,
            specie,
            birthDate,
            image: `${__dirname}/../public/img/${file.filename}`
        });
        const result = await petsService.create(pet);
        logger.info("Pet created with image");
        res.status(201).send({ status: "success", payload: result });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
};

export default {
    getAllPets,
    createPet,
    updatePet,
    deletePet,
    getPetById,
    createPetWithImage
};
