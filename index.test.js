import request from "supertest";
import app from './index.js';


describe("POST /create-candidate", () => {
    describe("given first name, last name and email", () => {
        test("should respond with a 200 status code for success creation of candidate", async () => {
            let x = Math.floor((Math.random() * 100_000_000) + 1)
            const response = await request(app).post("/create-candidate").send(
            {
                "api_key": "77a9113bda7ae5b92a6ef892135d4e04",
                "campaign_invitation": {
                    "first_name": `first_name${x}`,
                    "last_name": `last_name${x}`,
                    "email": `email${x}@email.com`,
                    "user_phone_number": "string",
                    "source": "string", 
                    "others": {}
                }
            })
            expect(response.statusCode).toBe(200)
        })
    })
})

describe("GET /candidates", () => {
    describe("retrieving the list of all candidates", () => {
        test("should respond with a 200 status code for success retrieval", async () => {
            const response = await request(app).get("/candidates")
            expect(response.statusCode).toBe(200)
        })
    })
})

describe("PUT /shortlist", () => {
    describe("using the put shortlist API without any specific candidate ID just to show it's reaching to the API endpoint", () => {
        test("should respond with a 404 status code", async () => {
            const response = await request(app).get(`/shortlist`)
            expect(response.statusCode).toBe(404)
        })
    })
})

describe("POST /campaign", () => {
    describe("given basic campaign field requirements", () => {
        test("should respond with a 200 status code for success creation of campaign", async () => {
            const response = await request(app).post("/campaign").send(
                {
                    "api_key": "77a9113bda7ae5b92a6ef892135d4e04",
                    "campaign": {
                        "campaign_title": `Vince Ivan Minez campaign`,
                        "job_title": "Junior Software Developer",
                        "street": "Caballes Street",
                        "city": "Tayug",
                        "region": "Region 1",
                        "postal_code": "2445",
                        "country": "PH",
                        "short_description": "string",
                        "long_description": "string",
                        "ats_external_id": "string",
                        "job_type": "string",
                        "salary": "string",
                        "salary_type": "string",
                        "salary_currency": "string"
                    }
                })
            expect(response.statusCode).toBe(200)
        })
    })
})