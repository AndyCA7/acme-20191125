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

    describe('build', () => {

        it('should return "Hello World!"', () => {
            expect(greetingsBuilder.build().text).toBe('Hello, World!');
        });

        it('should return a personalized greeting when given a name', () => {
            const givenName: string = "Foo";
            expect(greetingsBuilder.build(givenName).text).toBe(`Hello, ${givenName}`);
        })

    });

});
