from flask import Flask, jsonify, request
import yfinance as yf
import pandas as pd
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)  # ✅ Habilitar CORS para permitir peticiones desde el frontend

@app.route('/api/stock-data', methods=['GET'])
def get_stock_data():
    try:
        symbol = request.args.get('symbol', 'VOO')
        start_date = request.args.get('start')
        end_date = request.args.get('end')

        if not symbol or not start_date or not end_date:
            return jsonify({'error': 'Faltan parámetros'}), 400

        stock = yf.Ticker(symbol)
        hist = stock.history(start=start_date, end=end_date)

        if hist.empty:
            return jsonify({'error': 'No hay datos para la fecha seleccionada'}), 404

        dates = hist.index.strftime('%Y-%m-%d').tolist()
        prices = hist['Close'].round(2).tolist()

        return jsonify({'dates': dates, 'prices': prices})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 10000))  # ✅ Configurar el puerto dinámico para Render
    app.run(host='0.0.0.0', port=port)
