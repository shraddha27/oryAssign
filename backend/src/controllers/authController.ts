import { Request, Response } from 'express';
//import oryService from '../services/oryService';

import { FrontendApi, Configuration } from '@ory/client';
import fs from "fs";

const oryConfig = JSON.parse(fs.readFileSync("ory-config.json", "utf-8"));

const ory = new FrontendApi(new Configuration({
    basePath: "https://jolly-bhabha-sq17gq6hso.projects.oryapis.com",
    apiKey: "ory_pat_RsDRiDDgbfdrr0SEPp1sGE2nApltrEuB"
}));

export const login = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
      // Step 1: Create the browser login flow
      const flowResponse: any = await ory.createBrowserLoginFlow( {
        via:email});
      console.log("flowResponse",flowResponse);
  
      // Step 2: Update the login flow with email for passwordless login
      const updatedFlow = await ory.updateLoginFlow(flowResponse.data.id, {
        method: 'link'
      });
  
      res.json({ message: "Check your email for the magic link", flow: updatedFlow.data });
    } catch (error) {
      console.error('Error during passwordless login:', error);
      res.status(500).json({ error: 'Passwordless login failed' });
    }
};

export const googleAuth = async (req: Request, res: Response) => {
    try {
        // Step 1: Create the browser login flow
        const flowResponse = await ory.createBrowserLoginFlow();
    
        // Step 2: Construct the Google OAuth URL
        const googleOAuthUrl = `https://jolly-bhabha-sq17gq6hso.projects.oryapis.com/self-service/login/browser?flow=${flowResponse.data.id}&provider=google`;
    
        // Step 3: Redirect the user to Google OAuth via Ory
        res.redirect(googleOAuthUrl);
      } catch (error) {
        console.error('Error during Google OAuth login flow:', error);
        res.status(500).json({ error: 'Google login failed' });
      }
};

export const protectedEndpoint = (req: Request, res: Response) => {
    res.json({ message: 'This is a protected route' });
};
