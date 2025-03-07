'use strict'

import mongoose from "mongoose"

export const dbConnection = async () => {
    try {
        mongoose.connection.on('error', () => {
            console.log('Mongo Could not connect to Data Base')
            mongoose.disconnect()
        })
        mongoose.connection.on('connecting', () =>{
            console.log('Mongo is trying the connection')
        })
        mongoose.connection.on('connected', () =>{
            console.log('Mongois connected to Data Base')
        })
        mongoose.connection.on('open', () =>{
            console.log('Mongos connection is open ')
        })
        mongoose.connection.on('reconnected', () => {
            console.log('Mongo reconected to Data Base')
        })
        mongoose.connection.on('disconnected', () => {
            console.log('Mongo has disconnected from Data Base')
        })

        await mongoose.connect(process.env.URI_MONGO,{
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 45
        })
    } catch (error) {
        console.log(`Data Base connection has failed: ${error}`)
    }
}