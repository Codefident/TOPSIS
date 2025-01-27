from topsis_app.comparison_matrix import ComparisonMatrix
from topsis_app.topsis_algorithm import TopsisCalculator


def main() -> None:
    products = ["A", "B", "C", "D", "E"]
    categories = ["RAM", "Memory", "DisplaySize", "Battery", "Price"]
    comparison_data = [
        [4, 128, 6.5, 3500, 15000],
        [6, 64, 6.4, 3800, 16000],
        [6, 128, 6.8, 4200, 19000],
        [8, 256, 7, 5000, 25000],
        [3, 64, 6.2, 4000, 14000],
    ]

    weights = [1.0, 1.0, 1.0, 1.0, 1.0]

    criteria_impact = ["+", "+", "+", "+", "-"]

    comparison_matrix = ComparisonMatrix(
        products=products,
        categories=categories,
        data_matrix=comparison_data,
        criteria_name="Model",
    )
    print(comparison_matrix.get_visualisation_matrix())

    topsis = TopsisCalculator(
        comparison_matrix=comparison_matrix,
        weight_matrix=weights,
        criteria_impact=criteria_impact,
    )

    topsis.normalize_data_matrix()
    print(*topsis.comparison_matrix.data_matrix, sep="\n")

    p_dist, n_dist = topsis.calculate_distances()
    print(f"{p_dist=}")
    print(f"{n_dist=}")

    score = topsis.calculate_rank()
    print(f"{score=}")

    print(topsis.comparison_matrix)

    zipped = zip(products, score)
    ranking = []

    for elem in zipped:
        ranking.append({
            'product_name': elem[0],
            'score': elem[1]
        })

    ranking.sort(key=lambda x: x['score'], reverse=True)
    
    print("Ranking")
    for i, elem in enumerate(ranking):
        print(f"{i+1}. {elem['product_name']}: {elem['score']}")


if __name__ == "__main__":
    main()
