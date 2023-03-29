export const filterUserFromID = (id: string): any => {
    const filterUser = useUserStore().allUsers.filter((user) => user.id == id);
    return filterUser[0]
}


export const getUserFullNameAbbrByID = (id: string) => {
    const getUserByID = filterUserFromID(id);
    return getUserByID.firstName.charAt(0) + getUserByID.lastName.charAt(0);
}


export const getUserFullNameAbbr = (firstName: string, lastName: string) => {
        return firstName.charAt(0) + lastName.charAt(0);
}





