from flask import Flask, request, jsonify
from flask_cors import CORS
from copy import deepcopy

from topsis_app.comparison_matrix import ComparisonMatrix
from topsis_app.topsis_algorithm import TopsisCalculator


PORT_NUMBER = 21370

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

    features_names = []
    criteria_impact = []
    for feature in features:
        if feature['isDesc']:
            criteria_impact.append("-")
        else:
            criteria_impact.append("+")
        features_names.append(feature['name'])
        

    print("PARAMS")
    print(f"products: {alternatives}")
    print(f"categories: {features_names}")
    print(f"weights: {weights}")
    print(f"criteria_impact: {criteria_impact}")
    print(f"matrix")
    print(matrix)

    comparison_matrix = ComparisonMatrix(
        products=alternatives,
        categories=features_names,
        data_matrix=matrix,
        criteria_name="Model",
    )

    topsis = TopsisCalculator(
        comparison_matrix=deepcopy(comparison_matrix),
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
        'n_dist': n_dist,
        'comparison_matrix': comparison_matrix.get_visualisation_matrix(),
        'topsis_matrix': topsis.comparison_matrix.get_visualisation_matrix(3)
    })


if __name__=='__main__':
    app.run(debug=True, port=PORT_NUMBER)
