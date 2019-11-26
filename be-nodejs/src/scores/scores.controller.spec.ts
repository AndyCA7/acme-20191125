import {Test, TestingModule} from '@nestjs/testing';

describe('Score Calculator', () => {

    function ScoreCalculator(rolls) {
        
        const arr = rolls.split('');

        const numbersArr = arr.map((char, idx) => {
            // x
            if (char === 'X' || char === 'x') {
                return 10;
            }

            // /
            if (char === '/') {
                return 10 - parseInt(arr[idx - 1], 10);
            }

            // '-'
            if (char === '-') {
                return 0;
            }

            // [1-9]
            return parseInt(char, 10);
        });

        return numbersArr;
    }

    function performScoreCalculation(rollsScore) {
        const frames = [];
        let score = 0;

        for (let x = 0; x < rollsScore.length - 1; x++) {
            const digit = rollsScore[x];
            // if the digit is 10 then it was a strike. only 1 roll for the frame. otherwise there are 2 rolls for the frame.
            if (digit === 10) {
                frames.push([10]);
            } else  {
                x++;
                const nextDigit = rollsScore[x];
                frames.push([digit, nextDigit]);
            }
        }

        // walk through each frame and apply the rules.
        for (let x = 0; x < frames.length; x++) {
            const frame = frames[x];
            const isStrike = frame.length === 1;
            const frameScore = frame.reduce((total, amount) => total + amount);
            const isSpare = !isStrike && frameScore  === 10;

            // always add the frame score to the total score.
            score += frameScore;
            if (isStrike) {
                const nextFrameScore = frames[x + 1].reduce((total, amount) => total + amount);
                const secondNextFrameScore = frames[x + 2].reduce((total, amount) => total + amount);
                score += nextFrameScore + secondNextFrameScore;
            } else if (isSpare) {
                const nextFrameScore = frames[x + 1].reduce((total, amount) => total + amount);
                score += nextFrameScore;
            }
        }

        return score;
    }

    describe('calculateScore', () => {
        
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        it('returns 0 when all rolls are 0', () => {
            const rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            const result = performScoreCalculation(rolls);
            expect(result).toEqual(0);
        });

        // [1, 2, 3, 4, 5, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        it('returns correct count for simple rolls', () => {
            const rolls1 = [1, 2, 3, 4, 5, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            const result1 = performScoreCalculation(rolls1);
            expect(result1).toEqual(28);
        });

        // [10, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        it('returns correct count when first roll is a strike', () => {
            const rolls = [10, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            const result = performScoreCalculation(rolls);
            expect(result).toEqual(16);
        });

        // [9, 1, 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        it('returns correct count when first roll is a strike', () => {
            const rolls = [9, 1, 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            const result = performScoreCalculation(rolls);

            expect(result).toEqual(24);
        });
    });

    describe('parseRolls', () => {

        // [1-9]
        it('returns numbers when only numeric data', () => {
            expect(ScoreCalculator('123456789')).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        });
        
        // x
        it('returns 10 when x', () => {
            expect(ScoreCalculator('xxx')).toEqual([10, 10, 10]);
        });
        
        // -
        it('returns 0 when dash', () => {
            expect(ScoreCalculator('-')).toEqual([0]);
            expect(ScoreCalculator('---')).toEqual([0, 0, 0]);
        });
        
        // '/'
        it('returns 10 minus previous number when slash', () => {
            expect(ScoreCalculator('1/')).toEqual([1, 9]);
            expect(ScoreCalculator('3/9')).toEqual([3, 7, 9]);
        });        
    });
});
