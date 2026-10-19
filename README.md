# User Directory

A small React application that fetches users from the [JSONPlaceholder users API](https://jsonplaceholder.typicode.com/users) and displays each person's name, email address, and company.

## Assessment requirements

- Fetch user data with `fetch` inside a React `useEffect`.
- Display loading, success, and error states.
- Check HTTP responses and report failed requests.
- Cancel an in-flight request when the component is cleaned up.
- Use an empty effect dependency array to avoid refetching on each render.

## Run locally

Requires Node.js and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal.

## Production build

```bash
npm run build
```

Vite writes the production files to `dist/`.

## Deploy to Netlify

Connect this repository to Netlify and use these settings:

- **Build command:** `npm run build`
- **Publish directory:** `dist`

The deployed app requests data from JSONPlaceholder in the visitor's browser, so it needs access to the internet and the API.
