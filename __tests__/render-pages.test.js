import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor, act } from "@testing-library/react";
import { describe } from "node:test";
import {AppContextProvider} from "@/context/MyContext";
import { useRouter } from "next/router";

// import the pages to test
import Home from "@/pages/index";
import Custom404 from "@/pages/404";
import Custom500 from "@/pages/500";
import { afterAll } from "@jest/globals";

import { initializeTestEnvironment, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import * as fs from 'fs';


// mock the next router
jest.mock('next/router', () => ({
    __esModule: true,
    useRouter: jest.fn(),
}));

/// the firebase mock environment
let testEnv;

beforeAll(async () => {
  // Set up the Firebase Realtime Database Emulator
  testEnv = await initializeTestEnvironment({
    projectId: 'next-chat-app-f0e97',
    database: {
      rules: fs.readFileSync('database.rules.json', 'utf8'), // Path to your database rules
      host: '127.0.0.1',
      port: 9000,
    },
  });
});



afterAll(() => {
    jest.clearAllMocks();
    testEnv.cleanup();

});

// if can start the Main page, and get the main tag, it means that the app is working
describe("test-render-home-page", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render home page without throwing an error", async () => {

        // mock the useRouter hook 
        useRouter.mockReturnValue({
            push: jest.fn(),
        });

        // render the app
        const {container, unmount} = render(
            <AppContextProvider>
                <Home />    
            </AppContextProvider>
        );
        
        // expect to get main tag content, no matter what contains
        expect(screen.getByRole("main")).toBeInTheDocument();

        
        unmount();
        
    });

    
});

// test if can get error pages using calling components
describe("test-render-error-page-404", () => {
    it("should render page 404 without throwing an error", async () => {

        // render the app
        const {container, unmount} = render(
            <AppContextProvider>
                <Custom404 />    
            </AppContextProvider>
        );
        
        // expect to get main tag content, no matter what contains
        // use id error-page-wrapper to get the content
        expect(screen.getByRole("main")).toBeInTheDocument();

        unmount();
    });
});

// test if can get the 500 error page
describe("test-render-error-page-500", () => {
    it("should render page 500 without throwing an error", async () => {

        // render the app
        const {container, unmount} = render(
            <AppContextProvider>
                <Custom500 />    
            </AppContextProvider>
        );
        
        // expect to get main tag content, no matter what contains
        // use id error-page-wrapper to get the content
        expect(screen.getByRole("main")).toBeInTheDocument();

        unmount();
    });
});

// ------------------------------
// I am leaving this commented out because this will be implemented in the future using a different approach
// some prospects are cypress, puppeteer, or selenium, or maybe I can use Jenkins to test the app in a mock running service

// // test render the 404 page using request to a gibberish non existent route within our app page
// describe("test-get-404-page", () => {
//     it("should render 404 page", async () => {
//         // make get request to server at /fkjdfkdfj
//         // use fetch to make request to server
//         const res = await fetch("http://localhost:3000/fkjdfkdfj");
//         // expect to get 404 status code
//         expect(res.status).toBe(404);

//         // get the component from the 404 render page called Custom404 within pages/404.tsx
//         // render the app
//         render(
//             <AppContextProvider>
//                 <Custom404 />    
//             </AppContextProvider>
//         );

//         // expect to get the wrapper id called error-404-wrapper
//         expect(screen.getByTestId("error-404-wrapper")).toBeInTheDocument();


//     });
// });

