describe("Login page", () => {
    it("should validate user input", () => {
        cy.visit("http://localhost:4200");

        cy.get("#formTitle")
            .should("visible")
            .should("contain", "Olive | Login");

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

        cy.get("label[for='password']")
            .should("visible")
            .should("contain", "Password");

        cy.get("input#password")
            .should("visible")
            .should("have.attr", "type", "password")
            .should("not.have.class", "error")
            .should("value", "");

        cy.get("label#passwordErrorMessage")
            .should("not.visible");

        cy.get("button[type='submit']")
            .should("visible")
            .should("have.attr", "type", "submit")
            .should("contain", "Login");
    });
});
