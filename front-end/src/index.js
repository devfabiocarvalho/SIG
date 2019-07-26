import $ from "jquery"
import Map from 'ol/Map.js'
import View from 'ol/View.js'
import GeoJSON from 'ol/format/GeoJSON.js'
import { fromLonLat } from 'ol/proj.js'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js'
import { OSM, Vector as VectorSource } from 'ol/source.js'
import { Fill, Stroke, Text, Style } from 'ol/style.js'
import converter from './utils/ajusteCoordenadaGeoJson'
var d3 = require("d3");

$(document).ready(function () {

    loadTipoIndicador();

    $('#indicador').change(() => {
        setIndicador($('#indicador').val())
    })
})

const loadTipoIndicador = () => {
    $.getJSON("http://sig-itv.herokuapp.com/api/tipoindicador", function (retorno) {
        var options = $("#indicador");
        $.each(retorno.data, function (index, data) {
            options.append(new Option(data.nome, data.id));
        });
    });
}

const setIndicador = (tipoIndicador) => {
    $.getJSON(`https://sig-itv.herokuapp.com/api/indicador/${tipoIndicador}`, function (retorno) {
        $.each(retorno.data, function (index, data) {
            const feature = vectorLayer.getSource().getFeatureById(data.municipio.geocodigo)
            setStyleFeature(feature, data.valor)
        });
    });
}

const setStyleFeature = (feature, indicador) => {
    var colorScale = d3.scaleLinear().domain([0, 0.5, 1]).range(["green", "yellow", "red"]);
    const color = colorScale(indicador)

    feature.setStyle(
        new Style({
            stroke: new Stroke({
                color: '#000',
                width: 0.8
            }),
            fill: new Fill({
                color
            }),
            text: new Text({
                overflow: true,
                font: '10px Calibri,sans-serif',
                textAlign: 'top',
                fill: new Fill({
                    color: '#000'
                }),
                stroke: new Stroke({
                    color: '#000',
                    width: 0.3
                }),
                text: `${feature.values_.NOME} - ${feature.values_.UF}`
            })
        })
    )
}

var styles = {
    'MultiPolygon': new Style({
        stroke: new Stroke({
            color: 'black',
            width: 0.5
        }),
        fill: new Fill({
            color: 'rgba(255, 255, 0, 0.1)'
        }),
        text: new Text({
            overflow: true,
            font: '10px Calibri,sans-serif',
            textAlign: 'top',
            fill: new Fill({
                color: '#000'
            }),
            stroke: new Stroke({
                color: '#000',
                width: 0.3
            })
        })
    })
};

var styleFunction = function (feature) {
    let style = styles[feature.getGeometry().getType()];
    style.getText().text_ = `${feature.get('NOME')} - ${feature.get('UF')}`
    return style;
};

var vectorSource = new VectorSource({
    // url: 'https://openlayers.org/en/v4.6.5/examples/data/geojson/countries.geojson',
    //format: new GeoJSON()

    // features: (new GeoJSON()).readFeatures(require('./municipios').municipios)
    features: (new GeoJSON()).readFeatures(converter())
});

var vectorLayer = new VectorLayer({
    source: vectorSource,
    style: styleFunction
});

var map = new Map({
    target: 'map',
    layers: [
        // new TileLayer({
        // source: new OSM()
        // }),
        vectorLayer
    ],
    view: new View({
        center: fromLonLat([-47.135133, -5.14299897]),
        zoom: 8
    })
});