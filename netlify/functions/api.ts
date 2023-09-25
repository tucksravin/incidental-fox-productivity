
import express, { Router } from 'express';
import serverless from 'serverless-http';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
//const PORT = process.env.SERVER_PORT || 3001;
let apiToken = "";

app.use(cors());

const router = Router();

router.get('/toggl-auth', async (req, res) => {

    if(!req.headers.apitoken)
        {res.status(500).json({ error: 'Unable to fetch Toggl data' })
        return;}
    


  
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

router.get('/toggl/projects', async (req, res) => {
    console.log(req.headers)

    if(!req.headers.apitoken||!req.headers.workspaceid){
        res.status(500).json({ error: 'Unable to fetch Toggl data' })
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

/*

router.use('*', (_req, res) => {
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
*/

app.use('/api', router);

export const handler = serverless(app);
export default app;