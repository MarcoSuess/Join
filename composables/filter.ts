import { Task } from "~~/types/task";



export const multiplyFilter = (array: Task[], values: [], prop: any) => {
    if (!array || array.length <= 0) return;
    return array.filter((task: any) => {
        return values.some((value: any) => {
            return task[prop].indexOf(value) !== -1;
        });
    });
}


export const filterPrio = (array: Task[], prio: string) => {
    if (!prio) return;
    return array.filter((task) => {
        return task.prio == prio.toLowerCase();
    });
};

export const filterDueDateRange = (startDate: string, endDate: string, array: Task[]) => {
    if (!startDate && !endDate) return;

    if (startDate && endDate) {
        array.filter((task) => {
            return (
                new Date(task.dueDate) < new Date(endDate) &&
                new Date(task.dueDate) > new Date(startDate)
            );
        });
    }

    if (startDate && !endDate) {
        return array.filter((task) => {
            return new Date(task.dueDate) > new Date(startDate);
        });
    }

    if (!startDate && endDate) {
        return array.filter((task) => {
            return new Date(task.dueDate) < new Date(endDate);
        });
    }
};



export function isEmpty(obj: any) {
    for(var prop in obj) {
            if(obj[prop].length <= 0) {
                return true
            }
            
    }

    return false;
}