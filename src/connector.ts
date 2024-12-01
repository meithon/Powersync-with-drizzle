import { UpdateType } from '@powersync/web';

export class Connector {

  constructor() {
    // Setup a connection to your server for uploads
    // this.serverConnectionClient = TODO;
  }

  async fetchCredentials() {
    // Implement fetchCredentials to obtain a JWT from your authentication service.
    // See https://docs.powersync.com/installation/authentication-setup
    // If you're using Supabase or Firebase, you can re-use the JWT from those clients, see
    // - https://docs.powersync.com/installation/authentication-setup/supabase-auth
    // - https://docs.powersync.com/installation/authentication-setup/firebase-auth
    return {
      endpoint: '[Your PowerSync instance URL or self-hosted endpoint]',
      // Use a development token (see Authentication Setup https://docs.powersync.com/installation/authentication-setup/development-tokens) to get up and running quickly
      token: 'An authentication token'
    };
  }

  async uploadData(database) {
    // Implement uploadData to send local changes to your backend service.
    // You can omit this method if you only want to sync data from the database to the client

    // See example implementation here: https://docs.powersync.com/client-sdk-references/javascript-web#3-integrate-with-your-backend
  }
}
