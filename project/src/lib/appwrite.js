import {Client, Databases} from 'appwrite'

const client = new Client();

const db = new Databases(client);

client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("651c17501139519bc5a2")
    
export default db