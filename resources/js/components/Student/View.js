import React, { useState, useEffect } from "react";
import { Typography, IconButton } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router-dom";
import AppContainer from "../Common/AppContainer";

export default function ViewStudent() {
    const history = useHistory();
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(true);
    const [student, setStudent] = useState({});

    const query = new URLSearchParams(location.search);

    useEffect(() => {
        const studentId = query.get("id");
        const getStudentUrl = "/api/students/" + studentId;

        fetch(getStudentUrl, {
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
                setStudent(body.data);
                setIsLoading(false);
            })
            .catch(error => alert(error));
    }, []);

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
                history.replace("/");
            })
            .catch(error => alert(error));
    };

    const EditStudent = studentId => {
        history.push(`/editStudent?id=${studentId}`);
    };

    return (
        <AppContainer isLoading={isLoading}>
            <div className="container">
                <h1 style={{ margin: 0 }}>{student?.name} </h1>
                <Typography variant="h5" color="textSecondary">
                    | {student?.id}
                </Typography>
                <div className="lemon-container">
                    <Typography variant="body1">
                        Joined {student?.club?.name || "no club"}
                    </Typography>
                </div>
                <div className="lemon-container">
                    <IconButton onClick={() => deleteStudent(student?.id)}>
                        <Delete fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => EditStudent(student?.id)}>
                        <Edit fontSize="small" />
                    </IconButton>
                </div>
            </div>
        </AppContainer>
    );
}
