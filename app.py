from flask import Flask, jsonify, request
import yfinance as yf
import pandas as pd
from flask_cors import CORS  # Importar CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Habilitar CORS

@app.route('/api/stock-data', methods=['GET'])
def get_stock_data():
    try:
        symbol = request.args.get('symbol', 'VOO')
        start_date = request.args.get('start')
        end_date = request.args.get('end')

        # ✅ Validar formato de fechas
        try:
            start = datetime.strptime(start_date, '%Y-%m-%d')
            end = datetime.strptime(end_date, '%Y-%m-%d')
        except ValueError:
            return jsonify({'error': 'Formato de fecha inválido, debe ser YYYY-MM-DD'}), 400

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
    app.run(host='0.0.0.0', port=5000)
