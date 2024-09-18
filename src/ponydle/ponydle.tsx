import React, { useEffect, useRef, useState } from "react";
import { ponyDatabase } from "./pony-dictionary";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button/Button";
import MenuItem from '@mui/material/MenuItem';
import './ponydle.css';

type Pony = {
    name:string,
    colour:string,
    birthYear:number,
    dam:string,
    sire:string
}

export default function Ponydle() {
    const [answerPony, setAnswerPony] = useState<Pony>();
    const [guesses, setGuesses] = useState<Pony[]>([]);
    const [guessArray, setGuessArray] = useState<string[][]>([[]]);
    const textRef = useRef('');

    const selectAnswer = () => {
        const rand = Math.floor(Math.random() * ponyDatabase.length);
        setAnswerPony(ponyDatabase[rand]);
    }
    function searchPony(name:string)  {
        let chosenPony: Pony={
            name: "",
            colour: "",
            birthYear: 0,
            dam: "",
            sire: ""
        };
        ponyDatabase.forEach(pony => {
            if(pony['name'] === name) {
                chosenPony = pony;
                console.log(pony);
                setGuesses([...guesses, pony])
            }
        });

        const currGuessArray = [getNameColour(chosenPony.name),getColour(chosenPony.colour), getAge(chosenPony.birthYear),getDamColour(chosenPony.dam),getSireColour(chosenPony.sire)]

        setGuessArray([...guessArray,currGuessArray]) 
    }

    const makeGuess = () => {
        
        searchPony(textRef.current['value']);
        
    }

    useEffect(() => {
        selectAnswer()
    }, []);


    const getNameColour = (guess:String) => {
        if(guess === answerPony?.name) {
            return 'green-background';
        }
        return 'red-background';
    } 
    const getColour = (guess:String) => {
        if(guess === answerPony?.colour) {
            return 'green-background';
        }
        return 'red-background';
    }

    const getAge = (guess:number) => {
        if(guess === answerPony?.birthYear) {
            return 'green-background';
        }
        else if(answerPony && guess-answerPony?.birthYear <5 && guess-answerPony?.birthYear >-5 ) {
            return 'yellow-background';
        }
        return 'red-background';
    }

    const getDamColour = (guess:String) => {
        if(guess === answerPony?.dam) {
            return 'green-background';
        }
        return 'red-background';
    }

    const getSireColour = (guess:String) => {
        if(guess === answerPony?.sire) {
            return 'green-background';
        }
        return 'red-background';
    }
 

    return (
        <div className="card"> 
            <div className="input-section">
               <TextField 
                required
                label="Select"
                className="input"
                defaultValue={""}
                inputRef={textRef}
                select
                >{ponyDatabase.map((option) => (
                    <MenuItem key={option.name} value={option.name}>{option.name}</MenuItem>
                ))}</TextField>
                <Button variant="contained" 
                    onClick={makeGuess} 
                    disabled={guesses.length > 0 && guesses[guesses.length-1].name === answerPony?.name}>
                        Enter
                </Button> 
            </div>
            <div className="visual-section">
                <div className="guesses">
                    <h3>Guesses</h3>
                    <div className="headings">
                        <div className="heading">Name</div>
                        <div className="heading">Colour</div>
                        <div className="heading">Birth Year</div>
                        <div className="heading">Dam</div>
                        <div className="heading">Sire</div>
                    </div>
                    <div className="guess-section">
                    {guesses.map((guess) => <div className="guess-row">
                        <div className={"guess-property name "+getNameColour(guess.name)}>{guess.name}</div>
                        <div className={"guess-property colour " + getColour(guess.colour) }>{guess.colour}</div>
                        <div className={"guess-property birth-year " + getAge(guess.birthYear) }>{guess.birthYear}</div>
                        <div className={"guess-property dam " +getDamColour(guess.dam)}>{guess.dam}</div>
                        <div className={"guess-property sire " +getSireColour(guess.sire)}>{guess.sire}</div>
                    </div>)}
                </div></div>
            </div>
            
        </div>
    )
}