// const { users } = storeToRefs(useUsersStore());

// import { usePartnerStore } from "~/stores/partners"

// const { organizations } = storeToRefs(useOrganizationsStore())
const { band } = storeToRefs(useBandStore())
const { partner } = storeToRefs(usePartnerStore())

export const translateName = (sharerType, sharerID) => {
    if(sharerType && sharerID) {
        console.log(sharerType, sharerID)
        // USER
        if(sharerType === 'user') {
            if(partner.value) {
                console.log(partner.value)       
                let user = partner.value.find(user => user.userId === sharerID)
                return `${user?.surname} ${user?.name[0]}. ${user?.middleName[0]}.`
            }
        } 
        // COMPANY
        if(sharerType === 'conspirator'){
            console.log(band.value)
            if(band.value) {
                let company = band.value.find(company => company.id === sharerID)
                return `${company?.name}`
            }
        } 
        // ПРОЧЕЕ
        else {
            return `${sharerType}-${sharerID}`
        }
    }
    else {
        return 'Не указан'
    }
}