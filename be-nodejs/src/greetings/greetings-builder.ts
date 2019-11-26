export interface Greeting {
    text: string;
}

export class GreetingsBuilder {

    build(name?: string): Greeting {
        if (name){
            return { text: `Hello, ${name}` };
        }

        return {text: 'Hello, World!'};

    }
}
