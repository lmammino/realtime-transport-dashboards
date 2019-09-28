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

 - [createDashboard](#createdashboard): creates a new dashboard
 - [updateDashboard](#updatedashboard): updates an existing dashboard
 - [deleteDashboard](#deletedashboard): deletes an existing dashboard
 - [getDashboard](#getdashboard): get data for a dashboard
 - [addWidget](#addwidget): adds a new widget to an existing dashboard
 - [updateWidget](#updatewidget): updates an existing widget
 - [deleteWidget](#deleteWidget): deletes an existing widget from a dashboard


### createDashboard

POST `/dashboard`: creates a new dashboard


### updateDashboard

POST `/dashboard/{dashboard_id}`: updates an existing dashboard

**TODO**


## deleteDashboard

DELETE `/dashboard/{dashboard_id}`: deletes an existing dashboard

**TODO**


### getDashboard

GET `/dashboard/{dashboard_id}`: get data for a dashboard


### addWidget

POST `/dashboard/{dashboard_id}/widget`: adds a new widget to an existing dashboard


### updateWidget

POST `/dashboard/{dashboard_id}/widget/{widget_id}`: updates an existing widget


### deleteWidget

DELETE `/dashboard/{dashboard_id}/widget/{widget_id}`: deletes an existing widget from a dashboard


## Cleanup

If you want to remove all the resources created by this project you can simply run:

```bash
npm run cleanup
```


## Contributing

Everyone is very welcome to contribute to this project. You can contribute just by submitting bugs or
suggesting improvements by [opening an issue on GitHub](https://github.com/lmammino/realtime-transport-dashboards/issues) or [PRs](https://github.com/lmammino/realtime-transport-dashboards/pulls).


## License

Licensed under [MIT License](LICENSE). © Luciano Mammino.
