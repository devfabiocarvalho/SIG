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

const serverUrl = "http://sig-itv.herokuapp.com"
// const serverUrl = "http://localhost:8080"

$(document).ready(function () {

    loadTipoIndicador();

    $('#indicador').change(() => {
        setIndicador($('#indicador').val())
    })
})

const loadTipoIndicador = () => {
    $.getJSON(`${serverUrl}/api/tipoindicador`, function (retorno) {
        var options = $("#indicador");
        $.each(retorno.data, function (index, data) {
            options.append(new Option(data.nome, data.id));
        });
    });
}

const setIndicador = (tipoIndicador) => {
    { tipoIndicador == 0 ?
        
        vectorLayer.getSource().getFeatures().forEach(f => {
            f.setStyle(getStyles(f, 'rgba(255, 255, 0, 0.1)'))
        })
        
        :

        $.getJSON(`${serverUrl}/api/indicador/${tipoIndicador}`, function (retorno) {
            $.each(retorno.data, function (index, data) {
                const feature = vectorLayer.getSource().getFeatureById(data.municipio.geocodigo)
                var colorScale = d3.scaleLinear().domain([0, 0.5, 1]).range(["green", "yellow", "red"]);
                feature.setStyle(getStyles(feature, colorScale(data.valor)))
            });
        });
    }
}

const getStyles = (feature, color) => {
    return new Style({
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
}


var vectorSource = new VectorSource({
    // features: (new GeoJSON()).readFeatures(require('./municipios').municipios)
    features: (new GeoJSON()).readFeatures(converter())
});

var styleFunction = function (feature) {
    return getStyles(feature, 'rgba(255, 255, 0, 0.1)');
};

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