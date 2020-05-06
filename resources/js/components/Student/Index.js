import React, { useState, useEffect } from "react";
import {
    Card,
    Grid,
    Button,
    Typography,
    CardActions,
    CardHeader,
    IconButton,
    FormGroup,
    FormControlLabel,
    Checkbox
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import AppContainer from "../Common/AppContainer";

export default function ViewAllStudents() {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [activeClubs, setActiveClubs] = useState([]);

    useEffect(() => {
        const getStudentsUrl = "/api/students";

        fetch(getStudentsUrl, {
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
                setStudents(body.data);
                handleFilterByClub(body.data);
                setIsLoading(false);
            })
            .catch(error => alert(error));
    }, []);

    const handleFilterByClub = students => {
        let activeClubs = [];

        if (students) {
            const map = new Map();
            for (const item of students) {
                if (!map.has(item.club.id)) {
                    map.set(item.club.id, true);
                    activeClubs.push({
                        id: item.club.id,
                        name: item?.club?.name,
                        checked: false
                    });
                }
            }
        }

        setActiveClubs(activeClubs);
        setFilteredStudents(students);
    };

    const handleChange = event => {
        let allClubs = activeClubs;
        let allChecked = true;

        allClubs.map(club => {
            if (club.id === parseInt(event.target.value)) {
                club.checked = event.target.checked;
            }
            if (club.checked) {
                allChecked = false;
            }
        });
        setActiveClubs(allClubs);
        if (!allChecked) {
            let updatedStudents = [];
            allClubs.map(club => {
                if (club.checked) {
                    const afterFilter = students.filter(student => {
                        return student.club_id === parseInt(club.id);
                    });
                    updatedStudents = updatedStudents.concat(afterFilter);
                }
            });

            setFilteredStudents(updatedStudents);
        } else {
            setFilteredStudents(students);
        }
    };

    const deleteStudent = studentId => {
        const url = "/api/students/" + studentId;

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
                setStudents(students.filter(s => s.id !== studentId));
            })
            .catch(error => alert(error));
    };

    const viewStudent = studentId => {
        history.push("/viewStudent?id=" + studentId);
    };

    const createStudent = () => {
        history.push("/createStudent");
    };

    return (
        <AppContainer isLoading={isLoading}>
            <div className="container ">
                <div className="lemon-heading-title">
                    <span>Filtered by Active Clubs</span>
                </div>
            </div>
            <div className="container ">
                <FormGroup style={{ flexDirection: "row" }}>
                    {activeClubs &&
                        activeClubs?.length > 0 &&
                        activeClubs.map((club, index) => {
                            return (
                                <FormControlLabel
                                    key={index}
                                    control={
                                        <Checkbox
                                            checked={club?.checked}
                                            onChange={event =>
                                                handleChange(event)
                                            }
                                            name={club?.name}
                                            value={club?.id}
                                        />
                                    }
                                    label={club?.name}
                                />
                            );
                        })}
                </FormGroup>
            </div>
            <div className="container ">
                <div className="lemon-heading-title">
                    <span>STUDENTS ({students?.length || 0})</span>
                </div>
            </div>
            <div className="container ">
                <Grid container spacing={1}>
                    {students && students?.length > 0 ? (
                        filteredStudents && filteredStudents?.length > 0 ? (
                            filteredStudents.map(student => {
                                return (
                                    <Grid item md={4} key={student?.id}>
                                        <Card>
                                            <CardHeader
                                                title={student?.name}
                                                subheader={student?.club?.name}
                                                action={
                                                    <IconButton
                                                        onClick={() =>
                                                            deleteStudent(
                                                                student?.id
                                                            )
                                                        }
                                                    >
                                                        <Delete fontSize="small" />
                                                    </IconButton>
                                                }
                                            />
                                            <CardActions>
                                                <Button
                                                    size="small"
                                                    color="primary"
                                                    onClick={() =>
                                                        viewStudent(student?.id)
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
                                No Student in this club
                            </Typography>
                        )
                    ) : (
                        <Typography color="textSecondary" variant="body2">
                            No Students
                        </Typography>
                    )}
                </Grid>
            </div>
            <div className="container lemon-button-container">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => createStudent()}
                    style={{ margin: 8 }}
                >
                    Create Student
                </Button>
            </div>
        </AppContainer>
    );
}
