import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { Navbar } from "../components/navbar";
import { Player } from "../components/player";
import Head from "next/head";
import { useTypedSelector } from "../hooks/useTypedSelector.hook";

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
}

const MainLayout = ({
  children,
  title,
  description,
  keywords,
}: MainLayoutProps) => {
  const state = useTypedSelector((state) => state.player);
  useEffect(() => {
    console.log(state);
  }, [state.pause, state.active]);
  return (
    <>
      <Head>
        <title>{title || "Music platform"}</title>
        <meta
          name="description"
          content={"Music platform.Best songs" + description}
        />
        <meta name="robots" content="index follow" />
        <meta name="keywords" content={keywords || "Music, songs, artists"} />
      </Head>
      <Navbar />
      <Container style={{ margin: "90px auto" }}>{children}</Container>
      <Player />
    </>
  );
};

export default MainLayout;
