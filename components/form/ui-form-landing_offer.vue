<template>
    <h2>Форма обратной связи</h2>

    <div class="form-container form__wrapper">

        <!-- Форма обратной связи -->
        <form id="feedback-form" action="">123
            <div @click="testSend">Send mail</div>
        </form>
    </div>
</template>

<script lang="ts" setup>
const mail = useMail()

const testSend = () => {
    mail.send({
        // config: 'main',
        // from: '<maddison53@ethereal.email>', dont work at me
        // to: "bar@example.com, baz@example.com", dont work at me
        subject: 'Конспиратор, тебе заявка!',
        // text: `
        //     From: John@mail.ru
        //     Phone: +79617582573
        //     This is an incredible test message
        // `,
        html: `
            <b>Это тело письма</b><br/>
            <a href='tel:+79617582573'>+79617582573</a><br/>
            <a href="mailto:mail@htmlacademy.ru">dron@koni.ru</a>
        `
        
    })
}

</script>

<style scoped>
.d-none {
  display: none !important;
}
</style>