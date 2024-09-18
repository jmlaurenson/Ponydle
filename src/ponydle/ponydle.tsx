import React, { useEffect, useRef, useState } from "react";
import { ponyDatabase } from "./pony-dictionary";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button/Button";
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import './ponydle.css';

type Pony = {
    name:string,
    colour:string,
    birthYear:number,
    dam:string,
    sire:string
}

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  

export default function Ponydle() {
    const [answerPony, setAnswerPony] = useState<Pony>();
    const [guesses, setGuesses] = useState<Pony[]>([]);
    const [guessArray, setGuessArray] = useState<string[][]>([[]]);
    const [open, setOpen] = React.useState(true);
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
                setGuesses([...guesses, pony])
            }
        });

        const currGuessArray = [getNameColour(chosenPony.name),getColour(chosenPony.colour), getAge(chosenPony.birthYear),getDamColour(chosenPony),getSireColour(chosenPony)]

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

    const getDamColour = (guess:Pony) => {
        if(guess.dam === answerPony?.dam) {
            return 'green-background';
        }
        return 'red-background';
    }

    const getSireColour = (guess:Pony) => {
        if(guess.sire === answerPony?.sire) {
            return 'green-background';
        }
        return 'red-background';
    }
 

    return (
        <div className="card"> 
            <Modal open={open} onClose={()=>{setOpen(false)}}><Box sx={{ ...style, width: 400 }}>
                <h2>Welcome to Ponydle!</h2>
                <p>Your task is to find the secret pony.<br/>
                    When you guess you will reveal some clues to find the hidden pony.<br/>

                    Colour: green when you have found the right colour<br/>
                    Birth year: green when you have the correct year <br/>
                               but yellow when you are within 5 years<br/>
                    Dam: green when you have the correct dam<br/>
                    Sire: green when you have the correct sire.<br/><br/>

                    Good luck!
                </p>
                </Box></Modal>
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
                    {guesses.length>0 && guesses[guesses.length-1].name === answerPony?.name ? <h3>Congrats!!!</h3>:<h3>Guesses</h3>}
                    
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
                        <div className={"guess-property dam " +getDamColour(guess)}>{guess.dam}</div>
                        <div className={"guess-property sire " +getSireColour(guess)}>{guess.sire}</div>
                    </div>)}
                </div>
                </div>
                
            </div>
            
        </div>
    )
}