# arcgis2geojson

Tools to convert ArcGIS JSON geometries to GeoJSON geometries and vice versa.
Forked from [Esri/arcgis-to-geojson-utils](https://github.com/Esri/arcgis-to-geojson-utils)

_Added with a Build Step so that it is available for IE as well_

## Install

```
npm i arcgis2geojson --save
```

## Usage

```js
var arcgisToGeoJSON = require('arcgis2geojson').arcgisToGeoJSON;
var geojsonToArcGIS = require('arcgis2geojson').geojsonToArcGIS;

// parse ArcGIS JSON, convert it to GeoJSON
var geojson = arcgisToGeoJSON({
    "x":-122.6764,
    "y":45.5165,
    "spatialReference": {
      "wkid": 4326
    }
  });

// take GeoJSON and convert it to ArcGIS JSON
var arcgis = geojsonToArcGIS({
  "type": "Point",
  "coordinates": [45.5165, -122.6764]
});
```

```js
// this way works too
var esriUtils = require('arcgis2geojson');

esriUtils.geojsonToArcGIS(/* ... */);
esriUtils.arcgisToGeoJSON(/* ... */);
```

Please note that this repository is up to date with latest ArcGIS Server version at the time of fork please look up original repository for latest updates.

Forked from [Esri/arcgis-to-geojson-utils](https://github.com/Esri/arcgis-to-geojson-utils)

Built with [⚔️ Crossgear](https://github.com/rajatsharma305/crossgear)
