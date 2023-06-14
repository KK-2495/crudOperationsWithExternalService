import users from "../Model/users.js";
import encrypt from "encryptjs";

export const registerChecks = (req,res,next) => {
    try {
        const {name, email , password, pin, role} = req.body;
        if(!name) return res.send("Name is required.");
        if(!email) return res.send("Email is required.");
        if(!password) return res.send("Password is required");
        if(!pin) return res.send("PIN is required");
        if(!role) return res.send("Role is required");
        next();
    } catch (error) {
        return res.send(error);
    }
}

export const addProductAuth = async (req,res,next) =>{
    try {
        const {id, pin, role} = req.body;
        if(!id) return res.send("ID is required.!");
        if(!pin) return res.send("PIN is required.!");
        if(!role) return res.send("Role is required.!");

        const response = await users.find({_id: id}).exec();
        let userPin = response[0].pin;
        let secretkey='crudOperation';
        let decryptPin = encrypt.decrypt(userPin,secretkey,256);
        // console.log(decryptPin);
        if(decryptPin != pin) return res.send("Pin does not match");
        let seller = response[0].role;
        if (seller === role || seller === 'admin') {
            next();
          } else {
            return res.send("You are not allowed to add products!");
          }
    } catch (error) {
        return res.send(error);
    }
}