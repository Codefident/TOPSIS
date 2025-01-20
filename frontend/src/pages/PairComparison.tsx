import React, { FormEvent, ReactElement, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ButtonsDiv, InputButton, PageContainer } from '../utils/styledComponents';
import { pairAndRatiosInterface, pairInterface, pairRatiosInterface } from '../interfaces/interfaces';
import { sendGetResults } from '../utils/net';
import styled from 'styled-components';


const ComparisonDiv = styled.div`
    padding: 10px;
    background-color: limegreen;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const RadiosDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const RadioInput = styled.input.attrs({ type: 'radio' })`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #000000;
  background-color: #fff;
  transition: background-color 0.2s, border-color 0.2s;
  cursor: pointer;

  &:checked {
    background-color: #000;
  }

  &:hover {
    background-color: #a3a3a3;
  }
`;

const Label = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  //font-size: 16px;
  color: #333;
  margin-right: 15px;
`;

const colors = ['khaki', 'lawngreen', 'aqua', 'lightcoral']


export const PairComparison = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state?.data;

    const [pairsData, setPairsData] = useState<pairInterface[]>([])
    const [pairsRatios, setPairsRatios] = useState<pairRatiosInterface>({})

    const [saveToFile, setSaveToFile] = useState<boolean>(false)

    useEffect(() => {
        if (data === undefined) {
            console.log("data is undefined")
            return
        }

        let handlePairs: pairInterface[] = []
        const handlePairsRatios: pairRatiosInterface = {}

        data.pairs.forEach((pair: pairInterface, index: number) => {
            handlePairs.push({
                ...pair,
                id: index
            })
            handlePairsRatios[index] = 1
        })

        setPairsData(handlePairs)
        setPairsRatios(handlePairsRatios)
    }, [])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const dataToSend: pairAndRatiosInterface[] = []
        pairsData.forEach(pair => {
            dataToSend.push({
                ...pair,
                ratio: pairsRatios[pair.id]
            })
        })
        try {
            const res = await sendGetResults(dataToSend, saveToFile)
            if (res.status !== 'success')
                console.log('ERROR')
            else {
                const data = res.data
                navigate("/results", { state: { data } })
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleRadioChange = (id: number, ratio: number) => {
        setPairsRatios(prev => ({ ...prev, [id]: ratio }))
    }

    const displayRadios = (id: number) => {
        const radios: ReactElement[] = []
        data.ratios.forEach((ratio: { label: string, value: number }, index: number) => {
            radios.push(
                <Label key={'' + id + '_' + index}>
                    <RadioInput
                        type='radio'
                        name={'pair_' + id + '_radio_' + index}
                        value={ratio.value}
                        checked={pairsRatios[id] === ratio.value}
                        onChange={() => handleRadioChange(id, ratio.value)}
                    />
                    <b>{ratio.label}</b>
                </Label>
            )
        })
        return radios
    }

    const displayInputs = () => {
        const elements: ReactElement[] = []
        let prevFeatureName: string = ""
        let colorId: number = 0
        let featureChanged: boolean = false

        pairsData.forEach(pair => {
            if (pair.feature_name != prevFeatureName) {
                prevFeatureName = pair.feature_name
                colorId = (colorId + 1) % colors.length
                featureChanged = true
            }
            else {
                featureChanged = false
            }
            elements.push(
                <ComparisonDiv key={pair.id} style={{ backgroundColor: colors[colorId] }}>
                    {featureChanged ? <h3>{pair.feature_name}</h3> : ""}
                    <p>How much <b>{pair.alt_name_1}</b> is better than <b>{pair.alt_name_2}</b>?</p>
                    <RadiosDiv>{displayRadios(pair.id)}</RadiosDiv>
                </ComparisonDiv>
            )
        })
        return elements
    }

    return (
        <PageContainer>
            <h1>Compare alternatives (and features)</h1>
            <form onSubmit={handleSubmit}>
                {displayInputs()}
                <ButtonsDiv style={{ flexDirection: 'column', gap: '20px' }}>
                    <Label>
                        <b>Save input data to file:</b>
                        <input
                            type='checkbox'
                            checked={saveToFile}
                            onChange={() => setSaveToFile(prev => !prev)}
                        />
                    </Label>
                    <InputButton
                        type='submit'
                        value='Next'
                    />
                </ButtonsDiv>
            </form>
        </PageContainer>
    )
}
