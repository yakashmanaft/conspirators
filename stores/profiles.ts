import { defineStore } from "pinia";

type Profile = {
    // id: string;
    // uuid: string;
    userId: number,
    // email: string;
    // password: string;
    // name: string;
    // middleName: string;
    // phone: string;
    // surname: string;
    // role: string
}

export const useProfileStore = defineStore('Profiles', () => {
    // Create state for holding users
    const profiles = ref<Profile[]>([])

    //** Function to load user data */
    const loadData = async () => {
        try {
            // Fetch data from the server
            profiles.value = await $fetch('/api/profile/profile')
        } catch (error: any) {
            alert({

                toString: function () {
                    return `Error: ${error.data.message}`
                }
            })
        }
    }

    return {
        profiles, loadData
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUsersStore, import.meta.hot))
}