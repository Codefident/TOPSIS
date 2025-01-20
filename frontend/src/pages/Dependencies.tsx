import React, { FormEvent, ReactElement, useEffect, useState } from 'react'
import { getPairsToCompare } from '../utils/net';
import { useLocation, useNavigate } from 'react-router-dom';
import { ButtonsDiv, InputButton, PageContainer } from '../utils/styledComponents';
import styled from 'styled-components';

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const FormInputsContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 7px;
`

export const Dependencies = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state?.data;

    const [featureNames, setFeatureNames] = useState<string[]>([])
    const [dependencies, setDependencies] = useState<number[][]>([])

    useEffect(() => {
        if (data === undefined) {
            console.log("data is undefined")
            return
        }

        let dependencies: number[][] = []
        data.featureNames.forEach((feature: string) => {
            dependencies.push([])
        })

        setFeatureNames(data.featureNames)
        setDependencies(dependencies)
    }, [])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            console.log(data.method)
            const res = await getPairsToCompare(dependencies, data.method);
            if (res.status !== 'success')
                console.log('ERROR')
            else {
                const data = res.data
                navigate("/compare", { state: { data } })
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleCheckboxChange = (featureId: number, dependencyId: number) => {
        setDependencies(prev => {
            const currentDeps = prev[featureId];
            const newDeps = currentDeps.includes(dependencyId)
                ? currentDeps.filter((dep) => dep !== dependencyId) // delete dep
                : [...currentDeps, dependencyId]; // add dep
            return prev.map((deps, idx) =>
                idx === featureId ? newDeps : deps // update
            );
        })
    }

    const displayCheckboxes = (featureId: number) => {
        const elements: ReactElement[] = []
        featureNames.forEach((feature, index) => {
            if (index != featureId) {
                elements.push(
                    <label key={'id_' + featureId + '_label_' + index}>
                        {feature}
                        <input
                            type='checkbox'
                            value={feature}
                            checked={dependencies[featureId]?.includes(index)}
                            onChange={() => handleCheckboxChange(featureId, index)}
                            disabled={dependencies[index]?.includes(featureId)}
                        />
                    </label>
                )
            }
        })
        return elements
    }

    const displayFeatures = () => {
        const elements: ReactElement[] = []
        featureNames.forEach((feature, index) => {
            elements.push(
                <FormInputsContainer key={index}>
                    <b>{feature}:</b>
                    {displayCheckboxes(index)}
                </FormInputsContainer>
            )
        })
        return elements
    }


    return (
        <PageContainer>
            <h1>Dependencies</h1>
            <form onSubmit={handleSubmit}>
                <FormContainer>
                    {displayFeatures()}
                </FormContainer>
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
