<script lan="ts" setup>

// components
import { Button } from '@/components/button'
// import { Search } from '@/components/search';

// shared
import { Container } from "@/shared/container";

useHead({
  title: "conspirators | Ваш crm отдел маркетинга ",
  link: [
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
      integrity:
        "sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH",
      crossorigin: "anonymous",
      type: "text/css",
    },
  ],
  script: [
    {
      src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
      integrity:
        "sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz",
      crossorigin: "anonymous",
    },
  ],
});

const { users } = storeToRefs(useUsersStore());
const { loadData } = useUsersStore();
const headers = ["ID", "Name", "Email"];

const { loggedIn, user, session, clear } = useUserSession();

// const colors_index = ref(0)
const colors = ref([
  // {
  //   name: '--color-urgency-low-wo'
  // },
  {
    name: '--color-wallet-fund-available-wo'
  },
  {
    name: '--color-status-paused'
  },
  {
    name: '--color-wallet-fund-debt-wo'
  },
  // {
  //   name: '--color-wallet-fund-invested-wo'
  // },
  // {
  //   name: '--color-operation-type-donation'
  // },
  {
    name: '--color-urgency-middle'
  }
])

const changeColorOnClick = (e) => {
  let el = document.getElementById('changeColorSubject')
  let index = Math.round(Math.random() * (colors.value.length - 1) + 0)
  

  // console.log(index)
  // console.log(colors.value[index])
  el.style.color = `var(${colors.value[index].name})`
}

</script>
<template>
  <Container>

    <div class="header_container">

      <div>
        <!-- <h1>conspirators.su</h1> -->
        <h1><span style="font-weight: normal">Вместе ту зе мун, </span><br><span @click="changeColorOnClick" id="changeColorSubject">Соучастники</span></h1>
        <!-- <h2>Соучастники</h2> -->
      </div>
      
      <!-- <Search/> -->
    </div>

    <div class="section_container">

      <!-- <Search style="margin: 0;"/> -->

      <section style="background-color: var(--color-wallet-fund-available);">
        <h3 style="color: var(--color-global-text);">Контроль финансов и задач</h3>
        <p style="color: var(--color-global-text)">Фиксируй доходы и расходы,отслеживай динамику развития своего кооператива.</p>
        <!-- <p style="color: var(--color-global-text)">Фиксируй доходы и расходы в одном приложении, отслеживай динамику развития своего кооператива. От процесса фиксации заявок до учета свободных средств, инвестиций и задолженностей. Ничего не пройдет мимо тебя!</p> -->

        <div class="section_btn" @click="$router.push(`/landing_crm`)">
          <div class="section_icon" style="background-color: var(--color-urgency-low);">
            <Icon size="42px" name="material-symbols-light:arrow-right-alt-rounded" color="var(--color-btn-text)"/>
          </div>
          <p style="font-size: 1rem;color: var(--color-urgency-low);">Помощник онлайн</p>
        </div>
      </section>
  
      <section style="background-color: var(--color-btn-hover-bg);">
        <h3 style="color: var(--color-btn-bg); margin-top: 1rem;">Закрой потребность в отделе маркетинга</h3>
        <p style="color: var(--color-btn-bg)">Поручи разработку и ведение маркетинговой концепции специалистам conspirators</p>
        <div class="section_btn" @click="$router.push(`/landing_offer`)">
          <div class="section_icon">
            <Icon size="42px" name="material-symbols-light:arrow-right-alt-rounded" color="var(--color-btn-bg)"/>
          </div>
        </div>
      </section>
  
      <section style="background-color: var(--color-wallet-fund-debt);">
        <h3 style="color: var(--color-wallet-fund-debt-wo);">Задизайним всё что хочешь</h3>
        <p style="color: var(--color-wallet-fund-debt-wo);">От простой полиграфии до съёмкой корпоративных видео</p>
        <!-- <p style="color: var(--color-wallet-fund-debt-wo);">Мастера визуальных эффектов помогут реализовать и поддерживать фирменный стиль твоего кооператива, начиная от простой полиграфии, заканчивая съёмкой корпоративных видео</p> -->
        <div class="section_btn" @click="$router.push(`/landing_design`)">
          <div class="section_icon">
            <Icon size="42px" name="material-symbols-light:arrow-right-alt-rounded" color="var(--color-wallet-fund-debt-wo)"/>
          </div>
        </div>
      </section>

      <section style="background-color: var(--color-operation-type-donation);">
        <h3>Разработка сайтов и приложений</h3>
        <p>Делаем сайты и приложения под ключ с дальнейшим сервисным обслуживанием</p>
        <div class="section_btn" @click="$router.push(`/landing_design`)">
          <div class="section_icon">
            <Icon size="42px" name="material-symbols-light:arrow-right-alt-rounded" color="var(--color-global-text)"/>
          </div>
        </div>
      </section>

    </div>

    <!--  -->
    <h2 class="sub_title-container">В помощь соучастникам</h2>

    <div class="section_container">

      <!-- JOURNAL -->
      <section @click="$router.push('/journal')" class="default_list_item-container" style="border: 1px solid var(--color-btn-bg); background-color: var(--color-btn-text)">
        <h3 style="color: var(--color-btn-bg); margin-top: 1rem;">Журнал</h3>
        <p style="color: var(--color-btn-bg)">Бортовой журнал конспиратора. Делимся опытом.</p>
        <div class="section_btn" @click="$router.push(`/landing_offer`)">
          <div class="section_icon">
            <Icon size="42px" name="material-symbols-light:arrow-right-alt-rounded" color="var(--color-btn-bg)"/>
          </div>
        </div>
      </section>

      <section @click="$router.push('/landing_magazine')" style="background-color: var(--color-wallet-fund-available);">
        <h3>Все мы чем-то промышляем</h3>
        <p>Маркетлейс соучастников</p>
      </section>

      <section class="default_list_item-container"  style="border: 1px solid var(--color-btn-bg); background-color: var(--color-btn-text); padding-bottom: 2rem;">
        <h3 style="color: var(--color-btn-bg);">Помощь</h3>
        <ul>
          <li style="width: fit-content;" @click="$router.push('/help')">FAQ</li>
          <li style="width: fit-content;" @click="$router.push('/help')">База знаний</li>
          <li style="width: fit-content;" @click="$router.push('/help')">Написать в чат</li>
        </ul>
      </section>
    </div>

    <!-- НАШИ ЦИФРЫ -->
    <h2 class="sub_title-container">Наши цифры</h2>

    <div class="section_container">

      <section class="default_list_item-container">123</section>
    </div>

    <!-- Отчеты и документы -->
    <h2 class="sub_title-container">Отчеты и документы</h2>

    <div class="section_container">

      <section class="default_list_item-container">123</section>
    </div>

    <!-- Инвесторам и акционерам -->
    <h2 class="sub_title-container">Инвесторам и акционерам</h2>

    <div class="section_container">

      <section class="default_list_item-container">Whitepaper</section>
    </div>

  </Container>
</template>

<style scoped>
/* html {
    width:100vw;
    overflow-x:hidden;
} */

.section_container {
  display: grid; 
  gap: 1rem;
  margin-top: 1rem; 
}
.section_container > section {
  border-radius: 1rem;
  overflow: hidden;
  padding-bottom: 5rem;
  position: relative;
}
.section_container > section > h3 {
  height: 100px;
  display: flex;
  align-items: center;
  font-size: 2rem;
  padding: 0 1rem;
  margin: 0;
  margin-top: 1rem;
}
.section_container > section > p {
  padding: 0 1rem;
  margin: 0;
}
.section_btn {
  margin: 1rem;
  display: flex; 
  align-items: center; 
  gap: .5rem; 
  position: absolute; 
  bottom: .5rem; 
  left: 0;
  cursor: pointer;
}
.section_btn > .section_icon {
  width: 42px; 
  height: 42px; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  border-radius: 100%;
}
.section_btn > p {
  margin: 0; 
  font-size: .8rem;
}
.header_container {
  /* background-color: var(--color-global-text); */
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2rem;
}

.header_container div {
  
}
.header_container div h1 span:first-child {
  font-size: 2rem;
  color: var(--color-global-text_second)!important;
}
.header_container div h1 span:nth-child(2){
  /* color: var(--color-btn-text); */
  color: var(--color-wallet-fund-invested);
  font-size: 3rem;
  /* text-align: center; */
  font-weight: bold;
}
.header_container div h1 span:hover:nth-child(2) {
  /* color: var(--color-urgency-low-wo)!important; */
  cursor: pointer;
}
.header_container div h2 {
  /* color: var(--color-btn-text); */
  font-size: .8rem;
  font-weight: normal;
  /* text-align: center; */
}
@media screen and (max-width: 575px) {
  .buttons-container {
    flex-direction: column;
    gap: 2rem;
  }
  .section_container {
    margin: 2rem 1rem;
    gap: 2rem;
    grid-template-columns: repeat(1, 1fr);
  }
  .section_container > section > h3 {
    font-size: 1.5rem;
  }
  .header_container {
    margin-left: 1rem;
    margin-right: 1rem;
  }
  .header_container div h1 {
    font-size: 2.5rem;
  }
  .header_container div h1 span:first-child {
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: bold;
  }
  .header_container div h1 span:last-child {
    font-weight: bold;
    font-size: 3rem;
    text-transform: uppercase;
  }

  /* 
   */
  .sub_title-container {
    margin-top: 1rem;
    /* background-color: var(--color-global-text_second); */
    margin-left: 2rem;
    margin-right: 2rem;
  }
  .default_list_item-container {
    background-color: var(--color-btn-disabled-bg);
  }

}
@media screen and (min-width: 576px) and (max-width: 767px){
  .buttons-container {
    flex-direction: column;
    gap: 2rem;
  }
  .header_container {
    margin: 1rem;
    border-radius: 1rem;
  }
  .section_container {
    margin: 1rem ;
    /* margin-top: 2rem;  */
    grid-template-columns: repeat(2, 1fr);
  }
  .section_container > section > h3 {
    font-size: 1rem;
  }
  .header_container div h1 span:first-child {
    text-transform: uppercase;
    padding-left: .5rem; 
    font-size: 1rem;
  }
  .header_container div h1 span:last-child {
    font-size: 4rem;
    font-weight: bold;
    text-transform: uppercase;
  }
  .header_container div h1 span:last-child:hover {
    cursor: pointer;
  }
  /* 
   */
   .sub_title-container {
    margin-top: 2rem;
    /* background-color: var(--color-global-text_second); */
    margin-left: 2rem;
    margin-right: 2rem;
    margin-bottom: 2rem;
  }
  .default_list_item-container {
    background-color: var(--color-btn-disabled-bg);
  }
}
@media screen and (min-width: 768px) and (max-width: 991px)  {
  .header_container {
    margin-top: -1.5rem;
    /* margin-left: -1rem;
    margin-right: -1rem; */
    border-radius: 1rem;
    height: 400px;
  }
  .section_container {
    margin-top: 1rem;
    /* gap: 2rem; */
    grid-template-columns: repeat(2, 1fr);
  }
  .header_container div h1 span:first-child {
    text-transform: uppercase;
    padding-left: .5rem; 
    font-size: 1rem;
  }
  .header_container div h1 span:last-child {
    font-size: 5rem;
    font-weight: bold;
    text-transform: uppercase;
  }
  .header_container div h1 span:last-child:hover {
    cursor: pointer;
  }
  /* 
   */
   .sub_title-container {
    margin-top: 2rem;
    /* background-color: var(--color-global-text_second); */
    margin-left: 1rem;
    margin-right: 1rem;
    margin-bottom: 2rem;
  }
  .default_list_item-container {
    background-color: var(--color-btn-disabled-bg);
  }
}
@media screen and (min-width: 992px) and (max-width: 1199px) {
  .header_container {
    margin-top: -1rem;
    margin-left: 1rem;
    margin-right: 1rem;
    height: 400px;
    border-radius: 1rem;
  }
  .section_container {
    margin-top: 1.5rem;
    margin-left: 1rem;
    margin-right: 1rem;
    gap: 1.5rem;
    grid-template-columns: repeat(2, 1fr);
  }
  .header_container div h1 span:first-child {
    text-transform: uppercase;
    padding-left: .5rem; 
    font-size: 1rem;
  }
  .header_container div h1 span:last-child {
    font-size: 5rem;
    font-weight: bold;
    text-transform: uppercase;
  }
  .header_container div h1 span:last-child:hover {
    cursor: pointer;
  }
  /* 
   */
   .sub_title-container {
    margin-top: 2rem;
    /* background-color: var(--color-global-text_second); */
    margin-left: 2rem;
    margin-right: 2rem;
    margin-bottom: 2rem;
  }
  .default_list_item-container {
    background-color: var(--color-btn-disabled-bg);
    border: 1px solid var(--color-btn-hover-bg);
  }
}
@media screen and (min-width: 1200px) {
  .header_container {
    margin-top: -1rem;
    margin-left: 1rem;
    margin-right: 1rem;
    height: 400px;
    border-radius: 1rem;
  }
  .section_container {
    margin-top: 1.5rem;
    margin-left: 1rem;
    margin-right: 1rem;
    gap: 1.5rem;
    grid-template-columns: repeat(3, 1fr);
  }
  .section_container > section {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .section_container > section > div{
    left: .5rem!important;
  }
  .header_container div h1 span:first-child {
    text-transform: uppercase;
    padding-left: .5rem; 
    font-size: 1rem;
  }
  .header_container div h1 span:last-child {
    font-size: 5rem;
    font-weight: bold;
    text-transform: uppercase;
  }
  .header_container div h1 span:last-child:hover {
    cursor: pointer;
  }
  /* 
   */
   .sub_title-container {
    margin-top: 1rem;
    /* background-color: var(--color-global-text_second); */
    margin-left: 1rem;
    margin-right: 1rem;
  }
  .default_list_item-container {
    background-color: var(--color-btn-disabled-bg);
  }  /* 
   */
  .sub_title-container {
    /* margin-top: 1rem; */
    /* background-color: var(--color-global-text_second); */
    margin: 2rem 2rem
  }
  .default_list_item-container {
    background-color: var(--color-btn-disabled-bg);
    border: 1px solid var(--color-btn-hover-bg);
  }
}
</style>
