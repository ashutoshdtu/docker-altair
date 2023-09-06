const express = require('express');
const { altairExpress } = require('@appwrite.io/altair-express-middleware');

const app = express();

// Get BASE_PATH from environment variables or default to '/'
const basePath = process.env.BASE_PATH || '/';

// Mount your Altair GraphQL client
app.use(basePath, altairExpress({
    endpointURL: process.env.SERVER_URL,
    initialHeaders: {
        "X-Appwrite-Project": "",
    },
    initialQuery: `query listContinents {
        localeListContinents {
            total
            continents { 
                name
                code
            }
        }
    }`,
    initialSettings: {
        "alert.disableWarnings": true,
        "schema.reloadOnStart": true,
        "request.withCredentials": true,
    }
}));

app.listen(3000, () => {
    console.log("GraphQL Explorer listening on port 3000!");
    console.log("Endpoint url: " + process.env.SERVER_URL);
    console.log("Base path: " + basePath);
});
