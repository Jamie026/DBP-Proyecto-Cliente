import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../../pages/homePage";
import { Register } from "../../pages/users/register";
import { Logout } from "../../pages/users/logout";
import { LoggedPage } from "../../pages/loggedPage";
import { GroupData } from "../../pages/groups/groups";
import { EditGroup } from "../../pages/groups/editGroup";
import { TaskData } from "../../pages/tasks/tasks";
import { NotificationContainer } from "react-notifications";

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
            </Routes>
            <NotificationContainer />
        </BrowserRouter>
    );
}