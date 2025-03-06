"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk"; // Correct import

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { markdownSchema } from "sanity-plugin-markdown";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema, // Use schema configuration
  plugins: [
    deskTool({ structure }), // Corrected tool
    visionTool({ defaultApiVersion: apiVersion }),
    markdownSchema(),
  ],
});
