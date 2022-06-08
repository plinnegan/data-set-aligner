# Data Set Aligner

The web app aims to simplify the process of aligning similar data sets between servers as often happens when an implementation has a main server and multiple country servers. In this case the configuration on the country servers may differ slightly from the central instance, but they still wish to align the two systems to facilitate data transfer.

This application allows for an interactive way of aligning data sets and data element disaggregations, supporting many to one mappings as well as an auto suggested mapping feature implementing fusejs so that slight differences in DE and COC names can still be aligned automatically. This auto matching has a tunable threshold on what should be considered a match to support mapping as many items as possible without auto mapping items incorrectly.

The app supports saving these mappings to the data store so they can be used as input for data transfer scripts.

## Required setup

The application uses personal access tokens to allow connection to other servers, so to connect to server B from server A the following configuration is required.

- Server B enables PAT in dhis.conf via the property: enable.api_token.authentication = on
- Server B adds server A url to the CORS whiltelist in the System Settings app
- Server B created a PAT with metadata view only access to the required data sets, data elements and category which need to be mapped

If this setup is completed on multiple servers, then server A can be used as the central server to create and manage the mappings to the other servers.

### Future aims

- View, edit and load existing mappings
- Use the mappings to generate indicators which export the data in the mapped form for import to facilitate the data transfer
- Customisable many to one aggregation types


This project was bootstrapped with [DHIS2 Application Platform](https://github.com/dhis2/app-platform).

