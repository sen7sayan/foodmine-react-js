import {Router} from 'express';
import { sample_users } from '../data.js';
const router = Router();
import { BAD_REQUEST } from '../constants/httpStatus.js';
import jwt from 'jsonwebtoken';
import handler from 'express-async-handler';
import { UserModel } from '../models/user.model.js';
const PASSWORD_HASH_SALT_ROUNDS = 10;
import bcrypt from 'bcryptjs';


router.post('/login',(req,res)=>{
    try {
        const {email, password} = req.body;
        const user = sample_users.find(
            user => user.email === email && user.password === password
        );
    
        if(user){
             res.send(generateTokenResponse(user));
             return;
        }
    
        res.status(BAD_REQUEST).send('Username or password is invalid');
    } catch (error) {
        console.log(error);
    }
})

router.post('/register',handler(async (req, res)=>{
    const {name, email, password, address} = req.body;

    const user = await UserModel.findOne({email});

    if(user){
        res.status(BAD_REQUEST).send('User already exists, please login!');
        return
    }

    const hashedPassword = await bcrypt.hash(
        password,
        PASSWORD_HASH_SALT_ROUNDS
    )

    const newUser = {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        address
    }

    const result = await UserModel.create(newUser);
    res.send(generateTokenResponse(result));
})
)


const generateTokenResponse = user =>{
    
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        'SomeRandomText',
        {
            expiresIn: '30d',
        }
    );

    return{
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
        name: user.name,
        address: user.address,
        token,
    }
}

export default router;