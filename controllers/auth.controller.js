import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../libs/dbConnect.js';

const collection = await db.collection('users');

export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const query = {
            $or: [{ email }, { username }],
        };
        const existingUser = await collection.findOne(query);

        if (existingUser) {
            return next({ status: 442, message: 'Email or Username is already reagisterd.', });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            username, email, password: hashedPassword, avatar: 'https://eu.ui-avatars.com/api/?name=John+Doe&size=250',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }

        const {insertedId} = await collection.insertOne(user);
        const token = jwt.sign({id: insertedId}, process.env.AUTH_SECRET);
        const {password: pass, updatedAt, createdAt, ...rest} = user;
        res.cookie('token', token, {httpOnly: true, sameSite: 'None', secure: true, partitioned: true}).status(200).json(rest);
    } catch (error) {
        next({ status: 500, error })
    }


};

export const signin = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        const validUser = await collection.findOne({email});
        if (!validUser) {
            return next({status: 404, message: 'User not found!'});
        }
        
        const validPassword = await bcrypt.compare(password, validUser.password);
        if (!validPassword) {
            return next({status: 401, message: 'Wrong password!'});
        }
        const token = jwt.sign({id: validUser._id}, process.env.AUTH_SECRET);
        
        const {password: pass, updatedAt, createdAt, ...rest} = validUser;
        res.cookie('token', token, {httpOnly: true, sameSite: 'None', secure: true, partitioned: true}).status(200).json(rest);
    } catch (error) {
        next({status: 500, error})
    }
};

export const signOut = async (req, res, next) => {
    try {
        res.clearCookie('token');
        res.status(200).json({message: 'Sign out successful'});
    } catch (error) {
        next({status: 500});
    }
}
