require("dotenv").config();

const axios = require("axios");

async function getDepots() {

    const response = await axios.get(
        "http://4.224.186.213/evaluation-service/depots",
        {
            headers: {
                Authorization:
                `Bearer ${process.env.ACCESS_TOKEN}`
            }
        }
    );

    return response.data;
}

module.exports = getDepots;