import { Grid, MenuItem, MenuList } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Head from "next/head";
import Link from "next/link";
import React, { ReactNode } from "react";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: "100%",
    padding: "0 30px",
    "& a": {
      width: "100%",
    },
  },
});

interface PageLayoutProps {
  children?: ReactNode;
  title?: string;
  headerTitle?: string;
  selectedKey?: string;
  hasBackButton?: boolean;
  headerButtons?: React.ReactNode;
}

const PageLayout = (props: PageLayoutProps) => {
  const { children } = props;

  const classes = useStyles();

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid container style={{ height: "100vh" }}>
        <Grid item xs={3} className={classes.root}>
          <MenuList>
            <MenuItem>
              <Link href="/profile">
                <a>Profile</a>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="/locations">
                <a>Locations</a>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="/inventories">
                <a>Inventories</a>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="/shipments">
                <a>Shipments</a>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="/quotes">
                <a>Quotes</a>
              </Link>
            </MenuItem>
          </MenuList>
        </Grid>
        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </div>
  );
};

export default PageLayout;
