import React, { FormEvent, ReactElement, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ButtonsDiv, InputButton, PageContainer } from '../utils/styledComponents';
import { featureInterface } from '../interfaces/interfaces';
import { sendData } from '../utils/net';


type Matrix = Array<Array<number>>

export const DataInput = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state?.data;

    const [features, setFeatures] = useState<featureInterface[]>([]);
    const [alternatives, setAlternatives] = useState<string[]>([]);
    const [matrix, setMatrix] = useState<Matrix>([]);
    const [weights, setWeights] = useState<number[]>([]);

    useEffect(() => {
        if (data === undefined) {
            console.log("data is undefined")
            return
        }

        const n = data.alternatives.length
        const m = data.features.length

        let matrix: Matrix = Array(n)
        for (let i = 0; i < n; i++) {
            matrix[i] = Array(m)
            for (let j = 0; j < m; j++)
                matrix[i][j] = 0.0
        }

        let weights: number[] = Array(m)
        for (let j = 0; j < m; j++)
            weights[j] = 1.0

        setFeatures(data.features)
        setAlternatives(data.alternatives)
        setMatrix(matrix)
        setWeights(weights)
    }, [])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const res = await sendData(features, alternatives, matrix, weights)
            if (res.status !== 'success')
                console.log('ERROR')
            else {
                console.log('success')
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const displayTableHead = () => {
        const elements: ReactElement[] = []
        elements.push(<td key={0}></td>)
        features.forEach((feature, index) => {
            elements.push(<th key={'head_th' + index} scope='col'>{feature.name}</th>)
        })
        return elements
    }

    const displayTableRow = (row: number) => {
        const elements: ReactElement[] = []
        matrix[row].forEach((elem, col) => {
            elements.push(<td key={'td_' + row + '_' + col}>
                <input
                    type='number'
                    step={0.1}
                    value={elem}
                    onChange={e => setMatrix(prev => {
                        let newMatrix: Matrix = [...prev]
                        newMatrix[row][col] = parseFloat(e.target.value)
                        return newMatrix
                    })}
                />
            </td>)
        })
        return elements
    }

    const displayTable = () => {
        const elements: ReactElement[] = []

        alternatives.forEach((alternative, index) => {
            elements.push(
                <tr key={'tr_' + index}>
                    <th scope='row'>{alternative}</th>
                    {displayTableRow(index)}
                </tr>
            )
        })

        return elements
    }

    const displayWeights = () => {
        const elements: ReactElement[] = []

        weights.forEach((weight, index) => {
            elements.push(<li key={"li_" + index}>
                <label>
                    {features[index].name}
                    <input
                        type='number'
                        step={0.1}
                        value={weight}
                        onChange={e => setWeights(prev => {
                            let newWeights = [...prev]
                            newWeights[index] = parseFloat(e.target.value)
                            return newWeights
                        })}
                    />
                </label>
            </li>)
        })

        return elements
    }

    return (
        <PageContainer>
            <h1>Data</h1>
            <form onSubmit={handleSubmit}>
                <table>
                    <thead>
                        <tr>{displayTableHead()}</tr>
                    </thead>
                    <tbody>
                        {displayTable()}
                    </tbody>
                </table>
                <h3>Weights:</h3>
                <ul>
                    {displayWeights()}
                </ul>
                <ButtonsDiv>
                    <InputButton
                        type='submit'
                        value='Next'
                    />
                </ButtonsDiv>
            </form>
        </PageContainer>
    )
}
