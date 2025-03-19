

export const calc_working_hours = (created_at: string, ended_at: string) => {
    return created_at === ended_at ? ' (0.00 часа)' : ` (+${(Math.abs(new Date(ended_at) - new Date(created_at)) / (1000 * 60 * 60) % 24).toFixed(2)} часа)`
}