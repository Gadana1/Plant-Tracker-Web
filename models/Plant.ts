export interface Plant {
    id?: number,
    name?: string,
    species?: string,
    instructions?: string,
    image?: string|File
}

export interface PlantList {
    data: Plant[],
    current_page?: number,
    per_page?: number,
    last_page?: number,
    total?: number,
}