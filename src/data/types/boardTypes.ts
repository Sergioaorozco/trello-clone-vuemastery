interface Board {
    columns: Column[];
}

interface Column {
    id: string,
    name: string,
    tasks: Task[];
}

interface Task {
    name: string | null,
    id: string | null,
    description: string | null
}