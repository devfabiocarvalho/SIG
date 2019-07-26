// import $ from "jquery";
import { municipios } from '../data/municipios'
import { fromLonLat } from 'ol/proj.js';

// $.get("./municipios.json", function(json) {
//     console.log(json); // this will show the info it in firebug console
// });

export default function converter() {
    var features = []
    municipios.features.forEach((f, index) => {
        const coordinates = f.geometry.coordinates[0][0].map(c => {
            return fromLonLat(c);
        });

        features.push({
            id: f.properties.GEOCODIGO,
            type: 'Feature',
            geometry: {
                type: f.geometry.type,
                coordinates: [[coordinates]]
            },
            properties: f.properties
        })
    });

    var geojson = {
        'type': 'FeatureCollection',
        'crs': {
            'type': 'name',
            'properties': {
                'name': 'EPSG:3857'
            }
        },
        features
        // 'features': [{
        //     'type': 'Feature',
        //     'geometry': {
        //         'type': 'MultiPolygon',
        //         'coordinates': [newCoordenadas]
        //     }
        // }]
    }

    return geojson
}