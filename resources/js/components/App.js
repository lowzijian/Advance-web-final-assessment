import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Index";
import Error from "./Error";
import CreateClub from "./Club/Create";
import ViewClub from "./Club/View";
import EditClub from "./Club/Edit";
import ViewAllStudents from "./Student/Index";
import ViewStudent from "./Student/View";
import CreateStudent from "./Student/Create";
import EditStudent from "./Student/Edit";

const routes = [
    { path: "/", ui: <Home />, isExact: true },
    { path: "/createClub", ui: <CreateClub /> },
    { path: "/viewClub", ui: <ViewClub /> },
    { path: "/editClub", ui: <EditClub /> },
    { path: "/viewAllStudents", ui: <ViewAllStudents />, isExact: true },
    { path: "/createStudent", ui: <CreateStudent /> },
    { path: "/viewStudent", ui: <ViewStudent /> },
    { path: "/editStudent", ui: <EditStudent /> },
    { path: "/:path", ui: <Error /> }
];

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        {routes.map(({ path, ui, isExact }, index) => (
                            <Route
                                key={"route-" + index}
                                exact={isExact}
                                path={path}
                            >
                                {ui}
                            </Route>
                        ))}
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
