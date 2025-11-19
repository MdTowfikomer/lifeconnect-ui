import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import twilio from 'twilio';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Middleware for Twilio webhook requests

// Placeholder for patient data and responder contact
const responders = {
  '12345': '+918074741601' // Example: patientId: responderPhoneNumber
}

import { twilioService } from './services/twilio.service';

app.get('/api', (req: Request, res: Response) => {
  res.send('Hello from the LifeConnect Backend!');
});

/**
 * This endpoint is called by Twilio when it initiates a voice call.
 * It generates a dynamic TwiML response.
 */
app.post('/api/voice', (req: Request, res: Response) => {
  const { patientId } = req.query;
  
  const twiml = new twilio.twiml.VoiceResponse();
  
  const message = `This is an emergency alert from Life Connect for patient ${patientId || 'unknown'}. Please check your SMS for location details. Repeating. This is an emergency alert for patient ${patientId || 'unknown'}.`;
  
  twiml.say(message);
  
  res.type('text/xml');
  res.send(twiml.toString());
});

app.post('/api/send-alert', async (req: Request, res: Response) => {
  const { patientId, location }: { patientId: string; location: { lat: number, lng: number } } = req.body;

  console.log(`Alert received for patient ${patientId} at location:`, location);

  const responderPhone = responders[patientId as keyof typeof responders];

  if (!responderPhone) {
    console.error("Execution stopped: Responder phone number not found.");
    return res.status(404).json({ message: 'No responder found for this patient.' });
  }
  console.log("Step 1: Responder found.");

  // --- Construct dynamic URLs ---
  const publicUrl = process.env.PUBLIC_URL;
  if (!publicUrl || publicUrl.includes('your-public-ngrok-url')) {
    const errorMessage = 'CRITICAL: PUBLIC_URL environment variable is not set or is still a placeholder. Cannot create voice call URL.';
    console.error(errorMessage);
    return res.status(500).json({ message: errorMessage });
  }
  console.log("Step 2: PUBLIC_URL found and is valid.");

  const locationString = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
  const alertMessage = `Emergency from LifeConnect: Patient ${patientId} needs assistance. Location: ${locationString}`;
  const voiceUrl = `${publicUrl}/api/voice?patientId=${patientId}`;

  console.log(`Step 3: Using voice URL: ${voiceUrl}`);
  console.log("Attempting to send alerts...");

  try {
    await twilioService.sendSMS(responderPhone, alertMessage);
    await twilioService.makeCall(responderPhone, voiceUrl);
    console.log(`Sending alert to ${responderPhone}`);
    res.status(200).json({ message: 'Alert processed successfully. SMS and call will be sent.' });
  } catch (error) {
    console.error('Failed to send alert:', error);
    let errorMessage = 'An unknown error occurred.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({ message: 'Failed to send alert.', error: errorMessage });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
