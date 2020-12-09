import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";
import PageLayout from "../../components/page-layout";

// Approach 3: SSR  (the page HTML is generated on each request,
// it will be slower because the page cannot be cached by a CDN,
// but the pre - rendered page will always be up - to - date.)
function ShipmentsPage(props: any) {
  const data = props.users;

  return (
    <PageLayout>
      <h1>Shipments Page</h1>
      <h3> SSR (the page HTML is generated on each request)</h3>
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

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const data = await fetch("http://localhost:3001/users").then((res) =>
    res.json()
  );

  // Pass data to the page via props
  return { props: { users: data.users } };
}

export default ShipmentsPage;
