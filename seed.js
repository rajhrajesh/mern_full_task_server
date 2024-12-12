import 'dotenv/config';
import { db } from "./libs/dbConnect.js";

const users = [
    {
        username: 'rajesh2201',
        email: 'rajesh2201@gmail.com',
        password: '@$&Fgffkfkfkdf',
        avatar: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        username: 'rajesh_p',
        email: 'rajesh_p@gmail.com',
        password: '@$&rajesh_pffkfkfkdf',
        avatar: 'https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    // {
    //     username: 'ra',
    //     email: 'rajesh_p@gmail.com',
    //     password: '@$&rajesh_pffkfkfkdf',
    //     avatar: 'https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk',
    //     createdAt: new Date().toISOString(),
    //     updatedAt: new Date().toISOString(),
    // },
]

const tasks = [
    {
        name: 'Read Atomic Habits',
        description: 'Finish reading Atomic Habits by James Clear',
        priority: 'not urgent',
        due: new Date().toISOString(),
        status: 'open',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        name: 'Learn MERN Stack',
        description: 'Learn MERN Stack and build a full-stack application with it',
        priority: 'urgent',
        due: new Date().toISOString(),
        status: 'open',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
]

try{
    let collection = await db.collection('users');
    console.log('[seed]', 'Seeding Users...');

    const result = await collection.insertMany(users);
    console.log(result.insertedIds);
    console.log('[seed]', 'Seeding Users Done');

    tasks[0].owner = result.insertedIds[0];
    tasks[1].owner = result.insertedIds[1];

    collection = await db.collection('tasks');
    console.log('[seed]', 'Seeding Tasks...');
    await collection.insertMany(tasks);
    console.log('[seed]', 'Seeding Tasks Done');
    console.log('[seed]', 'All Done');
}catch (err) {
    console.log('[seed]', 'Error: ', err);
    
}
process.exit();