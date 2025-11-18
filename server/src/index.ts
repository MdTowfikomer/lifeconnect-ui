import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Placeholder for patient data and responder contact
const responders = {
  '12345': '+918074741601' // Example: patientId: responderPhoneNumber
}

import { twilioService } from './services/twilio.service';

// TODO: Replace with a publicly accessible URL for your Twilio Voice TwiML. 
// For local development, you can use ngrok to expose a local endpoint.
const TWIML_URL = 'http://demo.twilio.com/docs/voice.xml'; 

app.get('/api', (req: Request, res: Response) => {
  res.send('Hello from the LifeConnect Backend!');
});

app.post('/api/send-alert', async (req: Request, res: Response) => {
  const { patientId, location }: { patientId: string; location: string } = req.body;

  console.log(`Alert received for patient ${patientId} at location:`, location);

  const responderPhone = responders[patientId as keyof typeof responders];

  if (!responderPhone) {
    return res.status(404).json({ message: 'No responder found for this patient.' });
  }

  const alertMessage = `Emergency: Patient ${patientId} needs assistance at ${location}.`;

  try {
    await twilioService.sendSMS(responderPhone, alertMessage);
    await twilioService.makeCall(responderPhone, TWIML_URL);
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
