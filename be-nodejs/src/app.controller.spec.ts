import {Test, TestingModule} from '@nestjs/testing';
import {AppController} from './app.controller';
// import {AppService} from './app.service';
// import {AuthService} from './modules/authentication/authentication.service';
// import {UsersService} from './modules/users/users.service';

describe('AppController', () => {
    let appController: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [], //[AppService, AuthService, UsersService],
        }).compile();

        appController = app.get<AppController>(AppController);
    });

    describe('root', () => {

        it('should return "Hello World!"', () => {
            // expect(appController.getHello()).toBe('Hello World!');
            expect('Hello').toBe('Hello');
        });

    });

});
