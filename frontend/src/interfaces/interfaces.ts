export interface pairInterface {
    feature_name: string, alt_name_1: string, alt_name_2: string, id: number
}

export interface pairAndRatiosInterface extends pairInterface {
    ratio: number
}

export interface pairRatiosInterface {
    [key: string]: number
}

export interface resultsInterface {
    altName: string,
    value: number
}

export interface matrixInterface_snake {
    consistency_ratio: number,
    inconsistency_index: number | string,
    criteria_name: string,
    dimension: number,
    elements_names: string[],
    elements_ratio_matrix: number[][],
    enforce_transitivity_rule: boolean
}

export interface matrixInterface {
    consistencyRatio: number,
    inconsistencyIndex: number | string,
    criteriaName: string,
    dimension: number,
    elementsNames: string[],
    elementsRatioMatrix: number[][],
    enforceTransitivityRule: boolean
}

export interface featureInterface {
    name: string
    isDesc: boolean
}
