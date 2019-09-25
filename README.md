# realtime-transport-dashboards
Serverless APIs for AWS to build and display public transportation real time data (Serverless application example)



## APIs

 - POST `/dashboard`: create a new dashboard
 - GET `/dashboard/{dashboard_id}`: get data for a dashboard
 - POST `/dashboard/{dashboard_id}/widget`: add a new widget
 - POST `/dashboard/{dashboard_id}/widget/{widget_id}`: edit a widget
 - DELETE `/dashboard/{dashboard_id}/widget/{widget_id}`: delete a widget
