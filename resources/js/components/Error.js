import React from "react";
import { Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export default function Error() {
    const history = useHistory();

    const redirectHome = () => {
        history.replace("/");
    };

    return (
        <div
            className="container lemon-container "
            style={{ textAlign: "center" }}
        >
            <img src="/assets/404.png" width={600}></img>
            <div className="lemon-container">
                <h1>Sorry , this page isn't available</h1>
                <Typography variant="body2">
                    The page you were looking for couldn't be found.
                </Typography>
            </div>
            <Button variant="outlined" onClick={() => redirectHome()}>
                Back to Home
            </Button>
        </div>
    );
}
