export interface Repository {
    nameWithOwner?: string;
    description?: string;
    url?: string;
}

export interface User {
    name?: string;
    login?: string;
    avatarUrl?: string;
    url?: string;
}

export interface SearchData {
    search: {
        nodes: (Repository | User)[];
    };
}

export interface SearchVars {
    query: string;
}