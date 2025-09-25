import createClient from "openapi-fetch/dist/index.cjs";

import { paths } from "./apiV1/schema";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const client = createClient<paths>({
  baseUrl: API_BASE_URL,
  credentials: "include",
});

export default client;
