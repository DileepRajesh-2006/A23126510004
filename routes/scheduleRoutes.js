const express = require("express");

const router = express.Router();

const getDepots =
require("../services/depotService");

const getVehicles =
require("../services/vehicleService");

const optimizeVehicleScheduling =
require("../services/knapsackService");

router.get(
    "/schedule/:depotId",

    async (req,res)=>{

        try{

            const depotId =
            Number(req.params.depotId);

            const depots =
            await getDepots();
             console.log(depots);
               console.log("Depot ID:", depotId);
            const depot =
            depots.depots.find(
                d => d.ID === depotId
            );

            if(!depot){

                return res.status(404)
                .json({
                    message:
                    "Depot not found"
                });

            }

            const vehicles =
            await getVehicles();

            const result =
            optimizeVehicleScheduling(
                depot.MechanicHours,
                vehicles.vehicles
            );

            res.json({

                depotId:
                depot.ID,

                mechanicHours:
                depot.MechanicHours,

                maxImpact:
                result.maxImpact,

                selectedTaskIds:

                result.selectedTasks.map(
                    task =>
                    task.TaskID
                )

            });

        }

        catch(error){

            res.status(500)
            .json({
                message:
                error.message
            });

        }

    }
);

module.exports = router;