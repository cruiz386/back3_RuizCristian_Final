import {logger} from "../utils/logger.js";

export default class GenericRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getAll = (params) =>{
        logger.info(`Getting all ${params}`);
        return this.dao.get(params);
    }

    getBy = (id) => { 
        logger.info(`Getting ${id}`);
        return this.dao.getBy(id); 
    }

    create = (doc) =>{
        logger.info(`Creating ${doc}`);
        return this.dao.save(doc);
    }

    update = (id, doc) => { 
        logger.info(`Updating ${id}`);
        return this.dao.update(id, doc);
    }

    delete = (id) =>{
        logger.info(`Deleting ${id}`);
        return this.dao.delete(id);
    }
}