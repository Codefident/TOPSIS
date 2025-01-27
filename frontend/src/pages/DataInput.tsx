import React, { FormEvent, ReactElement, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ButtonsDiv, InputButton, InputText, PageContainer } from '../utils/styledComponents';
import { featureInterface } from '../interfaces/interfaces';
import { sendData } from '../utils/net';


type Vector = Array<number | string>
type Matrix = Array<Vector>

export const DataInput = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state?.data;

    const [features, setFeatures] = useState<featureInterface[]>([]);
    const [alternatives, setAlternatives] = useState<string[]>([]);
    const [matrix, setMatrix] = useState<Matrix>([]);
    const [weights, setWeights] = useState<Vector>([]);

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
            //@ts-ignore
            let matrixToSend: number[][] = matrix
            //@ts-ignore
            let weightsToSend: number[] = weights

            const data = await sendData(features, alternatives, matrixToSend, weightsToSend)
            if (data.status !== 'success')
                console.log('ERROR')
            else {
                navigate("/results", { state: { data } })
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
                <InputText
                    type='number'
                    step={0.1}
                    value={elem}
                    onChange={e => setMatrix(prev => {
                        let newMatrix: Matrix = [...prev]
                        newMatrix[row][col] = e.target.value.length > 0 ? parseFloat(e.target.value) : ""
                        return newMatrix
                    })}
                    style={{ width: 'auto' }}
                    required
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
            elements.push(<tr key={"li_" + index}>
                <th>
                    {features[index].name}
                </th>
                <td>
                    <InputText
                        type='number'
                        step={0.1}
                        value={weight}
                        min={0}
                        onChange={e => setWeights(prev => {
                            let newWeights = [...prev]
                            newWeights[index] = e.target.value.length > 0 ? parseFloat(e.target.value) : ""
                            return newWeights
                        })}
                        required
                    />
                </td>
            </tr>)
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
                <table>
                    <tbody>
                        {displayWeights()}
                    </tbody>
                </table>
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
