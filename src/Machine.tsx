import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Reel } from './models/Reel'
import { increaseBalance, reduceBalance } from "./features/balanceSlice"

type machineProps = {
    
}

export const Machine: React.FC<machineProps> = props => {
   
    const [lines, setLines] = useState<string[][]>([]);

    const randomId = () => Math.round( (Math.random()*100000) ).toString();

    const lineSize = 6;

    const dispatch = useDispatch();

    const handleIncreaseBalance = (incrementValue: number) => {            
        dispatch(increaseBalance(incrementValue)); 
    };

    const handleReduceBalance = (decrementValue: number) => {            
        dispatch(reduceBalance(decrementValue)); 
    };

    const checkWin = (linesArray: any[][]) => {
        let workArray: any[][] = [];
        let winCoeficient = 0;

        for (let i=0; i<linesArray.length; i++) {
            workArray[i] = [...linesArray[i]];
            workArray[i].splice(3,3);
        };
        console.log (workArray)
        for (let i=0; i<workArray.length; i++) {
            if (workArray[0][i] === workArray[1][i] &&  workArray[0][i] === workArray[2][i]) {
                winCoeficient += 4
            } else if (workArray[0][i] === workArray[1][i] || workArray[1][i] === workArray[2][i]) {
                winCoeficient += 2
            } else if (workArray[0][i] === workArray[2][i]) {
                winCoeficient += 1
            }
        }

        console.log  ( winCoeficient )
        handleReduceBalance(10);
        setTimeout(() => {
            handleIncreaseBalance(winCoeficient*10) 
        }, 750);   

    }

    
    const displayLine = (someReel: Reel) => {

        const result: string[] = [];  
        
        if (someReel) {
            someReel.spin();
            const length = someReel.symbols.length;            

            if (someReel.position != null) {
                
                let currentPostion = someReel.position
                let positions: number[] = [currentPostion];

                for (let i=0; i<(lineSize-1); i++) {
                    ++currentPostion

                    if (currentPostion < length) {
                        positions.push(currentPostion);
                    } else {
                        currentPostion = 0
                        positions.push(currentPostion)
                    }                    
                }               

                for (let i=0; i<lineSize; i++) {
                    let newSlot = Object.create(someReel);
                    newSlot.position = positions[i];
                    result.push( someReel.display.call(newSlot) );
                }

                return result;

            }          
        }

        return ['','','']
    } 

    const makeSpin = (changeBalance: boolean) => {
        let newLines = []
        
        for (let i=0; i<3; i++) {
            let reel = new Reel();
            if(reel) newLines.push(displayLine(reel));            
        }
        console.log(newLines);
        if(changeBalance) checkWin(newLines);
        setLines(newLines);
    }
    
    const displayedLine = (line: string[]) => (
        <React.Fragment >
            { line.map(item => {
                return (
                    <div key={ randomId() } className="slotItem">
                        <div> {String.fromCharCode(Number(item))} </div>
                    </div>
                )
            }) }
        </React.Fragment>
    )
    
           
    useEffect(()=> { 
        makeSpin(false);
        
        return () => {
            setLines([])
        }
     }, []); 

    return (
        <div className='machine'>
            <button onClick={() => makeSpin(true)}>SPIN</button> 
                      
            <div className='gridPanel'>

                {
                    lines.map(line => {
                        return (
                            <div key={ randomId() } className="line">
                                { displayedLine(line) }
                            </div>
                        )
                    })
                }
            </div> 
        </div>       
    )
}