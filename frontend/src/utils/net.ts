import { featureInterface, pairAndRatiosInterface } from "../interfaces/interfaces"

const SERVER_URL = "http://127.0.0.1:3001"


// =================================
// features and alternatives
// =================================

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


// =================================
// pairs and getting results
// =================================

export const getPairsToCompare = async (dependencies: number[][], method: string) => {
    const options: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'dependencies': dependencies,
            'method': method
        })
    }
    const response = await fetch(SERVER_URL + "/getPairsToCompare", options)
    if(!response.ok)
        throw new Error("HTTP getPairsToCompare error")
    const data = await response.json()
    return data
}

export const sendGetResults = async (pairRatios: pairAndRatiosInterface[], saveToFile: boolean) => {
    const options: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"pairs_ratios": pairRatios, "save_to_file": saveToFile})
    }
    const response = await fetch(SERVER_URL + "/getResults", options)
    if(!response.ok)
        throw new Error('HTTP sendGetResult error')
    const data = await response.json()
    return data
}


// =================================
// other
// =================================

export const resetAll = async () => {
    const response = await fetch(SERVER_URL + "/resetAll", { method: 'GET' })
    if(!response.ok)
        throw new Error("HTTP resetAll error")
    const data = await response.json()
    return data
}
