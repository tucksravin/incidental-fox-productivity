import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';





dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 3001;
let apiToken = "";

app.use(cors());

app.get('/api/toggl-auth', async (req, res) => {


  try {
    const response = await axios.get('https://api.track.toggl.com/api/v9/me', {
      auth: {
        username:  req.headers.apitoken.toString(),
        password: 'api_token',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.log("call failed from server," + req.headers.apitoken.toString())
    //console.error(error);
    res.status(500).json({ error: 'Unable to fetch Toggl data' });
  }
});

app.get('/api/toggl/projects', async (req, res) => {
  console.log(req.headers)
  console.log('https://api.track.toggl.com/api/v9/workspaces/'+req.headers.workspaceid.toString()+'/projects')

  try {
    const response = await axios.get('https://api.track.toggl.com/api/v9/workspaces/'+req.headers.workspaceid.toString()+'/projects', {
      auth: {
        username: req.headers.apitoken.toString(),
        password: 'api_token',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch Toggl data' });
  }
});

app.use('*', (_req, res) => {
  const svelteKitAppURL = 'http://localhost:5173'; 
  axios
    .get(`${svelteKitAppURL}${_req.url}`)
    .then((response) => {
      res.status(response.status).send(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Unable to proxy request to SvelteKit app' });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
