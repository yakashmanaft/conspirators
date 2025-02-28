<script lan="ts" setup>

// components
import { Button } from '@/components/button'
import { Search } from '@/components/search';

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

</script>
<template>
  <Container>

    <div class="header_container">

      <div>
        <h1>conspirators.su</h1>
        <h2>Освобождая время, сохраняем контроль</h2>
      </div>
      
      <Search/>
    </div>

    <div class="section_container">

      <!-- <Search style="margin: 0;"/> -->

      <section style="background-color: var(--color-wallet-fund-available); position: relative;">
        <h3 style="color: var(--color-global-text); margin-top: 1rem;">Контролируй финансы и задачи</h3>
        <p style="color: var(--color-global-text)">Фиксируй доходы и расходы в одном приложении, отслеживай динамику развития своего кооператива. От процесса фиксации заявок до учета свободных средств, инвестиций и задолженностей. Ничего не пройдет мимо тебя!</p>
        <!-- <Button type="pseudo-btn" link="/landing_crm" bg="bg-full" :disabled="false">conspirators.CRM</Button> -->

        <div style="display: flex; align-items: center; gap: .5rem; position: absolute; bottom: .5rem; left: 0;" @click="$router.push(`/landing_crm`)">
          <div style="background-color: var(--color-urgency-low); width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; border-radius: 100%;">
            <Icon size="42px" name="material-symbols-light:arrow-right-alt-rounded" color="var(--color-btn-text)"/>
          </div>
          <p style="color: var(--color-urgency-low); margin: 0; font-size: .8rem;">Войти</p>
        </div>
      </section>
  
      <section style="background-color: var(--color-btn-hover-bg); position: relative;">
        <h3 style="color: var(--color-btn-bg); margin-top: 1rem;">Закрой потребность в отделе маркетинга</h3>
        <p style="color: var(--color-btn-bg)">Поручи разработку и ведение маркетинговой концепции специалистам conspirators</p>
        <!-- <Button type="pseudo-btn" link="/landing_offer" bg="bg-stroke" :disabled="false">Ваш отдел маркетинга</Button> -->
        <div style="display: flex; align-items: center; gap: .5rem; position: absolute; bottom: .5rem; left: 0;" @click="$router.push(`/landing_offer`)">
          <div style="width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; border-radius: 100%;">
            <Icon size="42px" name="material-symbols-light:arrow-right-alt-rounded" color="var(--color-btn-bg)"/>
          </div>
          <!-- <p style="color: var(--color-global-text_second); margin: 0; font-size: 1rem;">Войти</p> -->
        </div>
      </section>
  
      <section style="background-color: var(--color-wallet-fund-debt); position: relative;">
        <h3 style="color: var(--color-wallet-fund-debt-wo); margin-top: 1rem;">Задизайним всё что хочешь</h3>
        <p style="color: var(--color-wallet-fund-debt-wo);">Мастера визуальных эффектов помогут реализовать и поддерживать фирменный стиль твоего кооператива, начиная от простой полиграфии, заканчивая съёмкой корпоративных видео</p>
        <!-- <Button type="pseudo-btn" link="/landing_design" bg="bg-stroke" :disabled="false">Дизайним</Button> -->
        <div style="display: flex; align-items: center; gap: .5rem; position: absolute; bottom: .5rem; left: 0;" @click="$router.push(`/landing_design`)">
          <div style="width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; border-radius: 100%;">
            <Icon size="42px" name="material-symbols-light:arrow-right-alt-rounded" color="var(--color-wallet-fund-debt-wo)"/>
          </div>
          <!-- <p style="color: var(--color-global-text_second); margin: 0; font-size: 1rem;">Войти</p> -->
        </div>
      </section>

      <section style="background-color: var(--color-operation-type-donation); position: relative;">
        <h3 style="margin-top: 1rem;">Разработка сайтов и приложений</h3>
        <p>Делаем сайты и приложения под ключ с дальнейшим сервисным обслуживанием</p>
        <!-- <Button type="pseudo-btn" link="/landing_design" bg="bg-stroke" :disabled="false">Подробнее</Button> -->
        <div style="display: flex; align-items: center; gap: .5rem; position: absolute; bottom: .5rem; left: 0;" @click="$router.push(`/landing_design`)">
          <div style="width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; border-radius: 100%;">
            <Icon size="42px" name="material-symbols-light:arrow-right-alt-rounded" color="var(--color-global-text)"/>
          </div>
          <!-- <p style="color: var(--color-global-text_second); margin: 0; font-size: 1rem;">Войти</p> -->
        </div>
      </section>
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
  /* margin-left: 1rem;
  margin-right: 1rem; */
  margin-top: 1rem; 
}
.section_container > section {
  border-radius: 1rem;
  /* border: 1px solid var(--color-btn-hover-bg); */
  overflow: hidden;
  /* padding-bottom: .8rem; */
  padding-bottom: 5rem;
}
.section_container > section > h3 {
  height: 100px;
  display: flex;
  align-items: center;
  font-size: 2rem;
  padding: 0 1rem;
  margin: 0;
  /* border-bottom: 1px solid var(--color-btn-hover-bg); */
  /* background-color: var(--color-global-text_second); */
}
.section_container > section > p {
  padding: 0 1rem;
  margin: 0;
}
.section_container > section > div {
  margin: 1rem;
  /* margin-top: 0; */
}
.header_container {
  background-color: var(--color-global-text);
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.header_container div {
  
}

.header_container div h1 {
  color: var(--color-btn-text);
  font-size: 3rem;
  text-align: center;
}
.header_container div h2 {
  color: var(--color-btn-text);
  font-size: .8rem;
  font-weight: normal;
  text-align: center;
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
    font-size: 1.5rem;
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
}
</style>
