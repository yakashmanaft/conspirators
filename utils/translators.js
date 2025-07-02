// const { users } = storeToRefs(useUsersStore());

// import { usePartnerStore } from "~/stores/partners"

// const { organizations } = storeToRefs(useOrganizationsStore())
const { band } = storeToRefs(useBandStore())
const { partner } = storeToRefs(usePartnerStore())

const translateName = (sharerType, sharerID) => {
    if(sharerType && sharerID) {
        // console.log(sharerType, sharerID)
        // USER
        if(sharerType === 'user') {
            if(partner.value) {
                // console.log(partner.value)       
                let user = partner.value.find(user => user.userId === sharerID)
                return `${user?.surname} ${user?.name[0]}. ${user?.middleName[0]}.`
            }
        } 
        // COMPANY
        if(sharerType === 'conspirator'){
            // console.log(band.value)
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

const translateExecutorsName = (executors) => {

    let translatedExecutorArr = []

    if(executors.length) {

        executors.forEach(item => {
            
            if(item.userType === 'user') {
                if(partner.value) {
                    let user = partner.value.find(user => user.userId === item.userId)
                    translatedExecutorArr.push(`${user?.surname} ${user?.name[0]}. ${user?.middleName[0]}.`)
                }
            } 
            else if (item.userType === 'conspirator') {
                if(band.value) {
                    let company = band.value.find(company => company.id === item.userId)
                    translatedExecutorArr.push(`${company?.name}`)
                }
            } 
            else {
                translatedExecutorArr.push(`${item.userType}-${item.userId}`)
            }
        })
    }

    
  return translatedExecutorArr
}

const translateCustomersName = (customers) => {

    let translatedCustomerArr = []

    if(customers.length) {

        customers.forEach(item => {
            
            if(item.userType === 'user') {
                if(partner.value) {
                    let user = partner.value.find(user => user.userId === item.userId)
                    translatedCustomerArr.push(`${user?.surname} ${user?.name[0]}. ${user?.middleName[0]}.`)
                }
            } 
            else if (item.userType === 'conspirator') {
                if(band.value) {
                    let company = band.value.find(company => company.id === item.userId)
                    translatedCustomerArr.push(`${company?.name}`)
                }
            } 
            else {
                translatedCustomerArr.push(`${item.userType}-${item.userId}`)
            }
        })
    }
    console.log(translatedCustomerArr)
    
  return translatedCustomerArr
}

export {translateName, translateExecutorsName, translateCustomersName}
