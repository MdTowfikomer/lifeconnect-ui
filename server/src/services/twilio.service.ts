import twilio from 'twilio';

class TwilioService {
  private client: twilio.Twilio;
  private twilioPhoneNumber: string;

  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    this.twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER || '';

    if (!accountSid || !authToken) {
      throw new Error('Twilio Account SID and Auth Token must be provided in environment variables.');
    }
    if (!this.twilioPhoneNumber) {
        throw new Error('Twilio Phone Number must be provided in environment variables.');
      }

    this.client = twilio(accountSid, authToken);
  }

  async sendSMS(to: string, message: string): Promise<void> {
    try {
      await this.client.messages.create({
        body: message,
        to: to,
        from: this.twilioPhoneNumber,
      });
      console.log(`SMS sent to ${to}`);
    } catch (error) {
      console.error(`Error sending SMS to ${to}:`, error);
      throw error;
    }
  }

  async makeCall(to: string,  twimlUrl: string): Promise<void> {
    try {
      await this.client.calls.create({
        url: twimlUrl, 
        to: to,
        from: this.twilioPhoneNumber,
      });
      console.log(`Call initiated to ${to}`);
    } catch (error) {
      console.error(`Error making call to ${to}:`, error);
      throw error;
    }
  }
}

export const twilioService = new TwilioService();
