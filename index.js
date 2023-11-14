const express = require("express");
const ejs = require("ejs");
const axios = require('axios');
const methodOverride = require('method-override')

const app = express();
app.set("view engine", "ejs");
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended : true}));
app.use(express.json());


app.get("/", function (req, res) {
    res.redirect("/candidates");
})

// Create Campaign
app.get("/campaign", function (req, res) {
    res.render("campaign");
})

app.post('/campaign', async (req, res) => {
        const { campaign_title } = req.body;

        // POST REQUEST to external JSON API to Create a new Campaign
        try {
            const result = await axios.post('https://tech-eval.talkpush.com/api/talkpush_services/campaigns',
            {
                "api_key": "77a9113bda7ae5b92a6ef892135d4e04",
                "campaign": {
                    "campaign_title": campaign_title,
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
            res.redirect("candidate")
            console.log(result.data)
        }
        catch(err) {
            res.render("errors", {err})
            console.log(err)
        }
  });


// Create Candidate
app.get('/create-candidate', function (req, res) {
    res.render("candidate");
})

app.post('/create-candidate', async (req, res) => {
    const { first_name, last_name, email } = req.body;

    // POST REQUEST to external JSON API to Create a new Candidate for Campaign ID 52
    try {
        const result = await axios.post('https://tech-eval.talkpush.com/api/talkpush_services/campaigns/52/campaign_invitations',
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
        res.redirect("/candidates")
        console.log(result.data)
    }
    catch(err) {
        res.render("errors", {err})
        console.log(err)
    }
});

// Retrieve Candidates
app.get('/candidates', async (req, res) => {
    // Retrieve all Candidates from Campaign ID 52
    try {
        const result = await axios.get('https://tech-eval.talkpush.com/api/talkpush_services/campaign_invitations?api_key=77a9113bda7ae5b92a6ef892135d4e04&filter%5Bcampaign_id%5D=52')
        const candidatesRaw = result.data.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>|/gi,'').replace(/&quot;/gi,'"')
        const candidates = JSON.parse(candidatesRaw)
        res.render('allCandidates', {candidates})
    }
    catch(err) {
        res.render("errors", {err})
        console.log(err)
    }
})

// Shortlist Candidates
app.put('/shortlist', async (req, res) => {
    const { shortlistButton } = req.body;

    try {
        const result = await axios.put("https://tech-eval.talkpush.com/api/talkpush_services/campaign_invitations/" + shortlistButton + "/shortlist?api_key=77a9113bda7ae5b92a6ef892135d4e04")
        res.redirect('/candidates')
        console.log(result)
    }
    catch(err) {
        res.render("errors", {err})
        console.log(err)
    }
})

// Server Port Setup
app.listen("3000", function () {
    console.log("Server started at port 3000.");
});