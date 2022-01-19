export const todoService = {
    getTasks: async () => {
        const res = await fetch('/api/items');

        if (!res.ok) {
            throw new Error(`ERROR: Fetch items. ${res.status}`);
        }
        const data = await res.json();
        return data;
    }
}
