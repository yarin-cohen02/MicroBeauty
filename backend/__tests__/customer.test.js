const request = require("supertest");
const app = require("../app"); 
const customerService = require("../services/customerService");

jest.mock("../services/customerService"); 

describe("GET /api/customers", () => {
  it("should return customers if found", async () => {
    const mockCustomers = [
      { customer_id: 1, first_name: "John", last_name: "Doe", mobile_number: "+972501234567" },
    ];

    customerService.getCustomersByQuery.mockResolvedValue(mockCustomers);

    const response = await request(app).get("/api/customers?query=John");

    expect(response.status).toBe(200);
    expect(response.body.customers).toEqual(mockCustomers);
  });

  it("should return 404 if no customers are found", async () => {
    customerService.getCustomersByQuery.mockResolvedValue([]);

    const response = await request(app).get("/api/customers?query=John");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("No customers found");
  });

  it("should return 500 if there's a server error", async () => {
    customerService.getCustomersByQuery.mockRejectedValue(new Error("Database error"));

    const response = await request(app).get("/api/customers?query=John");

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Error fetching customers");
  });
});
