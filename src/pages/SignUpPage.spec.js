import { render, screen } from '@testing-library/react';
import SignUpPage from './SignUpPage';

describe('Sign Up Page', () => {
    describe('Layout', () => {
        it("has header", () => {
            render(<SignUpPage />);
            const header = screen.queryByRole("heading", { name: "Sign Up" });
            expect(header).toBeInTheDocument();
        });
        it("has username input", () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText('Username');
            expect(input).toBeInTheDocument();
        })
        it("has email input", () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText('Email');
            expect(input).toBeInTheDocument();
        })
    })
})
