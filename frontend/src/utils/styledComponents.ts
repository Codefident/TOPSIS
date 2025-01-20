import styled from "styled-components";

export const PageContainer = styled.div`
    width: 100%;
    min-height: 100%;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 20px;
    padding: 40px;
    box-sizing: border-box;
    background-color: whitesmoke;
`

export const SectionTitle = styled.h2`
    color: white;
    text-transform: capitalize;
    font-weight: bold;
`

export const Button = styled.button`
    padding: 10px;
    border: 3px solid black;
    border-radius: 7px;
    min-width: 80px;
    font-weight: bold;
    color: black;
    background-color: white;
    transition: 0.3s;

    &:hover {
        background-color: black;
        color: white;
        border: 3px solid black;
        cursor: pointer;
    }
`;

export const ButtonSecondary = styled.button`
    padding: 10px;
    border: 3px solid black;
    border-radius: 7px;
    min-width: 80px;
    font-weight: bold;
    color: black;
    background-color: chartreuse;
    transition: 0.3s;

    &:hover {
        background-color: darkgreen;
        color: white;
        border: 3px solid black;
        cursor: pointer;
    }
`;

export const InputButton = styled.input`
    padding: 10px;
    border: 3px solid black;
    border-radius: 7px;
    min-width: 80px;
    font-weight: bold;
    color: black;
    background-color: white;
    transition: 0.3s;

    &:hover {
        background-color: black;
        color: white;
        border: 3px solid black;
        cursor: pointer;
    }
`;

export const ButtonsDiv = styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
`
