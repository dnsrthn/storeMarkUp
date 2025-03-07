import User from "./user.model.js"
import { hash, verify } from "argon2";
import fs from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const updateRole = async (req, res) => {
    try{
        const { uid } = req.params;
        const { role } = req.body;
        const updateRole = await User.findByIdAndUpdate(uid, { role }, {new: true})

        res.status(200).json({
            success: true,  message: 'Role has been udated ', updateRole,
        })
    }catch(error){
        return res.status(500).json({
            success: false, message: 'Error while updating Role', error: error.message
        })
    }
}

export const updateUser = async(req, res) => {
    try{
        const {...data} = req.body
        const { uid } = req.params
        const user = await User.findByIdAndUpdate(uid, data, { new: true })

        res.status(200).json({
            success: true, message: 'User has been updated',user,
        })    
    }catch(error){
        return res.status(500).json({
            success: false, message: 'An error courres while while updating user', error: error.message
        })
    }
}

export const updateUserProfile = async(req, res) => {
    try{
        const { username, ...data} = req.body
        const { uid } = req.params

        if (req.usuario._id.toString() !== uid) {
            return res.status(403).json({
                success: false, message: 'You are not authorized to update this profile'
            })
        }

        if (username) {
            const existingUser = await User.findOne({ username })
            if (existingUser && existingUser._id.toString() !== uid) {
                return res.status(400).json({
                    success: false,
                    message: "Username already exists"
                })
            }
            data.username = username
        }

        const user = await User.findByIdAndUpdate(uid, data, { new: true })

        res.status(200).json({
            success: true, message: 'Update Profile', user,
        })    
    }catch(error){
        return res.status(500).json({
            success: false,  message: 'An error ocurred while updating profile', error: error.message
        })
    }
}

export const deleteUser = async(req, res) => {
    try{
        const { uid } = req.params
        const user = await User.findByIdAndDelete( uid )

        if (!user) {
            return res.status(404).json({
                success: false, message: "User not found",
            })
        }

        res.status(200).json({
            success: true, message: 'DUser has been succesfully deleted', user,
        })   
    }catch(error){
        return res.status(500).json({
            success: false, message: 'An error ocurred while deleting the user', error: error.message
        })
    }
}

export const deleteUserProfile = async(req, res) => {
    try{
        const { uid } = req.params
        const { deleting } = req.body

        if (req.usuario._id.toString() !== uid) {
            return res.status(403).json({
                success: false, message: 'You are not authorized to delete this profile'
            })
        }
        if (!deleting || deleting !== 'DELETE_PROFILE') {
            return res.status(400).json({
                success: false,  message: 'You must confirm the deletion by providing the correct confirmation code.'
            })
        }
        const user = await User.findByIdAndDelete( uid )
        if (!user) {
            return res.status(404).json({
                success: false, message: "User not found",
            })
        }

        res.status(200).json({
                success: true, message: 'User deleted',  user,
            })   
    }catch(error){
        return res.status(500).json({
            success: false,  message: 'An error ocurred while deleting user', error: error.message
        })
    }
}

export const updatePassword = async (req, res) => {
    try {
        const { uid } = req.params;
        const { oldPassword, newPassword } = req.body

        if (req.usuario._id.toString() !== uid) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to delete this user',
            });
        }

        const user = await User.findById(uid)
        if (!user) {
            return res.status(404).json({
                success: false,  message: 'User not found'
            })
        }

        const concurrentPassword = await verify(user.password, oldPassword)
        if(!concurrentPassword) {
            return res.status(400).json({
                success: false,  message: 'The current password is incorrect'
            })
        }
        const oldAndNewPassword = await verify(user.password, newPassword)
        if (oldAndNewPassword) {
            return res.status(400).json({
                success: false,  message: 'The new password cannot be the same as the previous one'
            })
        }

        const encryptedPassword = await hash(newPassword);
        await User.findByIdAndUpdate(uid, { password: encryptedPassword }, { new: true })

        return res.status(200).json({
            success: true,  message: "Contraseña actualizada",
        })
    } catch (err) {
        return res.status(500).json({
            success: false, message: "An error occurred while updating the password",  error: err.message
        })
    }
}

export const updateProfilePicture = async (req, res) => {
    try {
        const { uid } = req.params
        let newProfilePicture = req.file ? req.file.filename : null

        if (req.usuario._id.toString() !== uid) {
            return res.status(403).json({
                success: false, message: 'Profile picture can only be updated by the user',
            })
        }
        if (!newProfilePicture) {
            return res.status(400).json({
                success: false,  messagge: 'Profile picture was not provided',
            })
        }
        const user = await User.findById(uid)
        if (user.profilePicture) {
            const oldProfilePicturePath = join(__dirname, "../../public/uploads/profile-pictures", user.profilePicture)
            await fs.unlink(oldProfilePicturePath)
        }

        user.profilePicture = newProfilePicture
        await user.save()
        res.status(200).json({
            success: true, messagge: 'Profile pictiure updated',  user,
        })
    } catch (err) {
        res.status(500).json({
            success: false,  messagge: 'Anerror ocurred while updating picture',  error: err.message
        })
    }
}