import React, { FormEvent, ReactElement, useState } from 'react'
import styled from 'styled-components';
import { InputButton, InputText, SectionTitle } from '../utils/styledComponents';
import { featureInterface } from '../interfaces/interfaces';


const Container = styled.div`
    background-color: blueviolet;
    border-radius: 15px;
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`

const SubContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
`

const FeaturesContainer = styled.div`
    height: 100%;
    flex: 2;
`

const ErrorMessage = styled.p`
    color: red;
    font-weight: bold;
    text-transform: capitalize;
`

interface propsType {
    setFeatures: React.Dispatch<React.SetStateAction<featureInterface[]>>
    features: featureInterface[]
}

export const FormFeatures = (props: propsType) => {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [featureName, setFeatureName] = useState<string>("");

    const handleSubmit = async (e: FormEvent): Promise<any> => {
        e.preventDefault()
        if (featureName == "") return
        setFeatureName("")
        props.setFeatures(items => [...items, { name: featureName, isDesc: false }])
    }

    const displayFeatures = () => {
        const items: ReactElement[] = []
        props.features.forEach((feature, i) => {
            items.push(<li key={i}>
                <span>{feature.name}
                    <input
                        name='feature_asc'
                        type='checkbox'
                        checked={feature.isDesc}
                        onChange={() => props.setFeatures(prev => prev.map((feature, index) => index === i ? { name: feature.name, isDesc: !feature.isDesc } : feature))}
                    />
                </span>
            </li>)
        })
        return items
    }

    return (
        <Container>
            <SubContainer>
                <SectionTitle>Features</SectionTitle>
            </SubContainer>
            <SubContainer>
                <p>Add feature</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <InputText
                            name='feature_input'
                            type='text'
                            placeholder='Feature name'
                            value={featureName}
                            onChange={e => setFeatureName(e.target.value)}
                            style={{ marginRight: '10px' }}
                        />
                        <InputButton
                            type="submit"
                            value="Add"
                            style={{ border: 'none' }}
                        />
                    </div>
                </form>
                <ErrorMessage>{errorMessage}</ErrorMessage>
            </SubContainer>
            <FeaturesContainer>
                <p>Current features (click checkbox for descending feature - lower value is better):</p>
                <ul>
                    {displayFeatures()}
                </ul>
            </FeaturesContainer>
        </Container>
    )
}
