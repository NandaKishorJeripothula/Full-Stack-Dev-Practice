const express = require('express')
const axios = require('axios')
const PORT = process.env.PORT||8080;
const app = express()
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

//For serving static content
app.use(express.static(__dirname + '/public'))
app.use(cors());

app.get('/oauth/redirect', (req, res) => {
  // The req.query object has the query params that
  // were sent to this route. We want the `code` param
  const requestToken = req.query.code
  axios({
    // make a POST request
    method: 'post',
    // to the Github authentication API, with the client ID, client secret
    // and request token
    url: `https://github.com/login/oauth/access_token?client_id=${process.env.clientID}&client_secret=${process.env.clientSecret}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSOn
    headers: {
      accept: 'application/json'
    }
  }).then((response) => {
    // Once we get the response, extract the access token from
    // the response body
    const accessToken = response.data.access_token
    // redirect the user to the welcome page, along with the access token
    res.redirect(`/welcome.html?=${accessToken}`)
  })
})
app.get("/getURL", async (req, res) => {
  var url = `https://github.com/login/oauth/authorize?client_id=${process.env.clientID}&redirect_uri=${process.env.redirectURL}`
  res.status(200).json({ url: url });
})
app.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT);
});
