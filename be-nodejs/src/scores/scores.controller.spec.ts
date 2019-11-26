import { stringLiteral } from "@babel/types";

function ParseRoll(roll: string){
    const number = parseInt(roll);
    
    if(number || number === 0){
        return number;
    }
    
    if(roll === 'x'){
        return 10;
    }
    
    if(roll === '/'){
        return 10;
    }
    
    if(roll === '-'){
        return 0;
    }
}

function isStrike(roll: number[], index){
    //Even needs to be preceded by 10
    //Odd, it is immediately a strike
    const value = roll[index];
    if(value !== 10){
        return false;
    }

    if(index === 0 || (index % 2) === 0)
    {
        return true;    
    } else {
        return roll[index - 1] === 10;
    }
}
function strikeValue(){

}

function isSpare(roll: number[], index){
    return !isStrike(roll, index) 
    && roll[index] !== 10 
    && roll[index+1] === 10;
}

function spareValue()
{

}

function ScoreRoll(roll: number[]){
    let rollLength = roll.length;
    let skip = 2;
    let sum = 0;
    for(let i = 0; i < rollLength; i += skip){
        let rollValue = roll[i];
        //strike, need to add next role
        if(rollValue === 10){
            skip = 1;
            sum = rollValue + roll[i+1] + roll[i+2];
        }
        else {
            skip = 2;
            //normal roll
            if(i < rollLength - 1) {
                let nextRollValue = roll[i+1]; 
                //spare, need to add next roll
                if(nextRollValue === 10){
                    nextRollValue += roll[i+2];
                }
                rollValue += nextRollValue;
            }
            sum += rollValue;
        }
        
    }

    return sum;
}

describe('ParseRoll', () => {
    it('should parse a number', () => {
        const number = Math.floor(Math.random() * 10);
        const numberStr = `${number}`;

        const result = ParseRoll(numberStr); 
        expect(result).toBe(number);
    });

    it('should parse a strike', () => {
        expect(ParseRoll('x')).toBe(10);
    })
    
    it('should parse a spare', () => {
        expect(ParseRoll('/')).toBe(10);
    })
    
    it('should parse a miss', () => {
        expect(ParseRoll('-')).toBe(0);
    })
})

describe('isStrike', () => {
    it('should identify strike when at first roll', () => {
        expect(isStrike([10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 0)).toBe(true);
    });
    
    it('should identify strike after a normal roll', () => {
        expect(isStrike([1,9,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 2)).toBe(true);
    });
    
    it('should identify strike after a spare', () => {
        const roll = [1,10,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

        expect(isStrike(roll, 2)).toBe(true);
        expect(isStrike(roll, 1)).toBe(false);
    });
    
    it('should identify strike after a strike', () => {
        expect(isStrike([10,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 1)).toBe(true);
    });
    
    it('should identify strike when in middle of successive strikes', () => {
        expect(isStrike([10,10,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 2)).toBe(true);
    });
    
    it('should identify strike when it is last roll', () => {
        expect(isStrike([10,10,10,0,0,0,0,0,0,0,0,0,0,0,0,10], 2)).toBe(true);
    });
})

describe('isSpare', () => {
    it('should identify spare when at first roll', () => {
        expect(isSpare([0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 0)).toBe(true);
    });
    
    it('should identify spare after a normal roll', () => {
        const roll = [1,9,5,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(isSpare(roll, 0)).toBe(false);
        expect(isSpare(roll, 2)).toBe(true);
    });
    
    it('should identify spare after a spare', () => {
        const roll = [1,10,5,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

        expect(isSpare(roll, 0)).toBe(true);
        expect(isSpare(roll, 2)).toBe(true);
    });
    
    it('should identify spare after a first strike', () => {
        expect(isSpare([10,3,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 1)).toBe(true);
    });

    it('should identify spare after a strike in the middle', () => {
        const roll = [0,0,0,0,0,0,0,0,10,5,10,0,0,0,0,0,0,0,0];
        expect(isSpare(roll, 9)).toBe(true);
        expect(isSpare(roll, 8)).toBe(false);
    });
    
    it('should identify spare when in middle of successive spares', () => {
        const roll = [0,10,5,10,9,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(isSpare(roll, 0)).toBe(true);
        expect(isSpare(roll, 2)).toBe(true);
        expect(isSpare(roll, 4)).toBe(true);
    });
    
    it('should identify spare when it is the last roll', () => {
        const roll = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10];
        expect(isSpare(roll, 18)).toBe(true);
    });
})

describe('ScoreRoll', () => {
    it('should calculate a gutter', () => {
        const roll = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(ScoreRoll(roll)).toBe(0);
    });

    it('should calculate all 1s', () => {
        const roll = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
        expect(ScoreRoll(roll)).toBe(20);
    });
    
    it('should calculate strike with no previous frame', () => {
        const roll = [10,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(ScoreRoll(roll)).toBe(14);
    });
    
    it('should calculate spare with no previous frame', () => {
        //const roll = [1,9,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        //expect(ScoreRoll(roll)).toBe(12);
    });

})

const fakeRolls = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];