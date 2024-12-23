import jwt from 'jsonwebtoken'
import config from "../helpers/configEnv";
const generateToken = async (email) => {
    const token = await jwt.sign({ email },
        process.env.TOKEN_SECRET,
        {
            expiresIn: "24h"
        }

    )
    return token;
}

export default generateToken;