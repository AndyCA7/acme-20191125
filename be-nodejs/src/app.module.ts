import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {GreetingsController} from './greetings/greetings-controller';
import {ScoresController} from './scores/scores-controller';

@Module({
    controllers: [AppController, GreetingsController, ScoresController],
})
export class AppModule {}
