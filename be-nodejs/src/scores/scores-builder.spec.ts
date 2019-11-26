import {Test, TestingModule} from '@nestjs/testing';
import { ScoresBuilder } from './scores-builder';

describe('ScoresBuilder', () => {
    var scoresBuilder: ScoresBuilder;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ScoresBuilder],
            providers: [], 
        }).compile();

        scoresBuilder = app.get<ScoresBuilder>(ScoresBuilder);
    });

    describe('convertCharactersToScores', () => {

        it('should return the numbers 1-9 for characters 1-9', () => {
            var rollsData: string;
            rollsData = "1";
            expect(scoresBuilder.convertCharactersToScores(rollsData)).toEqual(([1]));

            rollsData = "12345";
            expect(scoresBuilder.convertCharactersToScores(rollsData)).toEqual(([1,2,3,4,5]));
        });

        it('should return the number 10 where an X occurs', () => {
            var rollsData: string;
            rollsData = "X";
            expect(scoresBuilder.convertCharactersToScores(rollsData)).toEqual([10]);

            rollsData = "1X11X"
            expect(scoresBuilder.convertCharactersToScores(rollsData)).toEqual([1, 10, 1, 1, 10]);
        });

        it('should return the number 0 where a - occurs', () => {
            var rollsData: string;
            rollsData = "12--12";
            expect(scoresBuilder.convertCharactersToScores(rollsData)).toEqual([1, 2, 0, 0, 1, 2]);
        });

        it('should return the number less than 10 where a / occurs', () => {
            var rollsData: string;
            rollsData = "123/21";
            expect(scoresBuilder.convertCharactersToScores(rollsData)).toEqual([1, 2, 3, 7, 2, 1]);
        })

    });

    describe('buildScore', () => {
        it('should return an array of 10 numbers when given an array of roll values', () => {
            var rollScores: number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
            var outputScores: number[] = scoresBuilder.buildScore(rollScores);
            expect(outputScores).toBeDefined();
            expect(outputScores instanceof Array).toBeTruthy();
            expect(outputScores.length).toBe(10);
        });

        it('should return 10 0s when 20 0 rolls are given', () => {
            var rollScores: number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
            expect(scoresBuilder.buildScore(rollScores)).toEqual([0,0,0,0,0,0,0,0,0,0]);
        })

        it('should return 2,4,6,...,20 when 20 1 rolls are given', () => {
            var rollScores: number[] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
            expect(scoresBuilder.buildScore(rollScores)).toEqual([2,4,6,8,10,12,14,16,18,20]);
        });

        it('should return 12,13,14.....14 when a 10,1,1 followed by only 0s is the given score', () => {
            var rollScores: number[] = [10,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
            expect(scoresBuilder.buildScore(rollScores)).toEqual([12,14,14,14,14,14,14,14,14,14]);
        })

        it('should return 11,12,12...12 when 1,9,1, followed by only 0s is the given score', () => {
            var rollScores: number[] = [1,9,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
            expect(scoresBuilder.buildScore(rollScores)).toEqual([11,12,12,12,12,12,12,12,12,12]);
        });

        it('should return a final score of 300 for a perfect game of all 10s', () => {
            var rollScores: number[] = [10,10,10,10,10,10,10,10,10,10,10,10];
            expect(scoresBuilder.buildScore(rollScores)).toEqual([30, 60, 90, 120, 150, 180, 210, 240, 270, 300]);
        })

        it('should return 12 if only a spare is scored in the 10th frame with a single 1 roll afterward', () => {
            var rollScores: number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,8,1];
            expect(scoresBuilder.buildScore(rollScores)).toEqual([0,0,0,0,0,0,0,0,0,11]);
        });

        it('should return 100 if every other ball is a gutter and spare', () => {
            var rollScores: number[] = [0, 10,0, 10,0, 10,0, 10,0, 10,0, 10,0, 10,0, 10,0, 10,0, 10, 0];
            expect(scoresBuilder.buildScore(rollScores)).toEqual([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
        })

    });

});
