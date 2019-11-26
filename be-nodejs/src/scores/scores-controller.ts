import {Get, Controller, Param} from '@nestjs/common'
import {ScoresBuilder} from './scores-builder';
import {StandardResponse} from '../types/standard-response';

@Controller('scores')
export class ScoresController {

    @Get()
    convertScoreCharacters(): StandardResponse<Number[]> {
        const scoresBuilder = new ScoresBuilder();
        const data: number[] = []; // blank for now

        return {error: null, data };
    }

}
