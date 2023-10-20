import React from 'react';
import { useState, useEffect } from 'react';

const Main = () => {
    const [userchoice, setUserchoice] = useState("rock");
    const [compchoice, setCompchoice] = useState("rock");
    const [userscore, setUserscore] = useState(0);
    const [compscore, setCompscore] = useState(0);
    const [result, setResult] = useState("Lets see who wins the game!");
    const [turnresult, setTurnresult] = useState(null);
    
    const [gameover, setGameover] = useState(false);

    const choices = ["rock", "paper", "scissors"];

    const handleClick = (value) => {
        setUserchoice(value);
        generateComputerChoice();
    }

    const generateComputerChoice = () => {
        const random = choices[Math.floor(Math.random() * choices.length)]
        setCompchoice(random);
    }

    const reset = () => {
        window.location.reload();
    }

    useEffect(() => {
        const moves = userchoice + compchoice;
        if (userscore <= 9 || compscore <= 9) {
            if (moves === "rockscissors" || moves === "scissorspaper" || moves === "paperrock") {
                const userupdatedscore = userscore + 1;
                setUserscore(userupdatedscore);
                setTurnresult(`You won!! as you chose ${userchoice} and computer chose ${compchoice}`);
                if (userscore === 9) {
                    setResult("You won the game!!");
                    setGameover(true);
                }
            }
            if (moves === "paperscissors" || moves === "rockpaper" || moves === "scissorsrock") {
                const compupdatedscore = compscore + 1;
                setCompscore(compupdatedscore);
                setTurnresult(`You lost!! as you chose ${userchoice} and the computer chose ${compchoice}`)
                if (compscore === 9) {
                    setResult("Computer won the game");
                    setGameover(true);
                }
            }
            if (moves === "rockrock" || moves === "paperpaper" || moves === "scissorsscissors") {
                setTurnresult(`nobody won as it was a draw !! as you chose ${userchoice} and computer chose ${compchoice}`)
            }
        }
    }, [userchoice, compchoice])

    return <div className='main'>
        <div className='score'>
            <h1>User score - {userscore} </h1>
            <h1>computer score - {compscore}</h1>
        </div>

        <div className='choice'>
            <div className='user-choice'>
                <img className='user-hand' src={`../images/${userchoice}.png`} width="200px" height="100px" alt=""></img>
            </div>
            <div className='comp-choice'>
                <img className='comp-hand' src={`../images/${compchoice}.png`} width="200px" height="100px" alt=""></img>
            </div>
        </div>

        <div className='button-div'>
            {choices.map((choice, index) =>
                <button className='button' key={index} onClick={() => handleClick(choice)} disabled={gameover}>
                    {choice}
                </button>
            )}
        </div>

        <div className='turn-result'>
            <h1> Turn Result - {turnresult} </h1>
        </div>
        <div className='final-result'>
            <h4> Final Result - {result}</h4>
        </div>

        <div className='restart-div'>
            {gameover &&
                <button className='reset' onClick={() => { reset() }}> Restart ?</button>
            }
        </div>
    </div>;
};

export default Main;
