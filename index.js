const express = require("express");
const ejs = require("ejs");
const axios = require('axios');

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended : true}));
app.use(express.json());

let success = ""

app.get("/", function (req, res) {
    res.render("candidate", {success});
})


// CAMPAIGN CREATION
app.get("/campaign", function (req, res) {
    res.render("campaign");
})

app.post('/campaign', function (req, res)  {
        const { campaign_title } = req.body;

        // POST REQUEST to external JSON API to Create a new Campaign
        axios.post('https://tech-eval.talkpush.com/api/talkpush_services/campaigns',
        {
            "api_key": "77a9113bda7ae5b92a6ef892135d4e04",
            "campaign": {
                "campaign_title": campaign_title,
                "job_title": "string",
                "street": "string",
                "city": "string",
                "region": "string",
                "postal_code": "string",
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
        .then((result) => {
            res.redirect("candidate")
            console.log(result.data)
        }).catch((err) => {
            console.log(err)
        });
  });


// CANDIDATE CREATION

app.get('/candidate', function (req, res) {
    res.render("candidate", {success});
})

app.post('/candidate', function (req, res)  {
    
    const { first_name, last_name, email } = req.body;

    // POST REQUEST to external JSON API to Create a new Candidate
    // ID of Campaign Created = 52
    axios.post('https://tech-eval.talkpush.com/api/talkpush_services/campaigns/52/campaign_invitations',
    {
        "api_key": "77a9113bda7ae5b92a6ef892135d4e04",
        "campaign_invitation": {
          "first_name": first_name,
          "last_name": last_name,
          "email": email,
          "user_phone_number": "string",
          "source": "string",
          "others": {}
        }
    })
    .then((result) => {
        success = "SUCCESS"
        res.render("candidate", {success})
        console.log(result.data)
    }).catch((err) => {
        res.render("errors", {err})
        console.log(err)
    });
});


// Server Port Setup
app.listen("3000", function () {
    console.log("Server started at port 3000.");
});