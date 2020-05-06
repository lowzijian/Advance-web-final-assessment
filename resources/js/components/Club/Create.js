import React, { useState } from "react";
import { Button, TextField, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import AppContainer from "../Common/AppContainer";

export default function CreateClub() {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState("");

    const cancel = () => {
        history.push("/");
    };

    const createNewClub = () => {
        const url = "/api/clubs";
        const data = {
            name: title
        };

        fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "same-origin",
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.status === 200 || response.status === 201) {
                    history.replace("/");
                    return {};
                } else if (response.status === 422) {
                    return response.json();
                } else
                    throw Error(
                        [response.status, response.statusText].join(" ")
                    );
            })
            .then(r => {
                if ("errors" in r) {
                    if ("name" in r.errors) {
                        setTitleError(r.errors["name"]);
                    } else setTitleError("");
                }
            });
    };

    return (
        <AppContainer isLoading={isLoading}>
            <div className="container">
                <h1>Create New Club</h1>
                <Grid container spacing={5}>
                    <Grid container item xs={8}>
                        <form
                            noValidate
                            autoComplete="off"
                            className="lemon-form"
                        >
                            <TextField
                                required
                                error={titleError !== ""}
                                id="standard-full-width"
                                label="Name"
                                style={{ margin: 8, marginBottom: 25 }}
                                placeholder="Enter Club name"
                                helperText={titleError}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                value={title}
                                onChange={event => setTitle(event.target.value)}
                            />
                            <div className="lemon-button-container">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="lemon-button"
                                    onClick={() => createNewClub()}
                                >
                                    Create
                                </Button>
                                <Button
                                    color="secondary"
                                    onClick={() => cancel()}
                                    className="lemon-button"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </Grid>
                    <Grid container item xs={4}>
                        <img src="assets/forms.png" height={350}></img>
                    </Grid>
                </Grid>
            </div>
        </AppContainer>
    );
}
