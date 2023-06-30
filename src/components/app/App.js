import React from "react";
import { NotificationContainer } from "react-notifications";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomePage } from "../../pages/homePage";
import { LoggedPage } from "../../pages/loggedPage";

import { Register } from "../../pages/users/register";
import { Logout } from "../../pages/users/logout";

import { GroupData } from "../../pages/groups/groups";
import { EditGroup } from "../../pages/groups/editGroup";

import { Assigns } from "../../pages/tasks/assigns";
import { TaskData } from "../../pages/tasks/tasks";
import { Timer } from "../../pages/tasks/timer";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<LoggedPage />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/groups" element={<GroupData />} />
                <Route path="/tasks" element={<TaskData />} />
                <Route path="/group/:group_id" element={<EditGroup />} />
                <Route path="/assigns/:group_id" element={<Assigns />} />
                <Route path="/timer/:assign_id" element={<Timer />} />
            </Routes>
            <NotificationContainer />
        </BrowserRouter>
    );
};