import withdrawRequestBody from "../fixtures/Withdrawal/withdraw.json";
import endpoint from "../fixtures/Utils/endpoints.json";

const validHeaders = {
  "Content-Type": "application/json",
};

describe("Amount withdrawal api test cases", () => {
  it("Positive: Withdraw amount with valid request body", () => {
    cy.api({
      method: "POST",
      url: endpoint.withdraw,
      body: withdrawRequestBody,
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
        withdrawRequestBody.account_number
      );
      expect(responseData)
        .to.have.property("amount")
        .that.is.a("number")
        .and.eq(withdrawRequestBody.amount);
      expect(responseData).to.have.property(
        "currency",
        withdrawRequestBody.currency
      );
      expect(responseData).to.have.property(
        "withdraw_method",
        withdrawRequestBody.withdraw_method
      );
      expect(responseData).to.have.property(
        "description",
        withdrawRequestBody.description
      );
      expect(responseData).to.have.property("new_balance").that.is.a("number");

      expect(responseData)
        .to.have.property("transaction_date")
        .that.is.a("string");
    });
  });
});
