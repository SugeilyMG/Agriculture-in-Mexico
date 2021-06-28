import numpy as np
from numpy.core.fromnumeric import reshape
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session, session
from sqlalchemy import create_engine, func

from config import DATABASE_URI

from flask import Flask, jsonify,  render_template, redirect

#################################################
# Database Setup
#################################################
app = Flask(__name__)
engine = sqlalchemy.create_engine(DATABASE_URI)


@app.route("/")
def home():
    # go to home page to scrape info
    return render_template("index.html")


@app.route("/visualizations")
def visualizations():
    # go to home page to scrape info
    return render_template("Agricultura_HTML.html")

@app.route("/clusters")
def clusters():
    # go to home page to scrape info
    return render_template("clusters.html")



@app.route("/mexican_states")
def perimeter():
    # go to home page to scrape info
    return render_template("mexican_states.html")




@app.route("/estadocrop")
def estadocrop():
    data = engine.execute(
        "SELECT estado, cultivo, SUM(valorproduccion) FROM agr2017 GROUP BY estado, cultivo;")
    all_data = []
    for record in data:
        data_dict = {}
        data_dict['estado'] = record[0]
        data_dict['cultivo'] = record[1]
        data_dict['sum'] = record[2]
        all_data.append(data_dict)
    return jsonify(all_data)


@app.route("/mapa")
def mapa():
    data = engine.execute(
        "SELECT estado, municipio, cultivo, SUM(valorproduccion), AVG(latitud), AVG(longitud), MAX(altitud) FROM agr2017 GROUP BY estado, municipio , cultivo;")
    all_data = []
    for record in data:
        data_dict = {}
        data_dict['estado'] = record[0]
        data_dict['municipio'] = record[1]
        data_dict['cultivo'] = record[2]
        data_dict['sum'] = record[3]
        data_dict['lat'] = record[4]
        data_dict['lng'] = record[5]
        data_dict['alt'] = record[6]
        all_data.append(data_dict)
    return jsonify(all_data)


@app.route("/clustering_map")
def clus_map():
    data = engine.execute(
        "SELECT latitud, longitud, cultivo, estado, clusters ,rendimiento  FROM clustering;")
    all_data = []
    for record in data:
        data_dict = {}
        data_dict['latitud'] = record[0]
        data_dict['longitud'] = record[1]
        data_dict['cultivo'] = record[2]
        data_dict['estado'] = record[3]
        data_dict['clusters'] = record[4]
        data_dict['rendimiento'] = record[5]
        all_data.append(data_dict)
    return jsonify(all_data)


if __name__ == '__main__':
    app.run(debug=True)
