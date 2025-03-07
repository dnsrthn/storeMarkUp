import {Schema, model} from 'mongoose'
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - surname
 *         - username
 *         - email
 *         - password
 *         - phone
 *         - role
 *       properties:
 *         name:
 *           type: string
 *           description: The user's first name
 *           maxLength: 25
 *         surname:
 *           type: string
 *           description: The user's surname
 *           maxLength: 25
 *         username:
 *           type: string
 *           description: The user's unique username
 *           maxLength: 25
 *         email:
 *           type: string
 *           description: The user's unique email address
 *         password:
 *           type: string
 *           description: The user's password
 *         phone:
 *           type: string
 *           description: The user's phone number
 *           minLength: 8
 *           maxLength: 8
 *         role:
 *           type: string
 *           description: The user's role
 *           enum: ['ADMIN_ROLE', 'CLIENT_ROLE']
 *           default: 'user'
 *         status:
 *           type: boolean
 *           description: The user's status
 *           default: true
 *         profilePicture:
 *           type: string
 *           description: The user's profile picture
 *           default: 'default.jpg'
 *       example:
 *         name: John
 *         surname: Doe
 *         username: johndoe
 *         email: johndoe@example.com
 *         password: password123
 *         phone: '12345678'
 *         role: CLIENT_ROLE
 *         status: true
 *         profilePicture: 'default.jpg'
 */
const userSchema = Schema({
    name:{
        type: String,
        required: [true, 'Please fill Name Field'],
        maxLength: [25, 'Name can not exceed 25 characters']
    }
    ,
    surname: {
        type: String,
        required: [true, 'Please fill Surname Field'],
        maxLength: [25, 'Surname can not exceed 25 characters']
    },
    username: {
        type: String,
        required: [true, 'Please fill Username Field'],
        unique: true,
        maxLength: [25, 'Username can not exceed 25 characters']
    },
    email: {
        type: String,
        required: [true, 'Please fill Email Field'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please fill Password Field']
    },
    phone: {
        type: String,
        required: [true, 'Please fill Phone Field'],
        minLength: 8,
        maxLength: 8,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'CLIENT_ROLE'],
        default: 'user'
    },
    status: {
        type: Boolean,
        default: true
    },
    profilePicture: {
        type: String,
        default: 'default.jpg'
    }
},

{
    versionKey: false,
    timeStamps: true
})

userSchema.methods.toJSON = function(){
    const {password, _id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}

export default model('User', userSchema)