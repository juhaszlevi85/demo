import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";
import PageLayout from "../../components/page-layout";

// Approach 2: Static generation (with data -> fetches data on pre-render)
function InventoriesPage(props: any) {
  const data = props.users;

  return (
    <PageLayout>
      <h1>Static generation example</h1>
      <h3>Static generation (with data, fetches data on pre-render)</h3>
      <Grid container>
        {/* {isLoading && <Grid item>Loading...</Grid>} */}
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
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get users
  const data = await fetch("http://localhost:3001/users").then((res) =>
    res.json()
  );

  // By returning { props: { users } }, the component
  // will receive `users` as a prop at build time
  return {
    props: {
      users: data.users,
    },
  };
}

export default InventoriesPage;
