import React from "react";
import { useQuery } from "react-query";
import PageLayout from "../../components/page-layout";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import { Card, CardContent, Typography } from "@material-ui/core";

const LocationPage: React.FunctionComponent<{}> = () => {
  const { isLoading, error, data } = useQuery("locations", async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return data;
  });

  return (
    <PageLayout>
      <h1>Location Page</h1>
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
