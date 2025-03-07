import User from "../user/user.model.js"

export const emailExists = async (email = "") => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`This email ${email} is already registered`)
    }
}

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`This username ${username} is already registered`)
    }
}

export const userExists = async (uid = " ") => {
    const existe = await User.findById(uid)
    console.log(existe)
    if(!existe){
        throw new Error('There is no user with the id Provided')
    }
}

export const adminRole = async (uid = "", { req }) => {
    if(!req.usuario || !req.usuario.role) {
        throw new Error("Role could not be verified")
    }

    const userModify = await User.findById(uid)
    if (!userModify) {
        throw new Error("Usuer not found")
    }

    if (req.usuario._id.toString() === uid) {
        return; 
    }

    if (userModify.role === "ADMIN_ROLE" && req.usuario.role === "ADMIN_ROLE") {
        throw new Error("You don't have permission to modify another admin")
    }
};

export const adminRoleDelete = async (uid = "", { req }) => {
    if(!req.usuario || !req.usuario.role) {
        throw new Error("User role could not be verified")
    }
    const userModify = await User.findById(uid)
    if (!userModify) {
        throw new Error("User not found")
    }
    if (req.usuario._id.toString() === uid) {
        return
    }
    if (userModify.role === "ADMIN_ROLE" && req.usuario.role === "ADMIN_ROLE") {
        throw new Error("You don't have permission to delete another admin")
    }
}

export const productNameExists = async (nameProduct = "") => {
    const existe = await Product.findOne({nameProduct})
    if(existe){
        throw new Error(`The product name ${nameProduct} is already registered`)
    }
}

export const userUpdateProfile = async (uid = "", { req }) => {
    try{   
        if (!req.usuario) {
            throw new Error("Usuario no autenticado")
        }
        const user = await User.findById(uid)
        if(!user) {
            throw new Error("User not found")
        }
        if (user._id.toString() !== req.usuario._id.toString()){
            throw new Error("You can't update this profile")
        }
    }catch(error){
        throw new Error(error.message)
    }
};




