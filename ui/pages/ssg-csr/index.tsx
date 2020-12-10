import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { useMutation, useQuery, useQueryCache } from "react-query";
import PageLayout from "../../components/page-layout";

// Approach 1: Static generation + CSR
const LocationPage: React.FunctionComponent<{}> = () => {
  const queryCache = useQueryCache();

  const { isLoading, error, data } = useQuery("users", async () => {
    const response = await fetch("http://localhost:3001/users").then((res) =>
      res.json()
    );
    return response.users;
  });

  const [mutatePostUsers] = useMutation(
    (name: string) =>
      fetch("http://localhost:3001/users", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      }),
    {
      onSuccess: () => {
        queryCache.invalidateQueries("users");
      },
    }
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
      <h1>Static generation + Client side rendering example</h1>
      <h3>Static generation + CSR to fetch data</h3>
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
      <Grid container>
        {isLoading && <Grid item>Loading...</Grid>}
        {data &&
          data.map((user: any) => (
            <Grid item style={{ padding: 12 }}>
              <Card>
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {user.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </PageLayout>
  );
};

export default LocationPage;
