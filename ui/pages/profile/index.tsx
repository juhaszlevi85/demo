import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { useMutation } from "react-query";
import PageLayout from "../../components/page-layout";

const ProfilePage: React.FunctionComponent<{}> = () => {
  const [mutatePostUsers] = useMutation((name: string) =>
    fetch("http://localhost:3001/users", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
  );

  const [name, setName] = React.useState("");

  const handleChange = (event: any) => {
    setName(event.target.value);
  };

  const addUser = async () => {
    await mutatePostUsers(name).then(() => setName(""));
  };

  return (
    <PageLayout>
      <h1>Profile Page</h1>
      <div style={{ padding: 10 }}>
        <TextField
          id="standard-basic"
          label="User name"
          value={name}
          onChange={handleChange}
        />
        <Button variant="contained" onClick={addUser} style={{ margin: 10 }}>
          Add user
        </Button>
      </div>
    </PageLayout>
  );
};

export default ProfilePage;
