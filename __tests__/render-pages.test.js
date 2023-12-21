import Home from "../src/pages/index";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor, act } from "@testing-library/react";
import { describe } from "node:test";
import {AppContextProvider} from "@/context/MyContext";

// import 404 page
import Custom404 from "@/pages/404";

// if can start the Main page, and get the main tag, it means that the app is working
describe("test-render-home-page", () => {
    it("should render without throwing an error", async () => {

        // render the app
        render(
            <AppContextProvider>
                <Home />    
            </AppContextProvider>
        );
        
        // expect to get main tag content, no matter what contains
        expect(screen.getByRole("main")).toBeInTheDocument();
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

