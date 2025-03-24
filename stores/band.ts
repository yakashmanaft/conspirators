import { defineStore } from "pinia";

type Band = {
    id: number;
    // uuid: string;
    name: string;
    sharers: JSON;
    created_at: string;
    update_at: string;
}

export const useBandStore = defineStore('Band', () => {
    // Create state for holding organizations
    const band = ref<Band[]>([])

    //** Function to load organizations data */
    const loadBandData = async () => {
        try {
            // Fetch data from the server
            band.value = await $fetch('/api/band/band')
        } catch (error: any) {
            alert({
                toString: function () {
                    return `Error: ${error.data.message}`
                }
            })
        }
    }

    return {
        band, loadBandData
    } 
})

if(import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useOrganizationsStore, import.meta.hot))
}