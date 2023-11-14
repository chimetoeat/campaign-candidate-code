import express from 'express'
import ejs from 'ejs'
import axios from 'axios'
import methodOverride from 'method-override'

const app = express();
app.set("view engine", "ejs");
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended : true}));
app.use(express.json());


app.get("/", function (req, res) {
    res.redirect("/candidates");
})

// Create Candidate
app.get('/create-candidate', function (req, res) {
    res.render("candidate");
})

app.post('/create-candidate', async (req, res) => {
    const { first_name, last_name, email } = req.body;

    // FOR TESTING - Change Campaign ID if needed. In this example it's 52.
    try {
        const response = await axios.post('https://tech-eval.talkpush.com/api/talkpush_services/campaigns/58/campaign_invitations',
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
    }
    catch(err) {
        res.render("errors", {err})
    }
});

// Retrieve Candidates
app.get('/candidates', async (req, res) => {
    // FOR TESTING - Change Campaign ID if needed. In this example it's 52.
    try {
        const response = await axios.get('https://tech-eval.talkpush.com/api/talkpush_services/campaign_invitations?api_key=77a9113bda7ae5b92a6ef892135d4e04&filter%5Bcampaign_id%5D=58')
        
        // Cleaning up of HTML-encoded parts in the response data
        const candidatesRaw = response.data.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>|/gi,'').replace(/&quot;/gi,'"')
        const candidates = JSON.parse(candidatesRaw)

        res.render('allCandidates', {candidates})
    }
    catch(err) {
        res.render("errors", {err})
    }
})

// Shortlist Candidates
app.put('/shortlist', async (req, res) => {
    const { shortlistButtonID } = req.body;

    try {
        const response = await axios.put("https://tech-eval.talkpush.com/api/talkpush_services/campaign_invitations/" + shortlistButtonID + "/shortlist?api_key=77a9113bda7ae5b92a6ef892135d4e04")
        res.redirect('/candidates')
    }
    catch(err) {
        res.render("errors", {err})
    }
})

// Create Campaign
app.get("/campaign", function (req, res) {
    res.render("campaign");
})

app.post('/campaign', async (req, res) => {
        const { campaign_title } = req.body;

        // POST REQUEST to TalkPush API to Create a new Campaign
        try {
            const response = await axios.post('https://tech-eval.talkpush.com/api/talkpush_services/campaigns',
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
            res.redirect('/candidates')
        }
        catch(err) {
            res.render("errors", {err})
        }
  });

// Server Port Setup
app.listen("3000", function () {
    console.log("Server started at port 3000.");
});

export default app