import React, { FormEvent, ReactElement, useState } from 'react'
import styled from 'styled-components'
import { SectionTitle } from '../utils/styledComponents'


const Container = styled.div`
    background-color: crimson;
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
    setAlternatives: React.Dispatch<React.SetStateAction<string[]>>
    alternatives: string[]
}

export const FormAlternatives = (props: propsType) => {
    const [altName, setAltName] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleSubmit = async (e: FormEvent): Promise<any> => {
        e.preventDefault()
        if (altName == "") return
        setAltName("")
        props.setAlternatives(items => [...items, altName])
    }

    const displayAlternatives = () => {
        const items: ReactElement[] = []
        props.alternatives.forEach((alt, i) => {
            items.push(<li key={i}>{alt}</li>)
        })
        return items
    }

    return (
        <Container>
            <SubContainer>
                <SectionTitle>Alternatives</SectionTitle>
            </SubContainer>
            <SubContainer>
                <p>Add alternative</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            name='alternative_input'
                            type='text'
                            placeholder='alternative_name'
                            value={altName}
                            onChange={e => setAltName(e.target.value)}
                        />
                        <input
                            type="submit"
                            value="Add"
                        />
                    </div>
                </form>
                <ErrorMessage>{errorMessage}</ErrorMessage>
            </SubContainer>
            <FeaturesContainer>
                <p>Current alternatives:</p>
                <ul>
                    {displayAlternatives()}
                </ul>
            </FeaturesContainer>
        </Container>
    )
}
