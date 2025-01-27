import React, { ReactElement, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, ButtonsDiv, PageContainer } from '../utils/styledComponents';
import { matrixInterface, matrixInterface_snake, resultsInterface } from '../interfaces/interfaces';
import styled from 'styled-components';
import { MatrixTable } from '../components/MatrixTable';
import { MatrixDetails } from '../components/MatrixDetails';


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

type Ranking = Array<{ alternative: string, score: number }>


export const Results = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state?.data;

    const [ranking, setRanking] = useState<Ranking>([]);
    const [p_dist, set_p_dist] = useState<number[]>([]);
    const [n_dist, set_n_dist] = useState<number[]>([]);
    const [comparisonMatrix, setComparisonMatrix] = useState<[][]>([]);
    const [topsisMatrix, settopsisMatrix] = useState<[][]>([]);

    useEffect(() => {
        if (data === undefined) {
            console.log("data is undefined")
            return
        }

        console.log(data.comparison_matrix)
        console.log(data.topsis_matrix)

        setRanking(data.ranking)
        set_p_dist(data.p_dist)
        set_n_dist(data.n_dist)
        setComparisonMatrix(data.comparison_matrix)
        settopsisMatrix(data.topsis_matrix)
    }, [])

    const handleClick = async () => {
        navigate("/")
    }

    const showLeaderboard = () => {
        const elements: ReactElement[] = []
        ranking.forEach((ranking, index) => {
            if (index === 0)
                elements.push(<li key={index}><p style={{ fontWeight: "bold", fontSize: "larger" }}>{ranking.alternative}: {ranking.score}</p></li>)
            else
                elements.push(<li key={index}>{ranking.alternative}: {ranking.score}</li>)
        })

        return elements
    }

    const showDists = () => {
        const elements: ReactElement[] = []

        elements.push(<h3 key={0}>p_dist:</h3>)
        p_dist.forEach((val, i) => {
            elements.push(<p key={"p_" + i}>{val}</p>)
        })

        elements.push(<h3 key={1}>n_dist:</h3>)
        n_dist.forEach((val, i) => {
            elements.push(<p key={"n_" + i}>{val}</p>)
        })

        return elements
    }

    const showMatrixes = () => {
        const elements: ReactElement[] = []

        // comparison
        elements.push(
            <MatrixContainer key={0}>
                <h3>Initial comparison matrix (data)</h3>
                <MatrixDataContainer>
                    <MatrixTable matrix={comparisonMatrix} />
                </MatrixDataContainer>
            </MatrixContainer>
        )

        // topsis
        elements.push(
            <MatrixContainer key={0}>
                <h3>Topsis result matrix</h3>
                <MatrixDataContainer>
                    <MatrixTable matrix={topsisMatrix} />
                </MatrixDataContainer>
            </MatrixContainer>
        )

        return elements
    }

    return (
        <PageContainer>
            <h1>The best alternative is {ranking.length > 0 ? ranking[0].alternative + "" : ""}</h1>
            <ol>
                {showLeaderboard()}
            </ol>
            <div>
                {showDists()}
            </div>
            <MatrixesContainer>
                <h3>Matrixes:</h3>
                {showMatrixes()}
            </MatrixesContainer>
            <ButtonsDiv>
                <Button onClick={handleClick}>Back to home page</Button>
            </ButtonsDiv>
        </PageContainer>
    )
}
