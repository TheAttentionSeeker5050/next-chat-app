import Home from "../src/pages/index";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor, act } from "@testing-library/react";
import { describe } from "node:test";

// if can start the app, then the test is passed
describe("can-render-home-page", () => {
    it("should render without throwing an error", async () => {

        // render the app
        render(<Home />);
        
        // expect to get main tag content, no matter what contains
        expect(screen.getByRole("main")).toBeInTheDocument();
    });
});

