import { CardActionArea, CardHeader, IconButton } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Pie } from "react-chartjs-2";
import { useQuery } from "react-query";
import PageLayout from "../../components/page-layout";
import { Location } from "../../model/location";
import Router from "next/router";

const LocationsPage: React.FunctionComponent<{}> = () => {
  const { isLoading, error, data } = useQuery("locations", async () => {
    const response = await fetch(
      "http://localhost:3001/locations"
    ).then((res) => res.json());
    return response.locations;
  });

  const goToLocationPage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    Router.push({
      pathname: `/locations/${event.currentTarget.value}`,
      //   query: { id: event.currentTarget.value },
    });
    console.log("event.target = ", event.currentTarget.value);
  };

  return (
    <PageLayout>
      <h1>Location Page</h1>
      <Grid container>
        {isLoading && <Grid item>Loading...</Grid>}
        {data &&
          data.map((location: Location) => (
            <Grid item style={{ padding: 12 }}>
              <Card>
                <CardActionArea onClick={goToLocationPage} value={location.id}>
                  <CardHeader
                    title={location.name}
                    subheader={location.address}
                  ></CardHeader>
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      <Pie
                        data={{
                          labels: ["Available space", "Occupied"],
                          datasets: [
                            {
                              backgroundColor: ["#2FDE00", "#B21F00"],
                              data: [
                                Number(location.capacity) -
                                  Number(location.occupied),
                                Number(location.occupied),
                              ],
                            },
                          ],
                        }}
                        options={{
                          //   title: {
                          //     display: true,
                          //     text: "Average Rainfall per month",
                          //     fontSize: 20,
                          //   },
                          legend: {
                            display: false,
                          },
                        }}
                      />
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
    </PageLayout>
  );
};

export default LocationsPage;
