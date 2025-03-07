var dataset = ee.ImageCollection('USDA/NAIP/DOQQ')
                  .filter(ee.Filter.date('2023-05-01', '2023-12-29')).median();

var trueColor = dataset.select(['R', 'G', 'B']);
var trueColorVis = {
  min: 0,
  max: 255,
};
Map.setCenter(-103.80140, 40.21729, 13);
Map.addLayer(trueColor, trueColorVis, 'True Color');

var geometry =  ee.Geometry.Polygon(
        [[[-103.91795807495117, 40.24350109540286],
          [-103.91795807495117, 40.1864790020018],
          [-103.68449860229492, 40.1864790020018],
          [-103.68449860229492, 40.24350109540286]]], null, false);

Export.image.toDrive({
  image: dataset,
  description: 'imageToDriveExample_USDA_1',
  scale: 6,
  region: geometry,
  fileFormat: 'GeoTIFF',
  formatOptions: {
    cloudOptimized: true
  },
  'crs': 'EPSG:3857'
});

