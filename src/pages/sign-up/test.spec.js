import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import Container from './index';

describe('Sign Up Page', () => {
    describe('Layout', () => {
        it("has header", () => {
            render(<Container />);
            const header = screen.queryByRole("heading", { name: "Sign Up" });
            expect(header).toBeInTheDocument();
        });
        it("has username input", () => {
            render(<Container />);
            const input = screen.getByLabelText('Username');
            expect(input).toBeInTheDocument();
        })
        it("has email input", () => {
            render(<Container />);
            const input = screen.getByLabelText('Email');
            expect(input).toBeInTheDocument();
        })
        it("has email type for email input", () => {
            render(<Container />);
            const input = screen.getByLabelText('Email');
            
            expect(input.type).toBe("email");
        })
        it("has password input", () => {
            render(<Container />);
            const input = screen.getByLabelText('Password');
            expect(input).toBeInTheDocument();
        })
        it("has password type for password input", () => {
            render(<Container />);
            const input = screen.getByLabelText('Password');
            
            expect(input.type).toBe("password");
        })
        it("has password repeat input", () => {
            render(<Container />);
            const input = screen.getByLabelText('Password Repeat');
            expect(input).toBeInTheDocument();
        })
        it("has password type for password repeat input", () => {
            render(<Container />);
            const input = screen.getByLabelText('Password Repeat');

            expect(input.type).toBe("password");
        })
        it("has Sign Up button", () => {
            render(<Container />);
            const button = screen.queryByRole("button", { name: "Sign Up" });
            expect(button).toBeInTheDocument();
        })
        it("disables the button initially", () => {
            render(<Container />);
            const button = screen.queryByRole("button", { name: "Sign Up" });
            expect(button).toBeDisabled();
        })
    })
    describe("Interactions", () => {
        it("enables the button when password and password repeat fields have same value", async () => {
            render(<Container />);
            const passwordInput = screen.getByLabelText('Password');
            const passwordRepeatInput = screen.getByLabelText('Password Repeat');
            
            // eslint-disable-next-line testing-library/no-unnecessary-act
            act(() => {
                userEvent.type(passwordInput, "P4ssword");
                userEvent.type(passwordRepeatInput, "P4ssword");
            });

            const button = screen.queryByRole("button", { name: "Sign Up" });
            expect(button).toBeEnabled();
        })
        it("sends username, email and password to backend after clicking the button", async () => {
            let requestBody;
            const server = setupServer(
                rest.post("/api/1.0/users", (req, res, ctx) => {
                    requestBody = req.body;
                    return res(ctx.status(200))
                })
            );
            server.listen();
            render(<Container />);
            const usernameInput = screen.getByLabelText('Username');
            const emailInput = screen.getByLabelText('Email');
            const passwordInput = screen.getByLabelText('Password');
            const passwordRepeatInput = screen.getByLabelText('Password Repeat');
            
            // eslint-disable-next-line testing-library/no-unnecessary-act
            act(() => {
                userEvent.type(usernameInput, "user1");
                userEvent.type(emailInput, "user1@mail.com");
                userEvent.type(passwordInput, "P4ssword");
                userEvent.type(passwordRepeatInput, "P4ssword");
            });
            const button = screen.queryByRole("button", { name: "Sign Up" });
            userEvent.click(button);
            await new Promise(resolve => setTimeout(resolve, 500));
            expect(requestBody).toEqual({
                username: "user1",
                email: "user1@mail.com",
                password: "P4ssword"
            })
        })
    })
})
