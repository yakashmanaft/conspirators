<template>


        <!-- <h4>{{ props?.popup_title }}</h4> -->
        <div>

            <div>

                <!--  -->
                <h5>Данные к отправке:</h5>
                <!--  -->
                
                <h5>Задачи</h5>
                <ul>
                    <li>OK 1. send request</li>
                    <li>OK 2. create lead el in BD Lead w status 'lead';</li>
                    <li>3. create lead note in BD LeadStatusLedger w status 'lead';</li>
                </ul>

                <!-- Форма обратной связи -->
                <form id="feedback-form">

                     <!-- NAME -->
                    <input 
                        v-model="form_obj.name"
                        id="form_name"
                        type="text" 
                        class="form-control"
                        placeholder="enter name"
                        autocomplete="name"
                    />

                     <!-- EMAIL -->
                     <input 
                        v-model="form_obj.email"
                        id="form_email"
                        type="text" 
                        class="form-control"
                        placeholder="enter email"
                        autocomplete="email"
                    />

                     <!-- MOBILE -->
                     <input 
                        v-model="form_obj.mobile"
                        id="form_mobile"
                        type="text" 
                        class="form-control"
                        placeholder="enter mobile"
                        autocomplete="mobile"
                    />

                    <br>
                    <br>

                    <Button @click.prevent="submitForm" type="original-btn">Send request</Button>
                </form>
            </div>

        </div>
</template>

<script lang="ts" setup>

// components
import { Button } from '@/components/button'

// TYPES
type FormObj = {
    name: string,
    email: string,
    mobile: string,
    landingId: number,
    status: string
}
const form_obj = ref<FormObj>({
    name: '',
    email: '',
    mobile: '',
    landingId: 0,
    status: 'lead'
})

// PROPS
const props = defineProps({
    path: String,
    list: {
        type: Array,
        default: []
    }
})

// EMITS
const emit = defineEmits(['emitClosePopup'])

// set current id of landing page
const current_landing_id = () => {

    let current_landing_name = props?.path?.split('/', 2)[1]
    console.log(current_landing_name)
    let current_landing_id = [...props?.list].filter((item) => {
        if(item.name === current_landing_name) {
            return item
        }
    })
    console.log(current_landing_id[0])
    return current_landing_id[0].id
}

const mail = useMail()

const submitForm = () => {
    
    // landing_offer id === 2
    // lead default status === 'lead'
    form_obj.value.landingId = current_landing_id()
    // form_obj.value.status = 'lead'
    
    addLeadToBD(form_obj.value)

}

// SMTP TO EMAIL
const testSend = async (item: FormObj) => {
    await mail.send({
        // config: 'main',
        from: '<ya.kashmanaft@gmail.com>', //Всегда такой будет
        to: '<palmers@yandex.ru>',
        // to: "bar@example.com, baz@example.com", dont work at me
        subject: 'Конспиратор, тебе заявка!',
        // text: `
        //     From: John@mail.ru
        //     Phone: +79617582573
        //     This is an incredible test message
        // `,
        html: `
            <b>Откуда: </b><p>${props?.path}</p><br/>
            <b>Имя: ${item.name}</b>
            <b>Телефон: </b><a href='tel:${item.mobile}'>${item.mobile}</a><br/>
            <b>Эл. почта: </b><a href="mailto:${item.email}">${item.email}</a>
        `
        
    })
    console.log("testSend: Message was sent")
}

// ****** BD
// **** methods
// ** POST
// lead
const addLeadToBD = async (item: FormObj) => {
    let addedItem = null
    if(
        item.name !== '' &&
        item.email !== '' &&
        item.mobile !== '' &&
        item.landingId !== 0 &&
        item.status === 'lead'
    ){
        addedItem = await $fetch("/api/lead/lead", {
            method: "POST",
            body: {
                name: item.name,
                email: item.email,
                mobile: item.mobile,
                landingId: item.landingId,
                // status: item.status
            }
        })
        await testSend(item)
        emit('emitClosePopup')
        
    } else {
        if(item.name === '') {
            alert('Пропустили имя...')
        } 
        else if (item.email === '') {
            alert('Пропустили email...')
        } 
        else if (item.mobile === '') {
            alert('Пропустили номер телефона')
        }
        else if (item.landingId === 0) {
            alert('косяк с landingId')
        } else if (item.status !== 'lead') {
            alert('косяк с status')
        } else {
            alert('Что-то не заполнили...')
        }
    }
}


</script>

<style scoped>
.d-none {
  display: none !important;
}
</style>