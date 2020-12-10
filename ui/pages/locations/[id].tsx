import { Card, CardContent, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { useQuery } from "react-query";
import PageLayout from "../../components/page-layout";
import { useRouter } from "next/router";

export default function Location() {
  const router = useRouter();
  const { id } = router.query;

  const { isLoading, error, data } = useQuery("locations", async () => {
    const response = await fetch(
      "http://localhost:3001/locations"
    ).then((res) => res.json());
    return response.locations;
  });

  return (
    <PageLayout>
      <h1>Location Page - {id}</h1>
    </PageLayout>
  );
}
