import React from 'react'

interface propsInterface {
    pair: {
        feature_name: string,
        alt_name_1: string,
        alt_name_2: string
    },
    ratios: number[]
}

export const PairRatio = (props: propsInterface) => {
    return (
        <div>PairRatio</div>
    )
}
