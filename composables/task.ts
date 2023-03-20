export interface Task {
    title: string,
    description?: string
    category: string,
    assignedTo: string[],
    dueDate: Date,
    prio: string,
    subTasks?: string[]
    status: TaskStatus
}




export enum TaskStatus {
    Todo,
    InProgress,
    AwaitingFeedback,
    Done
    
}