## Sign in Button

Here we implement the login with wallet flow using the ConnectWallet button.

## Setup

To run the project, first clone this repository, and then run one of the following commands to install the dependencies:

```bash
npm install
# or
yarn install
```

Next, you need to create a `.env.local` file and add the `PRIVATE_KEY` variable to it with the private key of the wallet you want to use as the admin wallet to generate and verify payloads. Your file should use something like the following:

```.env
PRIVATE_KEY=...
```

Finally, you can run the project with one of the following commands:

```bash
npm run dev
# or
yarn dev
```

Now, you can navigate to [http://localhost:3000](http://localhost:3000) to visit the client side page where you can connect a wallet, sign-in with eth and view the payload, and use the payload to authenticate with the backend.

## How It Works

Using [Auth](https://docs.web3sdks.com/auth), we ask users to sign in using their web3 wallet.

We need to create a configuration file that contains our wallet's private key (used to generate messages for users to sign) and our site's domain name:

This file is called `auth.config.js` and is at the root of the project.

```jsx
import { Web3sdksAuth } from "@web3sdks/auth/next";
import { domainName } from "./const/yourDetails";

export const { Web3sdksAuthHandler, getUser } = Web3sdksAuth({
  privateKey: process.env.PRIVATE_KEY,
  domain: domainName,
});
```

Finally, we have a [catch-all API route](https://nextjs.org/docs/api-routes/dynamic-api-routes#catch-all-api-routes) called `pages/api/auth/[...web3sdks].js`, which exports the `Web3sdksAuthHandler` to manage all of the required auth endpoints like `login` and `logout`.

```jsx
import { Web3sdksAuthHandler } from "../../../auth.config";

export default Web3sdksAuthHandler();
```

### Setting Up the Auth SDK

Inside the [\_app.jsx](./pages/_app.jsx) file, we configure the Auth SDK in the `Web3sdksProvider` component that wraps our application, allowing us to use the hooks of the SDK throughout our application:

```jsx
  <Web3sdksProvider
      desiredChainId={activeChainId}
      authConfig={{
        domain: "example.org",
        authUrl: "/api/auth",
        loginRedirect: "/",
      }}
    >
```

### Passing auth prop into the ConnectWallet component

We pass in the auth prop in the `ConnectWallet` which is an object. I am just passing the `loginOptional` parameter but you can customize it however you want. You can see the parameters [here](https://docs.web3sdks.com/ui-components/connectwalletbutton#with-auth)

```jsx
<ConnectWallet
  auth={{
    loginOptional: false,
  }}
/>
```

## Join our Discord!

For any questions, suggestions, join our discord at [https://discord.gg/KX2tsh9A](https://discord.gg/KX2tsh9A).
