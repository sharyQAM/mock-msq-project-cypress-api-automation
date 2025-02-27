import endpoint from "../fixtures/Utils/endpoints.json";

const validHeaders = {
  "Content-Type": "application/json",
};
const validAccount = "1234567890";

describe("Get balance api test cases", () => {
  it("Positive: Get the account balace with valid account number", () => {
    cy.api({
      method: "GET",
      url: endpoint.get_balance,
      qs: {
        account_number: validAccount,
      },
    }).then((response) => {
      // Validate the status code
      expect(response.status).to.eq(200);

      // Validate the response body
      const responseData = response.body;
      expect(responseData).to.be.an("object");

      // Validate specific properties in the response
      expect(responseData).to.have.property("account_number", validAccount);
      expect(responseData).to.have.property("balance").that.is.a("number");

      expect(responseData).to.have.property("currency");
      expect(responseData.currency).to.be.a("string");

      expect(responseData).to.have.property("account_status");
      expect(responseData.account_status).to.be.a("string");

      expect(responseData)
        .to.have.property("last_transaction_date")
        .that.is.a("string");
    });
  });
});
