import products from "../Model/products.js";
import users from "../Model/users.js";
import encrypt from "encryptjs";

export const register = async (req,res) =>{
    try {
        const {name, email, password, pin, role} = req.body;

        const response = await users.find({email}).exec();
        
        if(response.length) return res.send("You're already Registered.");
        let secretkey='crudOperation';
        let encryptPass =encrypt.encrypt(password,secretkey,256);
        let encryptPin =encrypt.encrypt(pin,secretkey,256);
        const user = new users({
            name,
            email,
            password:encryptPass,
            pin:encryptPin,
            role
        });
        await user.save();
        return res.send("Registration Successful.!");
    } catch (error) {
        return res.send(error);
    }
}

export const addProduct = async(req,res) =>{
    try {
        const {title, price, description, image, category} = req.body;
        fetch('https://fakestoreapi.com/products',{
            method:"POST",
            body:JSON.stringify(
                {
                    title,
                    price,
                    description,
                    image,
                    category
                }
            )
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
        return res.send(json);
    } catch (error) {
        return res.send(error);
    }
}