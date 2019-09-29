# realtime-transport-dashboards

[![Build Status](https://dev.azure.com/loige/loige/_apis/build/status/lmammino.realtime-transport-dashboards?branchName=master)](https://dev.azure.com/loige/loige/_build/latest?definitionId=3&branchName=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Serverless APIs for AWS to build and display Irish public transportation real time data.

This is a sample serverless application that can be used for workshops or other educational purposes.


The application allows you to create **dashboards**. Every dashboard can contain 0 or more **widgets**. A widget can display real time information about a specific Dublin Bus stop, a LUAS stop or a Irish Rail station.

The application offers [APIs](#apis) to create, edit and visualize dashboards and widgets.


## Getting started

Before starting make sure you have the [AWS CLI installed](https://aws.amazon.com/cli/) and properly [configured](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html).

You will also need [Node.js](https://nodejs.org/en/) version 8+.

Now clone this repository in your local workspace and run the following command to install the necessary dependencies:

```bash
npm install
```

Now you can deploy the service to your local AWS account with the following command:

```bash
npm run deploy
```

If everything went fine you should see the URL for the deployed API endpoints.


## APIs

Once you deploy the functions you will be able to access the following APIS:

 - [createDashboard](#createDashboard): creates a new dashboard
 - [updateDashboard](#updateDashboard): updates an existing dashboard
 - [deleteDashboard](#deleteDashboard): deletes an existing dashboard
 - [getDashboard](#getDashboard): get data for a dashboard
 - [addWidget](#addWidget): adds a new widget to an existing dashboard
 - [updateWidget](#updateWidget): updates an existing widget
 - [deleteWidget](#deleteWidget): deletes an existing widget from a dashboard

To run the examples, export your API endpoint prefix as `PREFIX`, for instance:

```bash
PREFIX="https://<api_gate_way_id>.execute-api.eu-west-1.amazonaws.com/prod"
```

Make sure to replace `<api_gate_way_id>` with you actual deployment id.

<a id="createDashboard"></a>
---

### ⚡️ createDashboard

Creates a new dashboard.


#### Endpoint

```
POST `/dashboard`
```


#### Payload

```json
{
  "name": "<string>"
}
```

#### Example

```bash
curl -XPOST -H "Content-Type: application/json" -d '{"name":"my-dashboard"}' ${PREFIX}/dashboard
```

Example Output:

```json
{
  "id":"3450345a-684d-4456-bc68-0503d12009c2",
  "name":"my-dashboard",
  "createdAt":"2019-09-29T09:06:17.698Z",
  "updatedAt":"2019-09-29T09:06:17.698Z",
  "widgets":[]
}
```


<a id="updateDashboard"></a>
---

### ⚡️ updateDashboard

Updates an existing dashboard. It basically allows you to change a dashboard name.


#### Endpoint

```
POST `/dashboard/{dashboard_id}`
```


#### Payload

```json
{
  "name": "<string>"
}
```

#### Example

```bash
curl -XPOST -H "Content-Type: application/json" -d '{"name":"new-name"}' ${PREFIX}/dashboard/3450345a-684d-4456-bc68-0503d12009c2
```

Example Output:

```json
{
  "createdAt":"2019-09-29T09:06:17.698Z",
  "widgets":[],
  "id":"3450345a-684d-4456-bc68-0503d12009c2",
  "name":"new-name",
  "updatedAt":"2019-09-29T10:05:33.984Z"
}
```


<a id="deleteDashboard"></a>
---

### ⚡️ deleteDashboard

DELETE `/dashboard/{dashboard_id}`: deletes an existing dashboard

**TODO**


<a id="getDashboard"></a>
---

### ⚡️ getDashboard

GET `/dashboard/{dashboard_id}`: get data for a dashboard


<a id="addWidget"></a>
---

### ⚡️ addWidget

POST `/dashboard/{dashboard_id}/widget`: adds a new widget to an existing dashboard


<a id="updateWidget"></a>
---

### ⚡️ updateWidget

POST `/dashboard/{dashboard_id}/widget/{widget_id}`: updates an existing widget


<a id="deleteWidget"></a>
---

### ⚡️ deleteWidget

DELETE `/dashboard/{dashboard_id}/widget/{widget_id}`: deletes an existing widget from a dashboard


## Cleanup

If you want to remove all the resources created by this project you can simply run:

```bash
npm run cleanup
```


## Utilities

This repository contains a number of utility scripts to get information for the supported realtime services:

 - **Get all Dublin Bus stops**: `node utils/allBusStops.js`
 - **Get all Irish Rail stations**: `node utils/allRailStations.js`
 - **Get all Luas stops**: `node utils/allLuasStops.js`


## Contributing

Everyone is very welcome to contribute to this project. You can contribute just by submitting bugs or
suggesting improvements by [opening an issue on GitHub](https://github.com/lmammino/realtime-transport-dashboards/issues) or [PRs](https://github.com/lmammino/realtime-transport-dashboards/pulls).


## License

Licensed under [MIT License](LICENSE). © Luciano Mammino.
