import React, { useEffect, useState } from 'react';
import { Reel } from './models/Reel'

export const Machine: React.FC = () => {
   
    const [lines, setLines] = useState<string[][]>([]);

    const randomId = () => Math.round( (Math.random()*100000) ).toString()
    
    const displayLine = (someReel: Reel) => {

        const result: string[] = [];  
        
        if (someReel) {
            someReel.spin();
            const length = someReel.symbols.length;

            if (someReel.position != null) {                 
                
                for (let i=0; i<3; i++) {  
                    let newSlot = Object.create(someReel); 
                    newSlot.position = someReel.position + i - 1;
                    if (newSlot.position < 0) newSlot.position = length -1;
                    if (newSlot.position > length-1) newSlot.position = 0;
                    console.log(newSlot.position);
                    result.push( someReel.display.call(newSlot) );
                }
                console.log(result);
                return result;

            }          
        }

        return ['','','']
    } 

    const makeSpin = () => {
        let newLines = []
        
        for (let i=0; i<3; i++) {
            let reel = new Reel();
            if(reel) newLines.push(displayLine(reel));            
        }
        setLines(newLines);
    }
    
    const displayedLine = (line: string[]) => (
        <React.Fragment >
            { line.map(item => {
                return (
                    <div key={ randomId() } className="slotItem">
                        {String.fromCharCode(Number(item))}
                    </div>
                )
            }) }
        </React.Fragment>
    )
    

    useEffect(()=> { makeSpin() }, []);  



    return (
        <div className='machine'>
            <button onClick={makeSpin}>SPIN</button>
            <div className='gridPanel'>

                {
                    lines.map(line => {
                        return (
                            <div key={ randomId() }>
                                { displayedLine(line) }
                            </div>
                        )
                    })
                }
            </div> 
        </div>       
    )
}