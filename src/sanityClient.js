import {createClient} from "@sanity/client";

export const client = createClient({
  projectId: "p8pyoizx",
  dataset: "production",
  apiVersion: "2026-05-05",
  useCdn: true,
});