export interface Team {
    id: number;
    name: string;
}

export interface Project {

    id: number;

    name: string;

    description: string;

    teamName?: string;

    deadline?: string;

}