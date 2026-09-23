#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ListPromptsRequestSchema, GetPromptRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
 
const __dirname = path.dirname(fileURLToPath(import.meta.url));
 
// Read your SKILL.md file contents
const skillPath = path.join(__dirname, "SKILL.md");
const skillContent = fs.readFileSync(skillPath, "utf-8");
 
const server = new Server(
  { name: "shopware-daily-report-skill", version: "1.0.0" },
  { capabilities: { prompts: {} } }
);
 
// 1. Tell Claude what prompts/skills are available
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [
      {
        name: "daily-report",
        description: "Report what needs attention in Demostore today - products out of stock, stuck orders, etc.",
      }
    ]
  };
});
 
// 2. Deliver the SKILL.md content when Claude requests it
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  if (request.params.name !== "daily-report") {
    throw new Error("Prompt not found");
  }
 
  return {
    description: "Daily shop report instructions for Demostore",
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `Please act according to these instructions:\n\n${skillContent}`
        }
      }
    ]
  };
});
 
// Start the server over standard input/output
const transport = new StdioServerTransport();
await server.connect(transport);
