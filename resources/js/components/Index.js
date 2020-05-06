import React, { useState, useEffect } from "react";
import {
    Card,
    Grid,
    Button,
    Typography,
    CardContent,
    CardActions,
    CardHeader,
    IconButton
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import AppContainer from "./Common/AppContainer";

export default function Home() {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [clubs, setClubs] = useState([]);

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

    const deleteClub = clubId => {
        const url = "/api/clubs/" + clubId;

        fetch(url, {
            method: "DELETE",
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
            })
            .then(() => {
                setClubs(clubs.filter(c => c.id !== clubId));
            })
            .catch(error => alert(error));
    };

    const viewClub = clubId => {
        history.push("/viewClub?id=" + clubId);
    };

    const viewStudents = () => {
        history.push("/viewAllStudents");
    };

    const createClub = () => {
        history.push("/createClub");
    };

    return (
        <AppContainer isLoading={isLoading}>
            <div className="container">
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <h1 style={{ margin: 0 }}>LEMON</h1>
                        <Typography
                            variant="h5"
                            color="textSecondary"
                            style={{ fontWeight: "bold" }}
                        >
                            Club Management System
                        </Typography>
                        <div className="lemon-container">
                            <Typography
                                variant="body2"
                                color="textPrimary"
                                style={{ fontWeight: "bold" }}
                            >
                                Tired of only studying at school ? Join a Club
                                now !
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <img src="/assets/Banner.png" height={425}></img>
                    </Grid>
                </Grid>
            </div>
            <div className="container ">
                <div className="lemon-heading-title">
                    <span>CLUBS</span>
                </div>
            </div>
            <div className="container ">
                <Grid container spacing={1}>
                    {clubs && clubs?.length > 0 ? (
                        clubs.map(club => {
                            return (
                                <Grid item md={4} key={club?.id}>
                                    <Card>
                                        <CardHeader
                                            title={club?.name}
                                            subheader={`
                                                    Total
                                                    ${club?.students?.data
                                                        ?.length || 0}
                                                    members`}
                                            action={
                                                <IconButton
                                                    onClick={() =>
                                                        deleteClub(club?.id)
                                                    }
                                                >
                                                    <Delete fontSize="small" />
                                                </IconButton>
                                            }
                                        />
                                        <CardContent></CardContent>
                                        <CardActions>
                                            <Button
                                                size="small"
                                                color="primary"
                                                onClick={() =>
                                                    viewClub(club?.id)
                                                }
                                            >
                                                Learn More
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            );
                        })
                    ) : (
                        <Typography color="textSecondary" variant="body2">
                            No Clubs
                        </Typography>
                    )}
                </Grid>
            </div>
            <div className="container lemon-button-container">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => createClub()}
                    style={{ margin: 8 }}
                >
                    Create Club
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => viewStudents()}
                    style={{ margin: 8 }}
                >
                    View All Students
                </Button>
            </div>
        </AppContainer>
    );
}
