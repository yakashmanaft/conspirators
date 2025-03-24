import { defineStore } from "pinia";

type Partner = {
    id: number;
    userId: number,
    surname: string;
    name: string;
    middleName: string;
    created_at: string;
    update_at: string;
}

export const usePartnerStore = defineStore('Partner', () => {
    // Create state for holding organizations
    const partner = ref<Partner[]>([])

    //** Function to load organizations data */
    const loadPartnerData = async () => {
        try {
            // Fetch data from the server
            partner.value = await $fetch('/api/partnerGuarded/partner')
        } catch (error: any) {
            alert({
                toString: function () {
                    return `Error: ${error.data.message}`
                }
            })
        }
    }

    return {
        partner, loadPartnerData
    } 
})

if(import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useOrganizationsStore, import.meta.hot))
}