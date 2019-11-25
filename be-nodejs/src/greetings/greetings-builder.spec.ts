import {Test, TestingModule} from '@nestjs/testing';
import { GreetingsBuilder } from './greetings-builder';

describe('GreetingsBuilder', () => {
    let greetingsBuilder: GreetingsBuilder;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [GreetingsBuilder],
            providers: [], 
        }).compile();

        greetingsBuilder = app.get<GreetingsBuilder>(GreetingsBuilder);
    });

    describe('root', () => {

        it('should return "Hello World!"', () => {
            expect(greetingsBuilder.build().text).toBe('Hello, World!');
        });

    });

});
