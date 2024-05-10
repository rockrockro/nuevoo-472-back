import express  from "express";
import dotenv from "dotenv"
import cors from 'cors'
import contectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";


const app = express();
app.use(express.json())

dotenv.config()

contectarDB()

//Configurar Cors 
const whitelist = [process.env.FRONTEND_URL || "https://www.pagos4-72.com", "http://localhost:5173", "www.pagos4-72.com", "https://pagos4-72.com/", "https://cuatro-72implementadonuevo.onrender.com/api/usuarios"];

const corsOptions = {
    origin: function (origin, callback) {
        if( whitelist.includes(origin)) {
            //Puede consultar la API 
            callback(null, true)
        } else {
            //No está permitido
          //  callback(new Error('Error de Cors'))
            callback(null, true)
        }
    }
}

app.use(cors(corsOptions))

//Routing
app.use("/API/usuarios", usuarioRoutes)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`server iniciado en ${PORT}`);
});