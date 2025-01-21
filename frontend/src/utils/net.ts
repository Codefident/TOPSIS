import { featureInterface } from "../interfaces/interfaces"

const SERVER_URL = "http://127.0.0.1:2137"


export const sendData = async (features: featureInterface[], alternatives: string[], matrix: number[][], weights: number[]) => {
    const options: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            features: features,
            alternatives: alternatives,
            matrix: matrix,
            weights: weights
        })
    }
    const response = await fetch(SERVER_URL + "/sendData", options)
    if(!response.ok)
        throw new Error('HTTP sendGetResult error')
    const data = await response.json()
    return data
}
