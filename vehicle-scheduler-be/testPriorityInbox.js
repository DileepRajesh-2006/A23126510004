import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

const CATEGORY_WEIGHTS = {
    'Placement': 3,
    'Result': 2,
    'Event': 1
};

async function processPriorityInbox(limitN = 5) {
    try {
        const token = process.env.ACCESS_TOKEN;
        if (!token) {
            console.error("Configuration Error: ACCESS_TOKEN is missing from your .env file.");
            return;
        }

        const response = await axios.get('http://4.224.186.213/evaluation-service/notifications', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const incomingAlerts = response.data.notifications || response.data;

        const processedInbox = incomingAlerts.sort((a, b) => {
            const weightA = CATEGORY_WEIGHTS[a.Type] || 0;
            const weightB = CATEGORY_WEIGHTS[b.Type] || 0;

            if (weightB !== weightA) {
                return weightB - weightA; 
            return new Date(b.Timestamp) - new Date(a.Timestamp);
        });

        console.log(`\n=== TOP ${limitN} LIVE PRIORITY NOTIFICATIONS ===`);
        console.log(JSON.stringify(processedInbox.slice(0, limitN), null, 2));

    } catch (error) {
        console.error("Execution failed:", error.response ? error.response.data : error.message);
    }
}

processPriorityInbox(5);