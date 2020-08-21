describe("Forgot Password page", () => {
    it("should validate user input", () => {
        cy.visit("http://localhost:4200/forgotPassword");

        cy.get("#formTitle")
            .should("visible")
            .should("contain", "Olive | Forgot Password");

        cy.get("label[for='emailAddress']")
            .should("visible")
            .should("contain", "Email address");

        cy.get("input#emailAddress")
            .should("visible")
            .should("have.attr", "type", "email")
            .should("not.have.class", "error")
            .should("value", "");

        cy.get("label#emailAddressErrorMessage")
            .should("not.visible");

        cy.get("input#emailAddress")
            .clear()
            .type("abcdefghij")
            .should("have.class", "error");

        cy.get("label#emailAddressErrorMessage")
            .should("visible")
            .should("have.class", "error")
            .should("contain", "Please enter a valid email address");

        cy.get("input#emailAddress")
            .clear()
            .should("have.class", "error");

        cy.get("label#emailAddressErrorMessage")
            .should("visible")
            .should("have.class", "error")
            .should("contain", "Email address is required");

        cy.get("input#emailAddress")
            .type("valid@email")
            .should("not.have.class", "error");

        cy.get("label#emailAddressErrorMessage")
            .should("not.visible");

        cy.get("button[type='submit']")
            .should("visible")
            .should("have.attr", "type", "submit")
            .should("contain", "Send Reset Link");
    });

    it("should validate form on submit", () => {
        cy.visit("http://localhost:4200/forgotPassword");

        cy.get("button[type='submit']")
            .should("visible")
            .should("have.attr", "type", "submit")
            .should("contain", "Send Reset Link")
            .click();

        cy.get("input#emailAddress")
            .should("have.class", "error");

        cy.get("label#emailAddressErrorMessage")
            .should("visible")
            .should("have.class", "error")
            .should("contain", "Email address is required");
    });
});
