from flask import Flask, request, jsonify
from flask_cors import CORS

from topsis_app.comparison_matrix import ComparisonMatrix
from topsis_app.topsis_algorithm import TopsisCalculator


PORT_NUMBER = 3001

app = Flask(__name__)
CORS(app)


features = []
alternatives = []
matrix = []
weights = []



@app.post('/sendData')
def get_data():
    global features, alternatives, matrix, weights

    data = request.get_json()
    features = data.get('features')
    alternatives = data.get('alternatives')
    matrix = data.get('matrix')
    weights = data.get('weights')

    criteria_impact = []
    for _, is_desc in features:
        if is_desc:
            criteria_impact.append("-")
        else:
            criteria_impact.append("+")

    comparison_matrix = ComparisonMatrix(
        products=alternatives,
        categories=features,
        data_matrix=matrix,
        criteria_name="Model",
    )

    topsis = TopsisCalculator(
        comparison_matrix=comparison_matrix,
        weight_matrix=weights,
        criteria_impact=criteria_impact,
    )
    topsis.normalize_data_matrix()

    p_dist, n_dist = topsis.calculate_distances()
    score = topsis.calculate_rank()
    
    zipped = zip(features, score)
    ranking = []

    for element in zipped:
        ranking.append({
            'feature_name': element[0]['name'],
            'score': round(element[1] * 1000) / 1000
        })

    ranking.sort(key=lambda x: x['score'], reverse=True)
    print(f"Ranking: {ranking}")

    return jsonify({
        'status': 'success',
        'ranking': ranking,
        'p_dist': p_dist,
        'n_dist': n_dist
    })


if __name__=='__main__':
    app.run(debug=True, port=PORT_NUMBER)
