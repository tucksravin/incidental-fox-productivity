//togglServer.ts
//on changes run npm run build:functions to compile

import express from 'express';
import serverless from 'serverless-http';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import { DateTime } from 'luxon';

dotenv.config();

const app = express();
//const PORT = process.env.SERVER_PORT || 3001;
let apiToken = "";

app.use(cors());

const router = express.Router();

router.get('/auth', async (req, res) => {

  if (!req || !req.headers || !req.headers.apitoken) {
    res.status(500).json({ error: 'Unable to fetch Toggl data, missing headers or api token, auth' });
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
      res.status(500).json({ error: 'Unable to fetch Toggl data, check headers, projects' });
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

  if (!req) {
    res.status(500).json({ error: 'Unable to fetch Toggl data, missing request' });
    return;
  }

  if (!req.headers ) {
    res.status(500).json({ error: 'Unable to fetch Toggl data, missing headers object,' });
    return;
  }

  if ( !req.headers.apitoken) {
    res.status(500).json({ error: 'Unable to fetch Toggl data, missing api token,' });
    return;
  }
  
  if (!req.headers.requested_date) {
    res.status(500).json({ error: 'Unable to fetch Toggl data, missing requested_date header,' });
    return;
  }

  let givenDateString = "";

  if(Array.isArray(req.headers.requested_date)) {
      givenDateString = req.headers.requested_date.join('')
  } else{
    givenDateString = req.headers.requested_date;
  }


  let givenDay = DateTime.fromISO(givenDateString);
  console.log(givenDateString);

  let nextDay = givenDay.plus({days:1}).setZone("America/New_York");
  //^the request fails without manually setting a non-UTC timezone^
  //

  let nextDateString = nextDay.toISO();

  //console.log('https://api.track.toggl.com/api/v9/me/time_entries?start_date='+givenDateString+'&end_date='+nextDateString)

  
  try {
    const response = await axios.get('https://api.track.toggl.com/api/v9/me/time_entries?start_date='+givenDateString+'&end_date='+nextDateString, {
      auth: {
        username:  req.headers.apitoken.toString(),
        password: 'api_token',
      },
    });

    console.log(response.data);

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch Toggl data, ' + error });
  }
});

app.use('/.netlify/functions/togglServer', router);

export const handler = serverless(app);
