import React, { ReactElement } from 'react'
import { matrixInterface } from '../interfaces/interfaces'
import styled from 'styled-components'


const MatrixTableComponent = styled.table`
    border: 2px solid;
    border-collapse: collapse;
    width: 50%;
`

const MatrixTd = styled.td`
    border: 2px solid;
    text-align: center;
`

const MatrixTr = styled.tr``


export const MatrixTable = (props: { matrix: [][] }) => {

    const generateRows = () => {
        const matrix = props.matrix
        let rows: ReactElement[] = []
        let cells: ReactElement[] = []

        if (matrix.length == 0)
            return

        matrix.forEach((row, i) => {
            cells = []
            row.forEach((element, j) => {
                if (i == 0 || j == 0)
                    cells.push(<MatrixTd key={'' + i + '_' + j}><b>{element}</b></MatrixTd>)
                else
                    cells.push(<MatrixTd key={'' + i + '_' + j}>{element}</MatrixTd>)
            })
            rows.push(<MatrixTr key={i + 1}>{cells}</MatrixTr>)
        })

        return rows
    }

    return (
        <MatrixTableComponent>
            <tbody>
                {generateRows()}
            </tbody>
        </MatrixTableComponent>
    )
}
