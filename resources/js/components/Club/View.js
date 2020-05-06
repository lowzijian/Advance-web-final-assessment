import React, { useState, useEffect } from "react";
import { Typography, IconButton, Paper, Chip, Grid } from "@material-ui/core";
import { Delete, Edit, People } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router-dom";
import AppContainer from "../Common/AppContainer";

export default function ViewClub() {
    const history = useHistory();
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(true);
    const [club, setClub] = useState({});
    const [members, setMembers] = useState([]);

    const query = new URLSearchParams(location.search);

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
                setClub(body.data);
                setMembers(body.data.students.data);
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
                history.replace("/");
            })
            .catch(error => alert(error));
    };

    const editClub = clubId => {
        history.push(`/EditClub?id=${clubId}`);
    };

    return (
        <AppContainer isLoading={isLoading}>
            <div className="container">
                <h1>{club?.name}</h1>
                <div className="lemon-container">
                    <Chip
                        variant="outlined"
                        size="small"
                        label={`${members?.length} members` || 0}
                        style={{ margin: 5 }}
                        icon={<People />}
                    />
                </div>
                <div className="lemon-container">
                    <IconButton onClick={() => deleteClub(club?.id)}>
                        <Delete fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => editClub(club?.id)}>
                        <Edit fontSize="small" />
                    </IconButton>
                </div>
            </div>
            <div className="container ">
                <div className="lemon-heading-title">
                    <span>Members</span>
                </div>
            </div>
            <div className="container ">
                <Grid container spacing={1}>
                    {members && members.length > 0 ? (
                        members.map((student, index) => {
                            return (
                                <Grid item xs={12} key={student?.id}>
                                    <Paper
                                        style={{
                                            margin: 5,
                                            padding: 5,
                                            display: "flex"
                                        }}
                                        elevation={1}
                                        square
                                    >
                                        <Typography
                                            style={{
                                                fontWeight: "bold",
                                                flex: 1
                                            }}
                                            variant="body2"
                                        >
                                            {index + 1}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            style={{
                                                flex: 12
                                            }}
                                        >
                                            {student.name}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="textSecondary"
                                            style={{
                                                flex: 2
                                            }}
                                        >
                                            ({student.id})
                                        </Typography>
                                    </Paper>
                                </Grid>
                            );
                        })
                    ) : (
                        <Typography color="textSecondary" variant="body2">
                            No Members
                        </Typography>
                    )}
                </Grid>
            </div>
        </AppContainer>
    );
}
