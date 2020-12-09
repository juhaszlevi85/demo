import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";
import PageLayout from "../../components/page-layout";

// Approach 4: Incremental static generation (update existing pages by re-rendering them in the background as traffic comes in)
function QuotesPage(props: any) {
  const data = props.users;

  return (
    <PageLayout>
      <h1>Quotes Page</h1>
      <h3>
        Incremental Static generation (update existing pages by re-rendering
        them in the background as traffic comes in, background regeneration
        ensures traffic is served uninterruptedly, always from static storage,
        and the newly built page is pushed only after it's done generating.)
      </h3>
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

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
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
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
}

export default QuotesPage;
