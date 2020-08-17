describe("Registration page", () => {
    it("should validate user input", () => {
        cy.visit("http://localhost:4200/register");

        cy.get("#formTitle")
            .should("visible")
            .should("contain", "Olive | Registration");

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

        cy.get("input#password")
            .type("abcdefghij")
            .clear()
            .should("have.class", "error");

        cy.get("label#passwordErrorMessage")
            .should("visible")
            .should("have.class", "error")
            .should("contain", "Password is required");

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

        cy.get("label[for='firstName']")
            .should("visible")
            .should("contain", "First name");

        cy.get("input#firstName")
            .should("visible")
            .should("have.attr", "type", "text")
            .should("not.have.class", "error")
            .should("value", "");

        cy.get("input#firstName")
            .type("Some first name")
            .clear()
            .should("have.class", "error");

        cy.get("label#firstNameErrorMessage")
            .should("visible")
            .should("have.class", "error")
            .should("contain", "First name is required");

        cy.get("input#firstName")
            .type("Some first name")
            .should("not.have.class", "error");

        cy.get("label#firstNameErrorMessage")
            .should("not.visible");

        cy.get("label[for='lastName']")
            .should("visible")
            .should("contain", "Last name");

        cy.get("input#lastName")
            .should("visible")
            .should("have.attr", "type", "text")
            .should("not.have.class", "error")
            .should("value", "");

        cy.get("input#lastName")
            .type("Some last name")
            .clear()
            .should("have.class", "error");

        cy.get("label#lastNameErrorMessage")
            .should("visible")
            .should("have.class", "error")
            .should("contain", "Last name is required");

        cy.get("input#lastName")
            .type("Some last name")
            .should("not.have.class", "error");

        cy.get("label#lastNameErrorMessage")
            .should("not.visible");

        cy.get("button[type='submit']")
            .should("visible")
            .should("have.attr", "type", "submit")
            .should("contain", "Register");
    });
});
