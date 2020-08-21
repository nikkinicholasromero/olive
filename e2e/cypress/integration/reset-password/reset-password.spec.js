describe("Reset Password page", () => {
    it("should validate user input", () => {
        cy.visit("http://localhost:4200/resetPassword");

        cy.get("#formTitle")
            .should("visible")
            .should("contain", "Olive | Reset Password");

        cy.get("label[for='password']")
            .should("visible")
            .should("contain", "New password");

        cy.get("input#password")
            .should("visible")
            .should("have.attr", "type", "password")
            .should("not.have.class", "error")
            .should("value", "");

        cy.get("label#passwordErrorMessage")
            .should("not.visible");

        cy.get("input#password")
            .type("abcdefghij")
            .clear()
            .should("have.class", "error");

        cy.get("label#passwordErrorMessage")
            .should("visible")
            .should("have.class", "error")
            .should("contain", "New password is required");

        cy.get("input#password")
            .type("abcdefghij")
            .should("not.have.class", "error");

        cy.get("label#passwordErrorMessage")
            .should("not.visible");

        cy.get("label[for='confirmPassword']")
            .should("visible")
            .should("contain", "Confirm password");
    
        cy.get("input#confirmPassword")
            .should("visible")
            .should("have.attr", "type", "password")
            .should("not.have.class", "error")
            .should("value", "");

        cy.get("input#confirmPassword")
            .type("1234567890")
            .clear()
            .should("have.class", "error");

        cy.get("label#confirmPasswordErrorMessage")
            .should("visible")
            .should("have.class", "error")
            .should("contain", "Passwords does not match");

        cy.get("input#confirmPassword")
            .type("abcdefghij")
            .should("not.have.class", "error");

        cy.get("label#confirmPasswordErrorMessage")
            .should("not.visible");

        cy.get("button[type='submit']")
            .should("visible")
            .should("have.attr", "type", "submit")
            .should("contain", "Reset Password");
    });
    
    it("should validate form on submit", () => {
        cy.visit("http://localhost:4200/resetPassword");

        cy.get("button[type='submit']")
            .should("visible")
            .should("have.attr", "type", "submit")
            .should("contain", "Reset Password")
            .click();

        cy.get("input#password")
            .should("have.class", "error");

        cy.get("label#passwordErrorMessage")
            .should("visible")
            .should("have.class", "error")
            .should("contain", "New password is required");
    });
});
