import React, { useState, useEffect } from "react";
import { Button, TextField, Grid } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import AppContainer from "../Common/AppContainer";

export default function EditClub() {
    const history = useHistory();
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    const [isLoading, setIsLoading] = useState(true);
    const [clubId, setClubId] = useState("");
    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState("");

    useEffect(() => {
        const clubId = query.get("id");
        const getClubUrl = "/api/clubs/" + clubId;

        fetch(getClubUrl, {
            headers: {
                Accept: "application/json"
            },
            credentials: "same-origin"
        })
            .then(response => {
                if (!response.ok)
                    throw Error(
                        [response.status, response.statusText].join(" ")
                    );
                return response.json();
            })
            .then(body => {
                setClubId(body.data.id);
                setTitle(body.data.name);
                setIsLoading(false);
            })
            .catch(error => alert(error));
    }, []);

    const cancel = () => {
        history.replace("/ViewClub?id=" + clubId);
    };

    const editClub = () => {
        const url = "/api/clubs/" + clubId;
        const data = {
            name: title
        };

        fetch(url, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
                // Include Authorization header with Bearer token if token authentication is required...
            },
            credentials: "same-origin",
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.status === 200 || response.status === 204) {
                    history.replace("/ViewClub?id=" + clubId);
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
                <h1>Edit Club</h1>
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
                                    onClick={() => editClub()}
                                >
                                    Save Changes
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
