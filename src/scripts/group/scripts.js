import { checkErrors, validateFields } from "../common/scripts";
import { createGroup, joinGroup, groupsByUser, deleteMember, checkMemberAdmi, 
        membersByGroup, updateMemberAdmin, updateGroupData } from "../../apis/groups";

export const addGroup = async (newGroup, fields, data, setRows) => {
    const errors = validateFields(fields, data);
    if (errors.length > 0) return errors;
    const response = newGroup ? await createGroup(data) : await joinGroup(data);
    if (response.error) return [response.error];
    else {
        setRows((prevRows) => [
            ...prevRows,
            {
                id: response.data.id,
                name: newGroup ? data.name : response.data.name,
                admin: newGroup ? "Admin" : "No admin",
                members: newGroup ? 1 : response.data.members
            }
        ]);
        return [];
    }
};

export const loadGroups = async (user_id) => {
    const newRows = [];
    const response = await groupsByUser(user_id);
    if (response) {
        const { groups, members, admins } = response.data;
        groups.map((group, index) =>
            newRows.push({
                id: group.id,
                name: group.name,
                admin: admins[index] ? "Admin" : "No admin",
                members: members[index]
            })
        );
    }
    return newRows;
};

export const loadMembers = async (group_id, current_user_id = null) => {
    const newRows = [];
    const response = await membersByGroup(group_id);
    if (response) {
        let { members, admins } = response.data;
        if (current_user_id){
            members = members.filter((member) => member.id !== current_user_id) 
            admins = admins.filter((admin) => admin.user!== current_user_id)
        } 
        members.map((member, index) =>
            newRows.push({
                id: member.id,
                name: member.name,
                email: member.email,
                admin: admins[index].admin ? "Admin" : "No admin",
                actions: admins[index].admin ? "Admin" : "No admin"
            })
        );
    }
    return newRows;
};

export const changeAdmin = async (user_id, group_id, admin) => {
    const response = await updateMemberAdmin({ user: user_id, group: group_id, admin: admin })
    if (response.error) return [response.error];
    else return [];
}

export const changeGroupData = async (fields, data) => {
    const errors = validateFields(fields, data);
    if (errors.length > 0) return errors;
    const response = await updateGroupData(data);
    if (response.error) return [response.error];
    else return [];
}

export const outGroup = async (user_id, group_id) => {
    const response = await deleteMember(user_id, group_id);
    if (response.error) return [response.error];
    else return [];
};

export const checkAdmin = async (user_id, group_id) => {
    const response = await checkMemberAdmi(user_id, group_id);
    if (response.error) return false;
    else return true;
};