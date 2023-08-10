import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Auth0Provider
      domain="dev-f0xoepuyu2bnmb4k.us.auth0.com"
      clientId="dtyhDePMgfwbcEHl7IsbF85gOJctfaqj"
      useRefreshTokens={true}
      authorizationParams={{
        redirect_uri: 'http://localhost:3000/callback',
        audience: "https://dev-f0xoepuyu2bnmb4k.us.auth0.com/api/v2/",
        scope: "read:current_user update:current_user_metadata",
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
);
