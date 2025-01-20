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


export const MatrixTable = (props: { matrix: matrixInterface }) => {

    const generateRows = () => {
        const matrix = props.matrix
        let rows: ReactElement[] = []
        let cells: ReactElement[] = []

        cells.push(<MatrixTd key={0}></MatrixTd>)
        matrix.elementsNames.forEach((elementName, i) => {
            cells.push(<MatrixTd key={i + 1}><b>{elementName}</b></MatrixTd>)
        })
        rows.push(<MatrixTr key={0}>{cells}</MatrixTr>)

        matrix.elementsRatioMatrix.forEach((row, i) => {
            cells = []
            cells.push(<MatrixTd key={i}><b>{matrix.elementsNames[i]}</b></MatrixTd>)
            row.forEach((value, j) => {
                cells.push(<MatrixTd key={j + i + 1}>{value}</MatrixTd>)
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
