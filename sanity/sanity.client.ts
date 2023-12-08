import { createClient, type ClientConfig } from "@sanity/client";

const config: ClientConfig = {
  projectId: process.env.SANITY_API_PROJECT_ID,
  dataset: "production",
  apiVersion: "2023-09-26",
  token: process.env.SANITY_API_WRITE_TOKEN,
  /* useCdn: false, */
};

const client = createClient(config);

export default client;