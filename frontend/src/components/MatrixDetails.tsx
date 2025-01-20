import React, { ReactElement } from 'react'
import { matrixInterface } from '../interfaces/interfaces'

export const MatrixDetails = (props: { matrix: matrixInterface }) => {
    return (
        <ul>
            <li><b>Consistency ratio</b>: {props.matrix.consistencyRatio}</li>
            <li><b>Inconsistency index</b>: {props.matrix.inconsistencyIndex}</li>
            <li><b>Dimension</b>: {props.matrix.dimension}</li>
            <li><b>Enforce transitivity rule</b>: {props.matrix.enforceTransitivityRule ? "Yes" : "No"}</li>
        </ul>
    )
}
