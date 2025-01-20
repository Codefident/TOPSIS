import React, { ReactElement, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, ButtonsDiv, PageContainer } from '../utils/styledComponents';
import { matrixInterface, matrixInterface_snake, resultsInterface } from '../interfaces/interfaces';
import styled from 'styled-components';
import { MatrixTable } from '../components/MatrixTable';
import { MatrixDetails } from '../components/MatrixDetails';
import { resetAll } from '../utils/net';


const MatrixesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const MatrixContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: blueviolet;
    padding: 40px;
    border-radius: 15px;
`

const MatrixDataContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
`

const colors = ['lightcoral', 'khaki', 'lawngreen', 'aqua']


export const Results = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state?.data;

    const [results, setResults] = useState<resultsInterface[]>([]);
    const [matrixes, setMatrixes] = useState<matrixInterface[]>([]);

    useEffect(() => {
        if (data === undefined) {
            console.log("data is undefined")
            return
        }

        // results (leaderboard)
        let handleResults: resultsInterface[] = []
        for (const [altName, value] of Object.entries(data.results) as [string, number][]) {
            handleResults.push({
                altName: altName,
                value: value
            })
        }
        handleResults.sort((a, b) => b.value - a.value);

        // matrixes
        let handleMatrixes: matrixInterface[] = []
        data.matrixes.forEach((matrix: matrixInterface_snake) => {
            handleMatrixes.push({
                consistencyRatio: matrix.consistency_ratio,
                inconsistencyIndex: matrix.inconsistency_index,
                criteriaName: matrix.criteria_name,
                dimension: matrix.dimension,
                elementsNames: matrix.elements_names,
                elementsRatioMatrix: matrix.elements_ratio_matrix,
                enforceTransitivityRule: matrix.enforce_transitivity_rule
            })
        })

        // set states
        setResults(handleResults)
        setMatrixes(handleMatrixes)
    }, [])

    const handleClick = async () => {
        try {
            const res = await resetAll()
            if (res.status !== 'success') {
                console.log('error')
            }
            navigate("/")
        }
        catch (err) {
            console.log(err)
        }
    }

    const showLeaderboard = () => {
        const elements: ReactElement[] = []
        results.forEach((result, index) => {
            if (index === 0)
                elements.push(<li key={index}><p style={{ fontWeight: "bold", fontSize: "larger" }}>{result.altName}: {result.value}</p></li>)
            else
                elements.push(<li key={index}>{result.altName}: {result.value}</li>)
        })

        return elements
    }

    const showMatrixes = () => {
        const elements: ReactElement[] = []

        matrixes.forEach((matrix, i) => {
            elements.push(
                <MatrixContainer key={i} style={{ backgroundColor: colors[i % colors.length] }}>
                    <h3>{matrix.criteriaName}</h3>
                    <MatrixDataContainer>
                        <MatrixDetails matrix={matrix} />
                        <MatrixTable matrix={matrix} />
                    </MatrixDataContainer>
                </MatrixContainer>
            )
        })
        return elements
    }

    return (
        <PageContainer>
            <h1>The best alternative is {results.length > 0 ? results[0].altName + "" : ""}</h1>
            <ol>
                {showLeaderboard()}
            </ol>
            <ButtonsDiv>
                <Button onClick={handleClick}>Back to home page</Button>
            </ButtonsDiv>
            <p><b>Used method</b>: {data?.method}</p>
            <MatrixesContainer>
                <h3>Matrixes:</h3>
                {showMatrixes()}
            </MatrixesContainer>
        </PageContainer>
    )
}
