import express from 'express';
import serverless from 'serverless-http';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';


const app = express();
app.use(cors());

app.get('/toggl-auth', async (req, res) => {

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

export const handler = serverless(app);
export default app;