import React, { useState } from 'react'
import { FormFeatures } from '../components/FormFeatures';
import { FormAlternatives } from '../components/FormAlternatives';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonsDiv, ButtonSecondary, PageContainer } from '../utils/styledComponents';
import { featureInterface } from '../interfaces/interfaces';


export const Home = () => {
    const navigate = useNavigate();

    const [features, setFeatures] = useState<featureInterface[]>([]);
    const [alternatives, setAlternatives] = useState<string[]>([]);

    const handleClickNext: any = async () => {
        const data = { features: features, alternatives: alternatives }
        navigate("/input-data", { state: { data } })
    }

    const handleClickReset: any = async () => {
        try {
            //resetAll()
            setFeatures([])
            setAlternatives([])
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <PageContainer>
            <h1>TOPSIS app</h1>
            <p>Add your own alternatives and features!</p>
            <FormFeatures setFeatures={setFeatures} features={features} />
            <FormAlternatives setAlternatives={setAlternatives} alternatives={alternatives} />
            <ButtonsDiv>
                <ButtonSecondary onClick={handleClickReset}>Reset</ButtonSecondary>
                <Button onClick={handleClickNext}>Next</Button>
            </ButtonsDiv>
        </PageContainer>
    )
}
