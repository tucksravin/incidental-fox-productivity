//togglServer.ts
//on changes run npm run build:functions to compile

import express from 'express';
import serverless from 'serverless-http';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
//const PORT = process.env.SERVER_PORT || 3001;
let apiToken = "";

app.use(cors());

const router = express.Router();

router.get('/auth', async (req, res) => {

  if (!req || !req.headers || !req.headers.apitoken) {
    res.status(500).json({ error: 'Unable to fetch Toggl data, missing headers or api token' });
    return;
  }

  
  try {
    const response = await axios.get('https://api.track.toggl.com/api/v9/me', {
      auth: {
        username:  req.headers.apitoken.toString(),
        password: 'api_token',
      },
    });

    res.json(response.data);
  } catch (error) {
    //console.log("call failed from server," + req.headers.apitoken.toString())
    //console.error(error);
    res.status(500).json({ error: 'Unable to fetch Toggl data' });
  }
});

router.get('/projects', async (req, res) => {
    console.log(req.headers)

    if (!req || !req.headers || !req.headers.apitoken || !req.headers.workspaceid) {
      res.status(500).json({ error: 'Unable to fetch Toggl data' });
      return;
    }


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


router.get('/time-entries', async (req, res) => {

  if (!req || !req.headers || !req.headers.apitoken || !req.headers.date) {
    res.status(500).json({ error: 'Unable to fetch Toggl data, missing headers or api token' });
    return;
  }

  
  try {
    const response = await axios.get('https://api.track.toggl.com/api/v9/me/time_entries/?start_date='+req.headers.date, {
      auth: {
        username:  req.headers.apitoken.toString(),
        password: 'api_token',
      },
    });

    res.json(response.data);
  } catch (error) {
    //console.log("call failed from server," + req.headers.apitoken.toString())
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch Toggl data' });
  }
});

app.use('/.netlify/functions/togglServer', router);

export const handler = serverless(app);
