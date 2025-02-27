import sendRequestBody from "../fixtures/SendAmount/send.json";
import endpoint from "../fixtures/Utils/endpoints.json";

const validHeaders = {
  "Content-Type": "application/json",
};

describe("Amount sending api test cases", () => {
  it("Positive: Sending amount with valid request body", () => {
    cy.api({
      method: "POST",
      url: endpoint.send,
      body: sendRequestBody,
      headers: validHeaders,
    }).then((response) => {
      // Validate the status code
      expect(response.status).to.eq(201);

      // Validate the response body
      const responseData = response.body;
      expect(responseData).to.be.an("object");

      // Validate specific properties in the response
      expect(responseData).to.have.property(
        "from_account_number",
        sendRequestBody.from_account_number
      );
      expect(responseData).to.have.property(
        "to_account_number",
        sendRequestBody.to_account_number
      );
      expect(responseData)
        .to.have.property("amount")
        .that.is.a("number")
        .and.eq(sendRequestBody.amount);
      expect(responseData)
        .to.have.property("currency")
        .and.eq(sendRequestBody.currency);
      expect(responseData).to.have.property(
        "description",
        sendRequestBody.description
      );
    });
  });
});
