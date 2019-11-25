export interface Greeting {
    text: string;
}

export class GreetingsBuilder {

    build(name="World"): Greeting {
        return {text: `Hello, ${name}!`};
    }
}
