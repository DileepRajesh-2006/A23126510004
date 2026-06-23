const getDepots = require("./services/depotService");
const getVehicles = require("./services/vehicleService");

async function test() {

    try {

        const depots = await getDepots();

        console.log("DEPOTS");
        console.log(depots);

        const vehicles = await getVehicles();

        console.log("VEHICLES");
        console.log(vehicles);

    } catch(err) {

        console.log(err.response?.data || err.message);

    }

}

test();