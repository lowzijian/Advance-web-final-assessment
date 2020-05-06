import React, { useState, useEffect } from "react";
import { Button, TextField, Grid, MenuItem } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import AppContainer from "../Common/AppContainer";

export default function CreateStudent() {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);

    const [title, setTitle] = useState("");
    const [club, setClub] = useState("");
    const [clubs, setClubs] = useState([]);

    const [titleError, setTitleError] = useState("");
    const [clubError, setClubError] = useState("");

    const cancel = () => {
        history.push("/viewAllStudents");
    };

    useEffect(() => {
        const getClubsUrl = "/api/clubs";

        fetch(getClubsUrl, {
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
                setClubs(body.data);
                setIsLoading(false);
            })
            .catch(error => alert(error));
    }, []);

    const createNewStudent = () => {
        const url = "/api/students";
        const data = {
            name: title,
            club_id: club
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
                    history.replace("/viewAllStudents");
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
                    if ("club_id" in r.errors) {
                        setClubError(r.errors["club_id"]);
                    } else setClubError("");
                }
            });
    };

    return (
        <AppContainer isLoading={isLoading}>
            <div className="container">
                <h1>Create New Student</h1>
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
                                placeholder="Enter Student name"
                                helperText={titleError}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                value={title}
                                onChange={event => setTitle(event.target.value)}
                            />
                            <TextField
                                select
                                required
                                error={clubError !== ""}
                                style={{
                                    margin: 8,
                                    marginBottom: 25,
                                    width: "25ch"
                                }}
                                label="Club"
                                value={club}
                                placeholder="Enter Student new club"
                                onChange={event => setClub(event.target.value)}
                                helperText={clubError}
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            >
                                {clubs.map(option => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <div className="lemon-button-container">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="lemon-button"
                                    onClick={() => createNewStudent()}
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
