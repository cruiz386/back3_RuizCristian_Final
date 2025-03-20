import userModel from "./models/User.js";


export default class Users {
    
    get = (params) =>{
        return userModel.find(params);
    }

    getBy = (param) => {
        if(typeof param === 'string'){
            return userModel.findOne({_id: param});
        }else{
            return userModel.findOne(param);
        }
    };

    save = (doc) =>{
        return userModel.create(doc);
    }

    addDocuments = (id, docs) => {
        return userModel.findByIdAndUpdate(id, { $push: { documents: docs } }, { new: true });
    }

    update = (id,doc) =>{
        return userModel.findByIdAndUpdate(id,{$set:doc}, { new: true }); 
    }

    delete = (id) =>{
        return userModel.findByIdAndDelete(id);
    }
}