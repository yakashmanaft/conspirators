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

// 
// onMounted(async () => {
//   window.addEventListener('click', (e) => {
//     console.log(e.target)
//   })
// });

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
        <h1>
          <span style="font-weight: normal">Слоган указаывает на суть</span>
          <br>
          <span @click="changeColorOnClick" id="changeColorSubject">Клик меняет цвет</span>
        </h1>
        <!-- <h2>Соучастники</h2> -->
      </div>
      
      <!-- <Search/> -->
    </div>

    <!-- ТРИЕДИНСТВО DBD, CATALOG, JOURNAL -->
    <div class="el_container">

      <!-- 0 -->
      <section class="el_wrapper el_wrapper-0" @click="$router.push(`/landing_crm`)" >
        <div class="el_img_wrapper">

          <img src="assets/icons/dbd-icon.svg" alt="day-by-deals">
        </div>

        <h2 style="font-weight: bold; font-size: 1.5rem; color: rgb(143, 111, 234)">Дэйбайдилс</h2>
        <!-- <span>Твой финпульс</span>
        -->
        <span class="el_price">Финпульс от 399 руб./ мес.</span> 
      </section>

      <!-- 1 -->
      <section class="el_wrapper el_wrapper-1" @click="$router.push('/landing_stock')" > 
        <div class="el_img_wrapper">

          <img src="assets/icons/catalog-icon.svg" alt="conspirators catalog">
        </div>

        <h2 style="font-weight: bold; font-size: 1.5rem;">Каталог</h2>
        <span style="text-align: center;">Соучастников дела</span>
        <!-- 
        <span>Покупай местное :)</span> -->
      </section>

      <!-- 2 -->
      <section class="el_wrapper el_wrapper-2" @click="$router.push('/journal')"  >
        <div class="el_img_wrapper">

          <img src="assets/icons/journal-icon.svg" alt="conspirators journal">
        </div>

        <h2 style="font-weight: bold; font-size: 1.5rem;">Журнал</h2>
        <span>Люди о своем опыте</span>
        <span class="el_price">от 99 руб./ мес.</span>
      </section>
    </div>

    <!-- BANNER SUBSCRIBE PRICE -->
    <div style="margin-top: 10rem; padding: 3rem 2rem; padding-bottom: 1rem; background-color: var(--color-global-text) ">
      <h3 style="text-align: center; color: var(--color-global-baackground_light); font-size: 3rem;">Доступ к возможностям DBD <span style="color: var(--color-global-baackground_light); font-size: 4rem; background-color: var(--color-global-text_second); padding: .5rem 1rem;">от 99 руб. / мес.</span></h3>
      <h4 style="text-align: center; font-weight: normal; font-size: 1rem; margin-top: 2rem; color: var(--color-global-baackground_light);">Выбирай помощников в делах, плати только за то, чем пользуешься. <span style="cursor: pointer; color: var(--color-global-text_second); width: fit-content; " @click="$router.push(`/subscribe`)">Смотреть условия и тарифы</span> </h4>

      <div style="margin-top: 3rem;">
        <div style="margin: 0 auto; background-color: #fff; width: fit-content; padding: .5rem 1rem;">
          <h5 style="margin: 0;">Попробовать бесплатно</h5>
          <p style="margin: 0; color: var(--color-global-text_second); text-align: center;">30 дней *</p>
        </div>
        <p style="text-align: center;margin-top: 3rem; font-size: .8rem; color: var(--color-global-text_second)">*Далее, на 31-ый день пользования спишется сумма, согласно расценкам месячной подписки на модули, действующим в момент подключения услуги и, если не выбран иной способ оплаты.</p>
      </div>
    </div>

    <!--  -->
    <!-- <div>
      123
    </div> -->

    <div class="section_container">

      <!-- <Search style="margin: 0;"/> -->

      <!-- DAY BY DEALS -->
      <section 
      style="background-color: var(--color-wallet-fund-available);" 
      @click="$router.push(`/landing_crm`)" 
      class="block_is_link"
      >
        <div class="section_btn" >
          <div class="section_icon">
            <Icon size="48px" name="hugeicons:wallet-02" color="var(--color-urgency-low)"/>
          </div>
          <!-- <div class="section_icon">
            <Icon size="48px" name="hugeicons:microsoft" color="var(--color-urgency-low)"/>
          </div> -->
          <!-- <div class="section_icon">
            <Icon size="48px" name="hugeicons:chart-line-data-01" color="var(--color-urgency-low)"/>
          </div> -->
          <!-- <p style="font-size: 1rem;color: var(--color-urgency-low);">Приступить</p> -->
        </div>
        <h3>Дэй Бай Дилс</h3>

        <div>
          <p style="margin: 0; color: var(--color-global-text);">Твой финпульс
          </p>
          <!-- <p style="color: var(--color-global-text)">Фиксируй доходы и расходы в одном приложении, отслеживай динамику развития своего кооператива. От процесса фиксации заявок до учета свободных средств, инвестиций и задолженностей. Ничего не пройдет мимо тебя!</p> -->
        </div>

      </section>

      <!-- CATALOG -->
      <section 
        @click="$router.push('/landing_stock')" 
        style="border: 1px solid var(--color-wallet-fund-available); position: relative;"
        class="block_is_link"
        >
        <div class="section_btn">
          <!-- <div class="section_icon">
            <Icon size="48px" name="hugeicons:creative-market" color="var(--color-global-text_second)"/>
          </div> -->
          <div class="section_icon">
            <Icon size="48px" name="hugeicons:shopping-cart-01" color="var(--color-global-text_second)"/>
          </div>
          <!-- <div class="section_icon">
            <Icon size="48px" name="hugeicons:add-team" color="var(--color-global-text_second)"/>
          </div> -->
        </div>
        <h3 >Каталог</h3>

        <div>
          <p style="margin: 0; color: var(--color-global-text_second)">Товары и услуги</p>
          <p class="store_sign" style="position: absolute;   width: fit-content; color: var(--color-global-baackground_light); font-weight: bold; text-transform: uppercase;">Магазин</p>
        </div>
      </section>

      <!-- JOURNAL -->
      <section 
        @click="$router.push('/journal')" 
        class="block_is_link"
        style="background-color: var(--color-btn-text)"
      >
        <div class="section_btn">
          <div class="section_icon">
            <Icon size="42px" name="hugeicons:artificial-intelligence-03" color="var(--color-global-text_second)"/>
          </div>
          <!-- <div class="section_icon">
            <Icon size="42px" name="hugeicons:notebook" color="var(--color-global-text_second)"/>
          </div> -->
          <!-- <div class="section_icon">
            <Icon size="42px" name="hugeicons:maps-editing" color="var(--color-global-text_second)"/>
          </div> -->
        </div>
        <h3 style="color: var(--color-wallet-fund-available);">Журнал</h3>
        <div>
          <p style="margin: 0; color: var(--color-global-text_second)">Люди о своем опыте</p>
        </div>
      </section>
    </div>

    <div>
      <p>DBD: твой финпульс</p>
      <ul>
        <li></li>
        <li @click="$router.push(`/subscribe`)">Подробнее о тарифах</li>
      </ul>
    </div>
    <div>
      <p>Каталог: товары и услуги</p>
      <ul>
        <li>Доступ к интернет-рынку товаров и услуг конспираторов ..... Бесплатно</li>
        <li>Своя интернет лавка товаров на площадке конспираторов ..... 1 200.00 руб. / мес.</li>
        <li>Размещение на интернет-рынке конспираторов своих товаров (до 12шт)..... 800.00 руб. / мес.</li>
        <li @click="$router.push(`/subscribe`)">Подробнее о тарифах</li>
      </ul>
    </div>
    <div>
      <p>Конспираторов журнал: люди о свем опыте</p>
      <ul>
        <li>Доступ к онлайн-изданию "Конспираторов журнал" ..... Бесплатно</li>
        <li>Доступ к разделу "Платное" онлайн-издания "Конспираторов журнал" ..... 99.00 руб. / мес. </li>
        <li>Публикации своих статей в онлайн-издании "Конспираторов журнал" ..... 399.00 руб. / мес.</li>
        <li @click="$router.push(`/subscribe`)">Подробнее о тарифах</li>
      </ul>
    </div>

    <!--  -->
    <h2 class="sub_title-container">Помощь</h2>
    <p class="sub_p-container" style="color: var(--color-global-text_second);">Описали функции и опыт взаимодействия с приложением в одном месте</p>

    <div class="section_container">

        <div class="help_section-container">

          <ul style="color: var(--color-global-text_second)">
            <li class="li_is_link" style="width: fit-content;" @click="$router.push('/help')">FAQ</li>
            <li class="li_is_link" style="width: fit-content;" @click="$router.push('/help')">База знаний</li>
            <li class="li_is_link" style="width: fit-content;" @click="$router.push('/help')">Написать в чат</li>
          </ul>
        </div>

    </div> 

    <!-- НАШИ ЦИФРЫ -->
    <h2 class="sub_title-container">Наши цифры</h2>

    <div class="section_container">

      <section class="default_list_item-container block_is_link" style="border: 1px solid var(--color-global-text_second); background-color: var(--color-btn-text);">
        <h3>Скоро :)</h3>
        <p>Формируем...</p>
        <div class="section_btn">
          <div class="section_icon">
            <Icon size="48px" name="hugeicons:mountain" color="var(--color-global-text_second)"/>
          </div>
        </div>
      </section>
      <section class="default_list_item-container block_is_link" style="border: 1px solid var(--color-global-text_second); background-color: var(--color-btn-text);">
        <h3>Скоро :)</h3>
        <p>Формируем...</p>
        <div class="section_btn">
          <div class="section_icon">
            <Icon size="48px" name="hugeicons:mountain" color="var(--color-global-text_second)"/>
          </div>
        </div>
      </section>
      <section class="default_list_item-container block_is_link" style="border: 1px solid var(--color-global-text_second); background-color: var(--color-btn-text);">
        <h3>Скоро :)</h3>
        <p>Формируем...</p>
        <div class="section_btn">
          <div class="section_icon">
            <Icon size="48px" name="hugeicons:mountain" color="var(--color-global-text_second)"/>
          </div>
        </div>
      </section>
    </div>

    <!-- Отчеты и документы -->
    <h2 class="sub_title-container">Отчеты и документы</h2>

    <div class="section_container">

      <section class="default_list_item-container block_is_link" style="border: 1px solid var(--color-global-text_second); background-color: var(--color-btn-text);">
        <h3>Скоро :)</h3>
        <p>Формируем...</p>
        <div class="section_btn">
          <div class="section_icon">
            <Icon size="48px" name="hugeicons:mountain" color="var(--color-global-text_second)"/>
          </div>
        </div>
      </section>
      <section class="default_list_item-container block_is_link" style="border: 1px solid var(--color-global-text_second); background-color: var(--color-btn-text);">
        <h3>Скоро :)</h3>
        <p>Формируем...</p>
        <div class="section_btn">
          <div class="section_icon">
            <Icon size="48px" name="hugeicons:mountain" color="var(--color-global-text_second)"/>
          </div>
        </div>
      </section>
      <section class="default_list_item-container block_is_link" style="border: 1px solid var(--color-global-text_second); background-color: var(--color-btn-text);">
        <h3>Скоро :)</h3>
        <p>Формируем...</p>
        <div class="section_btn">
          <div class="section_icon">
            <Icon size="48px" name="hugeicons:mountain" color="var(--color-global-text_second)"/>
          </div>
        </div>
      </section>
      <section class="default_list_item-container block_is_link" style="border: 1px solid var(--color-global-text_second); background-color: var(--color-btn-text);">
        <h3>Скоро :)</h3>
        <p>Формируем...</p>
        <div class="section_btn">
          <div class="section_icon">
            <Icon size="48px" name="hugeicons:mountain" color="var(--color-global-text_second)"/>
          </div>
        </div>
      </section>
      <section class="default_list_item-container block_is_link" style="border: 1px solid var(--color-global-text_second); background-color: var(--color-btn-text);">
        <h3>Скоро :)</h3>
        <p>Формируем...</p>
        <div class="section_btn">
          <div class="section_icon">
            <Icon size="48px" name="hugeicons:mountain" color="var(--color-global-text_second)"/>
          </div>
        </div>
      </section>
    </div>

    <!-- Инвесторам и акционерам -->
    <h2 class="sub_title-container">Инвесторам и акционерам</h2>

    <div class="section_container" >

      <section class="default_list_item-container block_is_link" @click="$router.push('/whitepaper')" style="border: 1px solid var(--color-global-text_second); background-color: var(--color-btn-text);">
        <h3>Whitepaper</h3>
        <p>О продукте</p>
        <div class="section_btn">
          <div class="section_icon">
            <Icon size="48px" name="hugeicons:file-01" color="var(--color-global-text_second)"/>
          </div>
        </div>
      </section>
      <section class="default_list_item-container block_is_link" @click="$router.push('/whitepaper')" style="border: 1px solid var(--color-global-text_second); background-color: var(--color-btn-text);">
        <h3>Whitepaper</h3>
        <p>О продукте</p>
        <div class="section_btn">
          <div class="section_icon">
            <Icon size="48px" name="hugeicons:file-01" color="var(--color-global-text_second)"/>
          </div>
        </div>
      </section>
      <section class="default_list_item-container block_is_link" @click="$router.push('/whitepaper')" style="border: 1px solid var(--color-global-text_second); background-color: var(--color-btn-text);">
        <h3>Whitepaper</h3>
        <p>О продукте</p>
        <div class="section_btn">
          <div class="section_icon">
            <Icon size="48px" name="hugeicons:file-01" color="var(--color-global-text_second)"/>
          </div>
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
}
.section_container > section {
  overflow: hidden;
  position: relative;
}
.section_container > section > h3 {
  color: var(--color-global-text);
}
.section_container > section > p {
  margin: 0;
}

/* block_is_link */
.block_is_link {
  cursor: pointer;
  transition: all .15s ease-in-out;
}
.block_is_link:hover {
  box-shadow: var(--hover-shadow);
}
/* li_is-link */
.li_is_link {
  cursor: pointer;
  transition: all .15s ease-in-out;
}
.li_is_link:hover {
  color: var(--color-global-text);
}
/* section-btn */
.section_btn {
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
  color: var(--color-wallet-fund-invested);
  font-size: 3rem;
  font-weight: bold;
}
.header_container div h1 span:hover:nth-child(2) {
  cursor: pointer;
}
.header_container div h2 {
  font-size: .8rem;
  font-weight: normal;
}

/* SECTION HOVER */
section {
  /* cursor: pointer;
  transition: all .2s ease-in-out; */
}
section:hover {
  /* box-shadow: var(--hover-shadow); */
}

@media(max-width: 319px) {
  .header_container {
    height: unset;
  }
  .section_container {
    grid-template-columns: repeat(2, 1fr)!important;
    margin: .5rem;
    margin-top: 1.5rem;
    gap: .5rem;
  }
  .section_container section {
    display: grid;
    grid-template-columns: 1fr;
    border-radius: .75rem;
    padding-bottom: 4rem;
  }
  .section_container section h3 {
    font-size: .9rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    margin-top: 1em;
    /* background-color: gray; */
    height: 2rem;
  }
  .section_container section div p {
    font-size: .7rem;
    margin: 0;
    margin-top: .5rem;
    padding: 0 .5rem;
    text-align: center;
  }
  .section_container section .section_btn {
    margin: 0;
    width: 100%;
    height: 2rem;
    display: flex; 
    align-items: center; 
    justify-content: center;
    gap: .5rem; 
    position: absolute; 
    bottom: 0;
    /* left: 0; */
    /* background-color: red; */
    padding-bottom: 2rem;  
  }
  .section_container section .section_btn .section_icon{
    border-radius: unset;
    border-radius: .5rem;
    /* background-color: blue; */
    height: 2rem;
    width: 2rem;
  } 
  .section_container section .section_btn .section_icon svg{
  }
  .store_sign {
    display: none;
  }

  .section_container .help_section-container ul {
    margin-left: .5rem;
  }
  /* 
   */
  .sub_title-container {
    margin-left: 1rem!important;
    margin-right: 1rem!important;
    margin-bottom: unset;
  }
  .sub_p-container {
    margin: 0 1rem;
    /* margin-top: -1.25rem; */
    margin-top: 1rem;
  }
  /* 
   */
   .default_list_item-container {
      /* display: flex;
      align-items: center;
      justify-content: center; */
      padding: unset!important;
      padding: 1rem!important;
      padding-bottom: 4rem!important;
   }
   .default_list_item-container h3 {
    margin: 0!important;
    text-align: center;
   } 
   .default_list_item-container p {
    text-align: center;
   }
}
@media (min-width: 320px) and (max-width: 574px) {
  .section_container {
    gap: .5rem;
    grid-template-columns: repeat(2, 1fr);
    margin-left: .5rem;
    margin-right: .5rem;
  }
  .section_container section {
    border-radius: .75rem;
    padding-bottom: 3rem;
  }
  .section_container section h3 {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
  }
  .section_container section div p {
      margin-top: 1rem;
     padding: 0 .5rem;
  }
  .section_container section .section_btn {
    margin: 0;
    width: 100%;
    height: 2rem;
    display: flex; 
    align-items: center; 
    justify-content: center;
    gap: .5rem; 
    position: absolute; 
    bottom: 0;
    /* left: 0; */
    /* background-color: red; */
    padding-bottom: 2rem;  
  }
  .section_container section .section_btn .section_icon{
    border-radius: unset;
    border-radius: .5rem;
    /* background-color: blue; */
    height: 2rem;
    width: 2rem;
  } 
  .store_sign {
    font-size: 4rem!important;
  }
   .default_list_item-container p {
    text-align: center;
   }
  .sub_p-container {
    margin: 0 1rem;
    /* margin-top: -1.25rem; */
    margin-top: 1rem;
  }
}
@media screen and (max-width: 574px) {
  .buttons-container {
    flex-direction: column;
    gap: 2rem;
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
    font-size: 2.5rem;
    text-transform: uppercase;
  }

  /* 
   */
   .section_container section div p {
    text-align: center;
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
  }
  /* HELP BLOCK */
  .help_section-container {

  }
  .help_section-container ul {
    list-style: none;
    margin: 0;
    padding: 0;
    margin-left: .5rem;
  }
  .help_section-container ul li {
    padding: 1rem;
    border-left: 1px solid var(--color-btn-hover-bg);
    margin: 1rem 0;
  }
  .help_section-container ul li:hover {
    border-left: 1px solid var(--color-urgency-low)
  }

}
@media screen and (min-width: 575px) and (max-width: 767px){
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
    gap: 1rem;
    grid-template-columns: repeat(3, 1fr);
  }
  .section_container section {
    display: grid;
    grid-template-columns: 1fr;
    border-radius: .75rem;
    padding-bottom: 6rem;
  }
  .section_container > section > h3 {
    font-size: 1.25rem;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem!important;
    height: 2rem;
  }
  .section_container > section > div > p {
    font-size: 1rem;
    margin: 0;
    margin-top: .5rem;
    padding: 0 .5rem;
    text-align: center;
  }
  .section_container section .section_btn {
    margin: 0;
    width: 100%;
    height: 2rem;
    display: flex; 
    align-items: center; 
    justify-content: center;
    gap: .5rem; 
    position: absolute; 
    bottom: 0;
    padding-bottom: 3rem;  
  }

  /*  */
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
    margin-left: 1rem;
    margin-right: 1rem;
    margin-bottom: 2rem;
  }
  
  .sub_p-container {
    margin-top: -1.5rem;
    margin-left: 1rem;
    margin-right: 1rem;
  }
  /* .default_list_item-container {
    background-color: var(--color-btn-disabled-bg);
  } */
  .store_sign {
      font-size: 2.5rem!important;
      bottom: -1rem;
      left: -1rem;
      height: fit-content;
  }
  .default_list_item-container p {
  text-align: center;
  }
  /* HELP BLOCK */
  .help_section-container {
    margin-left: 1rem;
  }
  .help_section-container ul {
    list-style: none;
    margin: 0;
    padding: 0;
    /* margin-left: 1rem; */
  }
  .help_section-container ul li {
    padding: 1rem;
    border-left: 1px solid var(--color-btn-hover-bg);
    margin: 1rem 0;
  }
  .help_section-container ul li:hover {
    border-left: 1px solid var(--color-urgency-low)
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
    gap: 1rem;
    grid-template-columns: repeat(4, 1fr);
  }
  .section_container > section {
    border-radius: .75rem;
    border-color: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-left: 1.5rem;
    padding-top: 1.5rem;
    padding-right: 0;
    padding-bottom: 1.5rem;
    gap: .5rem;
    /* border: 1px solid var(--color-urgency-low-10); */
    /* padding-bottom: 2.5rem; */
  }
  .section_container > section > h3 {
    /* margin-top: 2rem; */
  }
  .section_container > section > p {
    margin-top: .5rem;
  }
  .section_container section .section_btn {
    display: flex; 
    align-items: center; 
    justify-content: flex-start;
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
  .sub_p-container {
    margin: 0 1rem;
    margin-top: -1.25rem;
  }
  .store_sign {
    display: none;
  }
  .default_list_item-container {
    background-color: var(--color-btn-disabled-bg);
  }
  /* HELP BLOCK */
  .help_section-container {

  }
  .help_section-container ul {
    list-style: none;
    margin: 0;
    padding: 0;
    margin-left: 1rem;
  }
  .help_section-container ul li {
    padding: 1rem;
    border-left: 1px solid var(--color-btn-hover-bg);
    margin: 1rem 0;
  }
  .help_section-container ul li:hover {
    border-left: 1px solid var(--color-urgency-low)
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
  .section_container > section {
    border-radius: .75rem;
    padding-left: 2.25rem;
    padding-bottom: 2.5rem;
  }
  .section_container > section > h3 {
    margin-top: 2rem;
  }
  .section_container > section > p {
    margin-top: .5rem;
    margin-bottom: 1rem;
  }
  .section_container section .section_btn {
    display: flex; 
    align-items: center; 
    justify-content: flex-start;
    margin-top: 2.25rem;
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
  .sub_p-container {
    margin: 0 2rem;
    margin-top: -1.25rem;
  }
  .default_list_item-container {
    background-color: var(--color-btn-disabled-bg);
    border: 1px solid var(--color-btn-hover-bg);
  }
  /* HELP BLOCK */
  .help_section-container {

  }
  .help_section-container ul {
    list-style: none;
    margin: 0;
    padding: 0;
    margin-left: 1rem;
  }
  .help_section-container ul li {
    padding: 1rem;
    border-left: 1px solid var(--color-btn-hover-bg);
    margin: 1rem 0;
  }
  .help_section-container ul li:hover {
    border-left: 1px solid var(--color-urgency-low)
  }
}
@media screen and (min-width: 1199px) {
  .header_container {
    margin-top: -1rem;
    /* margin-left: 1rem;
    margin-right: 1rem; */
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
    border-radius: 1rem;
    padding-left: 2.25rem!important;
    padding-bottom: 2.5rem;
  }
  .section_container > section > h3 {
    margin-top: 2rem;
  }
  .section_container > section > p {
    margin-top: .5rem;
    margin-bottom: 1rem;
  }
  .section_container > section {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .section_container > section > div{
    left: .5rem!important;
  }
  .section_container section .section_btn {
    display: flex; 
    align-items: center; 
    justify-content: flex-start;
    margin-top: 2.25rem;
    margin-bottom: 1.25rem;
  }
  .header_container div h1 span:first-child {
    text-transform: uppercase;
    padding-left: .25rem; 
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
  .sub_p-container {
    margin: 0 2rem;
    margin-top: -1.25rem;
  }
  .store_sign {
    font-size: 4rem;
    bottom: -55px;
    right: -1.75rem;
  }
  .default_list_item-container {
    background-color: var(--color-btn-disabled-bg);
    border: 1px solid var(--color-btn-hover-bg);
  }

  /* 
  
  */
  .el_container {
    /* display: grid; 
    grid-template-columns: repeat(3, 1fr); */
    display: flex;
    gap: 2rem;
  }
  .el_wrapper {
    box-shadow: var(--hover-shadow);  
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    justify-content: center; 
    height: 390px;
    width: 250px; 
    padding: 2rem .5rem;
    padding-bottom: 3rem;
  }
  .el_wrapper:hover {
    cursor: pointer;
  }
  .el_wrapper-0,
  .el_wrapper-1,
  .el_wrapper-2 {
    transition: all .5s ease-in;
    position: relative;
  }
  h2 {
    transition: all .5s ease-in;
    margin-top: 2rem;
    text-transform: uppercase;
  }
  .el_wrapper-0 .el_price {
    position: absolute;
    top: 1.25rem;
    left: 50%;
    font-size: .9rem;
    background-color: var(--color-wallet-fund-available);
    transform: translateX(-50%);
    white-space: nowrap;
    padding: 0 .5rem;
  }
  .el_wrapper-2 .el_price {
    position: absolute;
    top: 1rem;
    left: 50%;
    white-space: nowrap;
    transform: translateX(-50%);
  }
  .el_wrapper-0:hover {
    background-color: var(--color-wallet-fund-invested); 
  }
  .el_wrapper-1:hover {
    background-color: var(--color-urgency-middle-10); 
  }
  .el_wrapper-2:hover {
    background-color: var(--color-urgency-low-10); 
  }
  .el_price {
    transition: all .5s ease-in;
  }
  .el_wrapper-0:hover h2 {
    color: var(--color-global-baackground_light)!important;
  }
  .el_wrapper-0:hover .el_price {
    background-color: var(--color-global-baackground_light);
  }
  .el_img_wrapper {
    max-width: 250px;
    margin-top: 2rem; 
  }
  .el_wrapper-0 img {
    width: 100%;
    border-radius: 3rem;
    box-shadow: 2px 4px 32px 0px rgba(143, 111, 234, 0.5);
  }
  .el_wrapper-1 img {
    width: 100%;
    border-radius: 1rem;
    box-shadow: 2px 4px 32px 0px rgba(242, 130, 66, 0.5);
  }

  .el_wrapper-2 img {
    width: 100%;
    border-radius: 3rem;
    box-shadow: 2px 4px 32px 0px rgba(128, 191, 138, 0.5)
  }

  /* HELP BLOCK */
  .help_section-container {

  }
  .help_section-container ul {
    list-style: none;
    margin: 0;
    padding: 0;
    margin-left: 1rem;
  }
  .help_section-container ul li {
    padding: 1rem;
    border-left: 1px solid var(--color-btn-hover-bg);
    margin: 1rem 0;
  }
  .help_section-container ul li:hover {
    border-left: 1px solid var(--color-urgency-low)
  }
}
@media (min-width: 1200px) and (max-width: 1399px) {
  .section_container {
    grid-template-columns: repeat(4,1fr);
  }

}
@media (min-width: 1400px) {

}
</style>
