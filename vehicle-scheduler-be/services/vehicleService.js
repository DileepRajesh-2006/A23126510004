require("dotenv").config();

const axios = require("axios");

async function getVehicles() {

    const response = await axios.get(
        "http://4.224.186.213/evaluation-service/vehicles",
        {
            headers: {
                Authorization:
                `Bearer ${process.env.ACCESS_TOKEN}`
            }
        }
    );

    return response.data;
}

module.exports = getVehicles;