from flask import Flask, jsonify, request
import yfinance as yf
from datetime import datetime
import pandas as pd

app = Flask(__name__)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/stock-data')
def get_stock_data():
    try:
        # Obtener parámetros de la solicitud
        symbol = request.args.get('symbol', 'VOO')
        start_date = request.args.get('start')
        end_date = request.args.get('end')

        # Validar fechas
        try:
            start = datetime.strptime(start_date, '%Y-%m-%d')
            end = datetime.strptime(end_date, '%Y-%m-%d')
        except ValueError:
            return jsonify({'error': 'Formato de fecha inválido'}), 400

        # Obtener datos de la acción
        stock = yf.Ticker(symbol)
        hist = stock.history(start=start_date, end=end_date)

        # Preparar datos para el gráfico
        dates = hist.index.strftime('%Y-%m-%d').tolist()
        prices = hist['Close'].round(2).tolist()

        return jsonify({
            'dates': dates,
            'prices': prices
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

import os

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)