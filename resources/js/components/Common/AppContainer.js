import React, { useState, useEffect } from "react";
import { Box, Container, CircularProgress, Grid } from "@material-ui/core";
import Header from "./Header";
import Footer from "./Footer";

export default function AppContainer(prop) {
    const { children, isLoading } = prop;

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(isLoading);
    }, [isLoading]);

    return (
        <>
            <Header />
            <Box
                style={{
                    height: "100%",
                    minHeight: "100vh",
                    width: "100%",
                    paddingBottom: 25
                }}
            >
                <Container style={{ paddingTop: "80px" }}>
                    {loading ? (
                        <Grid
                            container
                            alignItems="center"
                            justify="center"
                            style={{ height: "80vh" }}
                        >
                            <CircularProgress className="flex-center" />
                        </Grid>
                    ) : (
                        children
                    )}
                </Container>
            </Box>
            <Footer />
        </>
    );
}
