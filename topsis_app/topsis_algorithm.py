from math import sqrt
from dataclasses import dataclass
from topsis_app.comparison_matrix import ComparisonMatrix


@dataclass
class TopsisCalculator:
    comparison_matrix: ComparisonMatrix
    weight_matrix: list[float]
    criteria_impact: list[str]
    row_number: int = None
    col_number: int = None

    def normalize_weight_matrix(self) -> None:
        self.weight_matrix = [w / sum(self.weight_matrix) for w in self.weight_matrix]

    def set_data_matrix_dimension(self) -> None:
        self.row_number = len(self.comparison_matrix.data_matrix)
        self.col_number = len(self.comparison_matrix.data_matrix[0])

    def normalize_data_matrix(self) -> None:
        self.set_data_matrix_dimension()

        column_sums = [
            sqrt(
                sum(
                    self.comparison_matrix.data_matrix[k][j] ** 2
                    for k in range(self.row_number)
                )
            )
            for j in range(self.col_number)
        ]

        for i in range(self.row_number):
            for j in range(self.col_number):
                self.comparison_matrix.data_matrix[i][j] /= column_sums[j]

    def calculate_weighted_decision_matrix(self) -> list[list[float]]:
        self.normalize_data_matrix()

        weighted_decision_matrix = [
            [
                self.comparison_matrix.data_matrix[i][j] * self.weight_matrix[j]
                for j in range(self.col_number)
            ]
            for i in range(self.row_number)
        ]
        return weighted_decision_matrix

    def calculate_alternatives(self):

        positive_sln = [
            max(
                self.comparison_matrix.data_matrix[i][j] for i in range(self.row_number)
            )
            for j in range(self.col_number)
        ]
        negative_sln = [
            min(
                self.comparison_matrix.data_matrix[i][j] for i in range(self.row_number)
            )
            for j in range(self.col_number)
        ]

        for i in range(self.col_number):
            if self.criteria_impact[i] == "-":
                positive_sln[i], negative_sln[i] = negative_sln[i], positive_sln[i]

        return positive_sln, negative_sln

    def calculate_distances(self) -> tuple[list[float], list[float]]:
        weighted_decision_matrix = self.calculate_weighted_decision_matrix()
        positive_sln, negative_sln = self.calculate_alternatives()

        positive_distances = [
            sqrt(
                sum(
                    (positive_sln[j] - weighted_decision_matrix[i][j]) ** 2
                    for j in range(self.col_number)
                )
            )
            for i in range(self.row_number)
        ]
        negative_distances = [
            sqrt(
                sum(
                    (negative_sln[j] - weighted_decision_matrix[i][j]) ** 2
                    for j in range(self.col_number)
                )
            )
            for i in range(self.row_number)
        ]

        return positive_distances, negative_distances

    def calculate_rank(self):

        positive_distances, negative_distances = self.calculate_distances()
        scores = [
            negative_distances[k] / (negative_distances[k] + positive_distances[k])
            for k in range(self.col_number)
        ]
        sorted_scores = sorted(scores, reverse=True)

        self.comparison_matrix.add_col("positive distance", positive_distances)
        self.comparison_matrix.add_col("negative distance", negative_distances)
        self.comparison_matrix.add_col("score", scores)
        self.comparison_matrix.add_col(
            "topsis rank", [sorted_scores.index(s) for s in scores]
        )

        return scores
