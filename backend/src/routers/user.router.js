import {Router} from 'express';
import { sample_users } from '../data.js';
const router = Router();
import { BAD_REQUEST } from '../constants/httpStatus.js';
import jwt from 'jsonwebtoken';



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