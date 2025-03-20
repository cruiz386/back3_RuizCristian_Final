import adoptionModel from "./models/Adoption.js";
import {logger} from "../utils/logger.js";

export default class Adoption {

    get = (params) =>{
        return adoptionModel.find(params);
    }

    getBy = (params) =>{
        return adoptionModel.findOne(params);
    }

    save = (doc) =>{
        logger.info(`Saving adoption: ${JSON.stringify(doc)}`);
        return adoptionModel.create(doc);
    }

    update = (id,doc) =>{
        return adoptionModel.findByIdAndUpdate(id,{$set:doc}, { new: true }); 
    }
    
    delete = (id) =>{
        return adoptionModel.findByIdAndDelete(id);
    }
}