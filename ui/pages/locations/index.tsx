import { Card, CardContent, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { useQuery } from "react-query";
import PageLayout from "../../components/page-layout";

// Approach 1: Static generation + CSR
const LocationPage: React.FunctionComponent<{}> = () => {
  const { isLoading, error, data } = useQuery("locations", async () => {
    const response = await fetch("http://localhost:3001/users").then((res) =>
      res.json()
    );
    return response.users;
  });

  return (
    <PageLayout>
      <h1>Location Page</h1>
      <h3>Static generation + CSR to fetch data</h3>
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
