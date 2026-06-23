const getDepots =
require("./services/depotService");

const getVehicles =
require("./services/vehicleService");

const optimizeVehicleScheduling =
require("./services/knapsackService");

async function test(){

    const depots =
    await getDepots();

    const vehicles =
    await getVehicles();

    const depot =
    depots.depots[0];

    const result =
    optimizeVehicleScheduling(
        depot.MechanicHours,
        vehicles.vehicles
    );

    console.log(result);

}

test();