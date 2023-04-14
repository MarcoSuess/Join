export interface Task {
    id: string,
    title: string,
    description?: string
    category: string,
    assignedTo: string[],
    dueDate: Date,
    prio: string,
    subTasks?: string[]
    status: string
}




