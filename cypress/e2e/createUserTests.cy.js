import createUserRequestBody from "../fixtures/UserCreation/create_user.json";
import invalidEmailRequestBody from "../fixtures/UserCreation/create_user_invalid_email.json";
import userAlreadyExistRequestBody from "../fixtures/UserCreation/create_user_already_exist.json";
import endpoint from "../fixtures/Utils/endpoints.json";
import errorName from "../fixtures/Utils/errorName.json";
import errorMessages from "../fixtures/Utils/errorMessages.json";

const validHeaders = {
  "Content-Type": "application/json",
};

describe("Create user api test cases", () => {
  it("Positive: Create a user with valid request body", () => {
    cy.api({
      method: "POST",
      url: endpoint.create_user,
      body: createUserRequestBody,
      headers: validHeaders,
    }).then((response) => {
      // Validate the status code
      expect(response.status).to.eq(201);

      // Validate the response body
      const responseData = response.body;
      expect(responseData).to.be.an("object");
      expect(responseData).to.have.property("user_id");
      expect(responseData).to.have.property(
        "first_name",
        createUserRequestBody.first_name
      );
      expect(responseData).to.have.property(
        "last_name",
        createUserRequestBody.last_name
      );
      expect(responseData).to.have.property(
        "email",
        createUserRequestBody.email
      );
      expect(responseData).to.have.property(
        "phone_number",
        createUserRequestBody.phone_number
      );
      expect(responseData).to.have.property("address");
      expect(responseData).to.have.property(
        "date_of_birth",
        createUserRequestBody.date_of_birth
      );
      expect(responseData).to.have.property(
        "account_type",
        createUserRequestBody.account_type
      );
      expect(responseData).to.have.property("account_status");
      expect(responseData).to.have.property("created_at");
      expect(responseData).to.have.property("updated_at");

      // Validate the address object
      const address = responseData.address;
      expect(address).to.be.an("object");
      expect(address).to.have.property(
        "street",
        createUserRequestBody.address.street
      );
      expect(address).to.have.property(
        "city",
        createUserRequestBody.address.city
      );
      expect(address).to.have.property(
        "state",
        createUserRequestBody.address.state
      );
      expect(address).to.have.property(
        "postal_code",
        createUserRequestBody.address.postal_code
      );
      expect(address).to.have.property(
        "country",
        createUserRequestBody.address.country
      );
    });
  });

  it("Negative: Create a user with invalid email in the request body", () => {
    cy.api({
      method: "POST",
      url: endpoint.create_user,
      body: invalidEmailRequestBody,
      headers: validHeaders,
      failOnStatusCode: false,
    }).then((response) => {
      // Validate the status code (assuming 400 for Bad Request)
      expect(response.status).to.eq(400);

      // Validate the error response body
      const responseData = response.body;
      expect(responseData).to.be.an("object");
      expect(responseData).to.have.property("error", errorName.badRequest);
      expect(responseData).to.have.property(
        "message",
        errorMessages.validationFailed
      );

      // Validate the 'details' array
      expect(responseData).to.have.property("details");
      expect(responseData.details).to.be.an("array").that.is.not.empty;

      // Validate the specific field error
      const fieldError = responseData.details[0];
      expect(fieldError).to.have.property("field", errorName.emailErrorField);
      expect(fieldError).to.have.property("message", errorMessages.emailInvalidFormat);
    });
  });

  it("Negative: Create a user with email/national id already exist", () => {
    cy.api({
      method: "POST",
      url: endpoint.create_user,
      body: userAlreadyExistRequestBody,
      headers: validHeaders,
      failOnStatusCode: false,
    }).then((response) => {
      // Validate the status code (assuming 409 for Conflict)
      expect(response.status).to.eq(409);

      // Validate the error response body
      const responseData = response.body;
      expect(responseData).to.be.an("object");
      expect(responseData).to.have.property("error", errorName.conflict);
      expect(responseData).to.have.property(
        "message",
        errorMessages.emailNationalIdAlreadyExist
      );
    });
  });
});
