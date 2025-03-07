import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "StoreMarkUp Api",
            version: "1.0.0",
            description: "Api para ventas en Liea",
            contact:{
                name: "Ethan Juarez",
                email: "ejuarez-2020269@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3001/storeMarkUpApi/v1"
            }
        ]
    },
    apis:[

    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}