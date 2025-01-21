from flask import Flask, request, jsonify
from flask_cors import CORS

from topsis_app.comparison_matrix import ComparisonMatrix
from topsis_app.topsis_algorithm import TopsisCalculator


PORT_NUMBER = 2137

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
    for feature in features:
        if feature['isDesc']:
            criteria_impact.append("-")
        else:
            criteria_impact.append("+")

    print("PARAMS")
    print(f"products: {alternatives}")
    print(f"categories: {features}")
    print(f"weights: {weights}")
    print(f"criteria_impact: {criteria_impact}")
    print(f"matrix")
    print(matrix)

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
    
    zipped = zip(alternatives, score)
    ranking = []

    for element in zipped:
        ranking.append({
            'alternative': element[0],
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
