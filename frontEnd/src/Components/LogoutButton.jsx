import { Button } from "antd";

export default function LogoutButton({logout}) {


  return <Button onClick={logout}>Logout</Button>;
}

/* ```
Login Process
1. Press Login
  -login modal opens
2. Login modal sends user signin info
  -if exists make a session - call to api to save session
  -if not exists make a user and a session - call to api to create user and save session
```*/