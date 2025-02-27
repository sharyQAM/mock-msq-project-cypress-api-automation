import validDepositRequestBody from "../fixtures/DepositAmount/deposit.json";
import endpoint from "../fixtures/Utils/endpoints.json";

const validHeaders = {
  "Content-Type": "application/json",
};

describe("Amount deposit api test cases", () => {
  it("Positive: deposit amount with valid request body", () => {
    cy.api({
      method: "POST",
      url: endpoint.deposit,
      body: validDepositRequestBody,
      headers: validHeaders,
    }).then((response) => {
      // Validate the status code
      expect(response.status).to.eq(201);

      // Validate the response body
      const responseData = response.body;
      expect(responseData).to.be.an("object");

      // Validate specific properties in the response
      expect(responseData)
        .to.have.property("transaction_id")
        .that.is.a("string");
      expect(responseData).to.have.property(
        "account_number",
        validDepositRequestBody.account_number
      );
      expect(responseData).to.have.property(
        "amount",
        validDepositRequestBody.amount
      );
      expect(responseData).to.have.property(
        "currency",
        validDepositRequestBody.currency
      );
      expect(responseData).to.have.property(
        "deposit_method",
        validDepositRequestBody.deposit_method
      );
      expect(responseData).to.have.property(
        "description",
        validDepositRequestBody.description
      );
      expect(responseData)
        .to.have.property("new_balance")
        .that.is.a("number")
        .and.greaterThan(0);
      expect(responseData)
        .to.have.property("transaction_date")
        .that.is.a("string");
    });
  });
});
