# realtime-transport-dashboards

[![Build Status](https://dev.azure.com/loige/loige/_apis/build/status/lmammino.realtime-transport-dashboards?branchName=master)](https://dev.azure.com/loige/loige/_build/latest?definitionId=3&branchName=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Serverless APIs for AWS to build and display Irish public transportation real time data.

This is a sample serverless application that can be used for workshops or other educational purposes.

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

 - POST `/dashboard`: create a new dashboard
 - GET `/dashboard/{dashboard_id}`: get data for a dashboard
 - POST `/dashboard/{dashboard_id}/widget`: add a new widget
 - POST `/dashboard/{dashboard_id}/widget/{widget_id}`: edit a widget
 - DELETE `/dashboard/{dashboard_id}/widget/{widget_id}`: delete a widget


## Contributing

Everyone is very welcome to contribute to this project. You can contribute just by submitting bugs or
suggesting improvements by [opening an issue on GitHub](https://github.com/lmammino/realtime-transport-dashboards/issues) or [PRs](https://github.com/lmammino/realtime-transport-dashboards/pulls).


## License

Licensed under [MIT License](LICENSE). © Luciano Mammino.
