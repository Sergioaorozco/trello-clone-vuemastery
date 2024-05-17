interface Board {
    columns: Column[];
}

interface Column {
    id: string,
    name: string,
    tasks: Task[];
}

interface Task {
    name: string,
    id: string,
    description?: string
}