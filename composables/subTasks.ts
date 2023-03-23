





export const getSubTaskDoneLength = (subTask: any) => {
    return subTask.filter((task: any) => task.done === true).length;
}



export const getSubTaskDoneInPercent = (subTask: any) => {
    const getDoneLength = getSubTaskDoneLength(subTask);
    return Math.floor((getDoneLength / subTask.length) * 100)
}