from typing import Any
from dataclasses import dataclass, field


@dataclass
class ComparisonMatrix:
    products: list[str]
    categories: list[str]
    data_matrix: list[list[float]]
    criteria_name: str
    additional_columns: list[tuple[list[Any], str]] = field(default_factory=list)

    def add_col(self, col_name: str, elements: list[Any]) -> None:
        self.additional_columns.append((elements, col_name))

    def get_visualisation_matrix(self, round_to=0):
        n = len(self.products) + 1
        m = len(self.categories) + 1

        extra_col = len(self.additional_columns)

        visualisation_matrix = [['' for _ in range(m + extra_col)] for _ in range(n)]
        visualisation_matrix[0][0] = self.criteria_name
        for i in range(1, n):
            visualisation_matrix[i][0] = self.products[i - 1]
        for j in range(1, m):
            visualisation_matrix[0][j] = self.categories[j - 1]

        for i in range(1, n):
            for j in range(1, m):
                if round_to == 0:
                    visualisation_matrix[i][j] = self.data_matrix[i - 1][j - 1]
                else:
                    visualisation_matrix[i][j] = round(self.data_matrix[i - 1][j - 1] * (10 ** round_to)) / (10 ** round_to)

        for j in range(extra_col):
            visualisation_matrix[0][m + j] = self.additional_columns[j][1]
        for i in range(1, n):
            for j in range(extra_col):
                visualisation_matrix[i][m+j] = self.additional_columns[j][0][i-1]

        return visualisation_matrix

    def __repr__(self):
        n = len(self.products) + 1
        m = len(self.categories) + 1
        extra_col = len(self.additional_columns)

        visualisation_matrix = self.get_visualisation_matrix()

        extra_col = len(self.additional_columns)
        col_width = max(len(str(item)) for row in visualisation_matrix for item in row if item is not None) + 2

        def format_row(row):
            return "| " + " | ".join(f"{str(item):^{col_width}}" for item in row) + " |"

        row_separator = "+" + "+".join(["-" * (col_width + 2)] * (m+extra_col)) + "+"

        matrix_str = [row_separator]
        for row in visualisation_matrix:
            matrix_str.append(format_row(row))
            matrix_str.append(row_separator)

        return "\n".join(matrix_str) + '\n'
