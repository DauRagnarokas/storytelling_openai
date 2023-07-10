# Open Ai - Text Generator

The project empowers you to create captivating stories using the power of Open AI. With customizable settings such as temperature, tokens length, tone of speech, and keywords, you have full control over your storytelling experience. Whether you have specific requirements or just want to have a fun chat with AI, this app provides an engaging and enjoyable platform.

## How it works

This app leverages the [OpenAI](https://ai.com) ChatGPT API with the `gpt-3.5-turbo` model to respond to a chain of chat messages. Users submit messages to a [SvelteKit](https://kit.svelte.dev) API Endpoint/Request Handler, which relays the messages to the ChatGPT API. The responses are then proxied back to the client via SSE (Server-Sent Events) to stream the response in real-time.

## Built with

- Framework: [SvelteKit](https://kit.svelte.dev)
- Styles/Components: [TailwindCSS](https://tailwindcss.com)

## Set up

Assign OpenAI API key to the `OPENAI_KEY` environment variable and rename file .env.example to .env

## Run Locally

To start the app, run the following command from the project's directory:

```shell
# Install dependencies
npm i

# Build the app
npm run build

# Start the server and open the app in a new browser tab
npm run preview
```

## Login

Use the following credentials to log in:

```shell
Email: demo@mail.com
Password: password
```
