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

    describe('Greeting Builder', () => {

        it('should return "Hello World!" when no parameter is supplied', () => {
            const builderText = greetingsBuilder.build(); 
            expect(builderText.text).toBe('Hello, World!');
        });

        it('should return a greeting when name supplied', () => {
            const name = 'testy';
            const result = greetingsBuilder.build(name);

            expect(result.text).toBe(`Hello, ${name}!`);
        })

    });

});
