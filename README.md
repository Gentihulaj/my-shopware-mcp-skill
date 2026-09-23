# my-shopware-mcp-skill

An MCP server that provides the `daily-report` prompt to Claude using the instructions in `SKILL.md`. The report focuses on what needs attention in Demostore today.

## Files

```text
my-shopware-mcp-skill/
├── SKILL.md
├── package.json
├── index.js
└── README.md
```

## Requirements

- Node.js and npm.
- Claude Desktop or another MCP client that supports prompts.
- A connected Shopware integration that provides `solution25-daily-shop-check` and access to Demostore. This package supplies the prompt; the shop-check tool must be available separately.

## Install

```sh
git clone https://github.com/Gentihulaj/my-shopware-mcp-skill.git
cd my-shopware-mcp-skill
npm install
```

## Connect to Claude Desktop

Open **Settings → Developer → Edit Config** and add the following server to the existing `mcpServers` object. Replace the example path with the absolute path to your local `index.js`. Keep any existing server entries.

```json
{
  "mcpServers": {
    "shopware-daily-report-skill": {
      "command": "node",
      "args": ["/absolute/path/to/my-shopware-mcp-skill/index.js"]
    }
  }
}
```

If Claude cannot find `node`, use the absolute path to the Node.js executable as `command`. Save the configuration and fully restart Claude Desktop. See the [official local MCP server setup guide](https://modelcontextprotocol.io/docs/develop/connect-local-servers).

## Use

Select the `daily-report` prompt in your MCP client. Clients may expose prompts through menus or slash commands; the exact command depends on the client. [MCP prompt interaction model](https://modelcontextprotocol.io/specification/2025-06-18/server/prompts#user-interaction-model).

The server returns `SKILL.md` as a user message with an instruction prefix. Claude then follows the prompt to call `solution25-daily-shop-check`, select Demostore, explain warnings, and report the issues that need attention. The instructions require a read-only report and a separate user request before any fixes.

The server communicates over standard input/output. Running `node index.js` directly waits for an MCP client. Restart the server after editing `SKILL.md` so it loads the updated instructions.
