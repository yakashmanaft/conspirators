<template>


        <!-- <h4>{{ props?.popup_title }}</h4> -->
        <div>

            <div>

                <!--  -->
                <h5>Данные к отправке:</h5>
                <ul>

                    <li>Грядка лида: {{ props?.path }}</li>
                </ul>
                <!--  -->
                
                <h5>Задачи</h5>
                <ul>
                    <li>OK 1. send request</li>
                    <li>OK 2. create lead el in BD Lead w status 'lead';</li>
                    <li>3. create lead note in BD LeadStatusLedger w status 'lead';</li>
                </ul>
                <!-- Форма обратной связи -->
                <h5>Форма</h5>
                <!--  -->
                <ul>
                    <!-- { "name": "", "email": "", "mobile": "", "landingId": 1, "status": "lead" } -->
                    <li>{{ form_obj.name }}</li>
                    <li>{{ form_obj.email }}</li>
                    <li>{{ form_obj.mobile }}</li>
                    <li>{{ form_obj.landingId }}</li>
                    <li>{{ form_obj.status }}</li>
                </ul>
                <!--  -->
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

                    <Button @click.prevent="testSend" type="original-btn">Send request</Button>
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
    path: String
})

// EMITS
const emit = defineEmits(['emitClosePopup'])


const mail = useMail()

const testSend = async () => {
    // await mail.send({
    //     // config: 'main',
    //     from: '<ya.kashmanaft@gmail.com>', //Всегда такой будет
    //     to: '<palmers@yandex.ru>',
    //     // to: "bar@example.com, baz@example.com", dont work at me
    //     subject: 'Конспиратор, тебе заявка!',
    //     // text: `
    //     //     From: John@mail.ru
    //     //     Phone: +79617582573
    //     //     This is an incredible test message
    //     // `,
    //     html: `
    //         <b>Откуда: </b><p>landing_offer</p><br/>
    //         <b>Телефон: </b><a href='tel:+79617582573'>+79617582573</a><br/>
    //         <b>Эл. почта: </b><a href="mailto:mail@htmlacademy.ru">dron@koni.ru</a>
    //     `
        
    // })


    console.log("Message was sent")

    form_obj.value.landingId = 1
    form_obj.value.status = 'lead'

    await addLeadToBD(form_obj.value)

}

// BD
const addLeadToBD = async (item: FormObj) => {
    let addedItem = null
    if(
        item.name !== '' &&
        item.email !== '' &&
        item.mobile !== '' &&
        item.landingId === 1 &&
        item.status !== ''
    ){
        // addedItem = await $fetch("/api/lead/lead", {
        //     method: "POST",
        //     body: {
        //         name: item.name,
        //         email: item.email,
        //         mobile: item.mobile,
        //         landingId: item.landingId,
        //         status: item.status
        //     }
        // })
        console.log(item)
        emit('emitClosePopup')
    } else {
        alert('Что-то не заполнили...')
    }
}



</script>

<style scoped>
.d-none {
  display: none !important;
}
</style>