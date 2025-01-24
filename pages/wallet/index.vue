<script setup lang="ts">
// shared
import { Container } from "@/shared/container";
import { Section } from '@/shared/section';

// components
// import { HorizontalCard } from "@/components/card";
// import { StackedCard } from "@/components/card"
import { BreadCrumbs } from "@/components/breadcrumbs"; 


// components
import { Chip } from "~/components/chip";

//
const route = useRoute();
// 
const sessionUser = useUserSession().user;
// useProfileStore().loadData()
// const profiles = useProfileStore().profiles

// Chips
//= section fund
const choosenChip_section = ref('available')
// = affiliation
const affiliationFundsChips = ref([
  {
    name: 'all',
    title: 'Всего',
    id: 'chips_funds_1'
  },
  {
    name: 'mine',
    title: 'Мои',
    id: 'chips_funds_2'
  },
  {
    name: 'unidrum',
    title: 'Unidrum',
    id: 'chips_funds_3'
  },
  {
    name: 'AC',
    title: 'АС',
    id: 'chips_funds_4'
  },
  {
    name: 'EC',
    title: 'ЕС',
    id: 'chips_funds_5'
  },
  {
    name: 'IS',
    title: 'ИС',
    id: 'chips_funds_6'
  },
  {
    name: 'Conspirators',
    title: 'Соучастники',
    id: 'chips_funds_7'
  },
  {
    name: 'JD',
    title: 'ЮД',
    id: 'chips_funds_8'
  },
  {
    name: 'JS',
    title: 'ЮС',
    id: 'chips_funds_9'
  }
]) 
const currentAffiliation = ref({
  name: 'all',
  title: 'Всего',
  id: 'chips_funds_1'
})

// = wallet articles
const wallet_sections = ref([
  {
    title: 'Свободные средства',
    name: 'available',
    total: 3750287.08,
    aticles: [

    ]
  },
  {
    title: 'Инвестировано',
    total: 150428.08,
    name: 'invested',
    aticles: [

    ]
  },
  { 
    title: 'Долг',
    total: 0.00,
    name: 'debt',
    aticles: [

    ]
  }
])

// data base

useHead({
  title: "Мой кошелек",
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

onMounted(() => {
  const scrollContainer = document.getElementById("fund-block");
  const scrollAffiliationContainer = document.getElementById("affiliation-chip-block")

  scrollContainer?.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollContainer.scrollLeft += evt.deltaY;
  });

  scrollAffiliationContainer?.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollAffiliationContainer.scrollLeft += evt.deltaY;
  });
})

// EMITS FUNCTIONs

// choose title
// const titles = ref([
//   {
//     title: "Активы",
//     name: "assets",
//   },
//   {
//     title: "История",
//     name: "history",
//   },
// ]);
// const currentTitle = ref("assets");

// const listItemType = ref([])

// Инструмент
// tools

// Расходники
// consumables

// Техника
// technic

// Материалы
// stuff

// Находим выбранный ФОНД фондового рынка
// const computedFund = computed(() => funds.value[0]);
// const {
//   pending,
//   error,
//   refresh,
//   data: funds,
//   status,
// } = await useFetch("/api/funds/partnerStockFunds", {
//   lazy: false,
//   transform: (funds) => {
//     return funds.filter((fund) => fund.id === +route.params.id);
//   },
// });

// Ищем транзакции по фонду в трех леджерах (бонды, акции, деньги)
// const computedTransactions = computed(() => {
//     let array = []

//     array = [...transactions_shares.value, ...transactions_bonds.value, ...transactions_fiat.value].filter(transaction => transaction.fundID === +route.params.id)

//     return array
// })
// const { data: transactions_bonds } = await useFetch("/api/funds/stockBondsLedger", {
//     lazy: false,
//     transform: (transactions) => {
//         return transactions
//     }
// })
// const { data: transactions_shares } = await useFetch("/api/funds/stockShareLedger", {
//     lazy: false,
//     transform: (transactions) => {
//         return transactions
//     }
// })
// const { data: transactions_fiat } = await useFetch("/api/funds/stockFiatLedger", {
//     lzay: false,
//     transform: (transactions) => {
//         return transactions
//     }
// })

// Translaters
// const translateStockFundType = (type) => {
//   if(type) {
//     if(type === 'iia') {
//       return 'ИИС'
//     } else if (type === 'ba') {
//       return 'Брокерский счет'
//     }
//   }
// }

// CLICK
//= changeChipAffiliation
const changeChipAffiliation = (obj: any) => {
  currentAffiliation.value = obj
}

// Colorized
//= set_bgColor
const set_bgColor = (section: any) => {
  let color;

  // ****** Title ******
  if(section.name) {

    // Свободные средства
    if(section.name === 'available') {
      if(choosenChip_section.value === section.name) {
        color = `var(--color-wallet-fund-available-wo)`
      } else {
        color = `var(--color-wallet-fund-available)`
      }
    } 
    if(section.name === 'invested') {
      if(choosenChip_section.value === section.name) {
        color = `var(--color-wallet-fund-invested-wo)`
      } else {
        color = `var(--color-wallet-fund-invested)`
      }
    }
    if(section.name === 'debt') {
      if(choosenChip_section.value === section.name) {
        color = `var(--color-wallet-fund-debt-wo)`
      } else {
        color = `var(--color-wallet-fund-debt)`
      }
    }
    else {
      // color = null
    }
  }

  return color
}

// WATCh
//= choosenChip_section
watch(choosenChip_section, () => {
  console.log(`Переключили вкладку на ${choosenChip_section.value}`)
})
</script>

<template>
  <Container>

    <div class="show-max-767" >
      <BreadCrumbs/>
      <!-- TITLE -->
      <h1 style="font-weight: bold; font-size: 42px;">Мой кошелек</h1>
    </div>

    <!-- <p style="margin: 0; margin-left: 1rem;">session: {{ sessionUser }}</p>
    <p style="margin: 0; margin-left: 1rem;">{{ currentAffiliation }}</p> -->



    <!-- CHIPs -->
    <Chip
      id="affiliation-chip-block"
      :tabs="affiliationFundsChips"
      :default="currentAffiliation"
      :btn_all_exist="false"
      @changed="changeChipAffiliation"
    />
    <!-- <chip
      :tabs="[
        {
          title: 'Личный',
          name: 'personal',
          id: null
        },
        {
          title: 'bankOfTwo(EC)',
          name: 'bank-of-two_ec',
          id: 1
        },
        {
          title: 'bankOfTwo(MC)',
          name: 'bank-of-two_mc',
          id: 7 
        },
        {
          title: 'bankOfTwo(EC)',
          name: 'bank-of-two_ec',
          id: 1
        },
      ]"
      :default="{
        title: 'Все',
        name: 'all',
        id: null,
      }" 
      :btn_all_exist="true"
      @changed="emittedChip_bank"
    /> -->

    <!-- === INFO SECTION === -->
    <div id="fund-block" class="wallet-section_container">

      <Section 
        v-for="section in wallet_sections" 
        :bg="set_bgColor(section)" 
        :fDirection="`column`" 
        class="section-header_wrapper"
        @click="choosenChip_section = section.name"
      >
        
        <!-- section header -->
        <header>
          <h2 :style="choosenChip_section === section.name ? 'color: #fff' : 'color: unset'" style="text-wrap: nowrap; font-size: unset; font-weight: unset;">{{ section.title }}</h2>
          <p :style="choosenChip_section === section.name ? 'color: #fff' : 'color: unset'" style="margin: 0; text-wrap: nowrap;">{{ section.total }} P</p>
        </header>

        <!-- section articles -->
        <!-- <HorizontalCard>123</HorizontalCard>
        <StackedCard>2704Кредит2024 | 275 734.00 P</StackedCard>
        <StackedCard>Брокерский счет (Тинькофф) | 275 734.00 P</StackedCard> -->
      </Section>

    </div>

    <!--  -->
    <div>

      <!-- available -->
      <div style="font-size: 2rem; font-weight: bold;" v-if="choosenChip_section === 'available'">Available by {{ currentAffiliation.title }}</div>
      <div style="font-size: 2rem; font-weight: bold;" v-if="choosenChip_section === 'invested'">Invested by {{ currentAffiliation.title }}</div>
      <div style="font-size: 2rem; font-weight: bold;" v-if="choosenChip_section === 'debt'">Debt by {{ currentAffiliation.title }}</div>
    </div>


    <!-- ALL -->
    <!--  -->
     <section class="current-fund_container">
       <div class="current-fund_wrapper">

        <!-- AVAILABLE -->
        <div v-if="choosenChip_section === 'available'">

          <!-- НАКОПИТЕЛЬНЫЕ СЧЕТА -->
          <div class="fund-el_contatiner">
  
            <section>
              <header>Накопительные счета</header>
              <main>
                <ul>
                  <!--  -->
                  <li>
                    <p>Сбербанк</p>
                    <ul> 
                    <li>LambArt BOT</li>
                    <li>Запасы</li>
                    <li>ЕС</li>
                    <li>АС</li>
                    <li>ЮС</li>
                    <li>ДомИнвест</li>
                  </ul>
                  </li>
                  <!--  -->
                  <li>
                    <p>ВТБ</p>
                    <ul>
                      <li>Unidrum</li>
                      <li>ЕС</li>
                      <li>ЮС</li>
                      <li>ЮД</li>
                    </ul>
                  </li>

                  <!--  -->
                  <li>
                    <p>Яндекс</p>
                    <ul>
                      <li>Купоны</li>
                      <li>Станция</li>
                      <li>ЕС</li>
                      <li>ЕС ФИИ</li>
                      <li>ЮС</li>
                      <li>Соучастники</li>
                      <li>ФИИ</li>
                      <li>ЮД</li>
                    </ul>
                  </li>

                  <li>
                    <p>Т-Банк</p>
                    <ul>
                      <li>ЮС</li>
                      <li>Юнидрам</li>
                    </ul>
                  </li>
                  <li>
                    <p>Ренесанс</p>
                    <ul>
                      <li>ИС</li>
                      <li>Магнит</li>
                    </ul>
                  </li>
                  <li>
                    <p>БКС</p>
                    <ul>
                      <li>ИС</li>
                    </ul>
                  </li>
                </ul>
              </main>
            </section>
  
  
          </div>

          <!-- НАЛИЧНЫЕ -->
          <div class="fund-el_contatiner">

            <section>
              <header>Наличные</header>
              <main>
                <ul>
                  <li>Нет наличных</li>
                </ul>
              </main>
            </section>
            
          </div>
        </div>
   
        
        <!-- INVESTED -->
        <!--  -->
        <div v-if="choosenChip_section === 'invested'">

          <!-- БАНКОВСКИЕ ВКЛАДЫ -->
          <div class="fund-el_contatiner">
          <section>
            <header>Банковские вклады</header>
            <main>
              <ul>
                <!-- <li>Сбербанк</li> -->
                  <li>Нет вкладов</li>
              </ul>
            </main>
          </section>
          </div>

          <!-- БРОКЕРСКИЕ СЧЕТА -->
          <div class="fund-el_contatiner">
            <section>
              <header>Брокерские счета</header>
              <main>
                <ul>
                  <li>
                    <p>Т-Банк</p>
                    <ul>
                      <li>Инвесткопилка</li>
                      <li>Валюта</li>
                      <li>Камини</li>
                      <li>BOT</li>
                    </ul>
                  </li>
                  <li>
                    <p>Сбер</p>
                    <ul>
                      <li>Без имени</li>
                    </ul>
                  </li>
                  <li>
                    <p>Альфа-Инвестиции</p>
                    <ul>
                      <li>Без имени</li>
                    </ul>
                  </li>
                  <li>
                    <p>БКС</p>
                    <ul>
                      <li>ИС Без имени</li>
                      <li>ИС</li>
                    </ul>
                  </li>
                  <li>
                    <p>Кит Финанс</p>
                    <ul>
                      <li>Без имени</li>
                    </ul>
                  </li>
                  <li>
                    <p>Цифра Брокер</p>
                    <ul>
                      <li>Без имени</li>
                    </ul>
                  </li>
                </ul>
              </main>
            </section>
          </div>

          <!-- КРИПТА -->
          <div class="fund-el_contatiner">


            <section>
              <header>Крипта</header>
              <main>
                <!-- Кошельки -->
                <ul>
                  <li>
                    <p>Кошельки</p>
                    <ul>
                      <li>MetaMask</li>
                      <li>Phantom</li>
                    </ul>
                  </li>
                  <li>
                    <p>Балансы Бирж</p>
                    <ul>
                      <li>Binance</li>
                    </ul>
                  </li>
                  <li>
                    <p>Стейкинг</p>
                    <ul>
                      <li>MTT Network</li>
                    </ul>
                  </li>
                </ul>
                <ul>
                  <li>Не вкидывали в крипту</li>
                </ul>
              </main>
            </section>

          </div>

          <!-- КРЕДИТЫ -->
          <div class="fund-el_contatiner">

            <section>
              <header>Кредиты</header>
              <main>
                <ul>
                  <li>Не выдавали кредиты</li>
                </ul>
              </main>
            </section>
            
          </div>

          <!-- ПРочЕЕ -->
          <div class="fund-el_contatiner">

            <section>
              <header>Прочее</header>
              <main>
                <ul>
                  <li>Нет инвестиций</li>
                </ul>
              </main>
            </section>

            </div>
        </div>
   
        <!-- DEBT -->
        <!--  -->
        <div v-if="choosenChip_section === 'debt'">
          <div class="fund-el_contatiner">

            <section>
              <header>Пропущенные взносы</header>
              <main>
                <ul>
                  <li>Нет пропусков</li>
                </ul>
              </main>

            </section>
          </div>
          <!-- КРЕДИТЫ -->
          <div class="fund-el_contatiner">

            <section>
              <header>Кредиты</header>
              <main>
                <ul>
                  <li>ЕС</li>
                  <li>Unidrum</li>
                  <li>ЮС</li>
                </ul>
              </main>
            </section>
          </div>
        </div>
       </div>
     </section>

    <!-- <div>
      {{ computedFund }}
    </div> -->


    <!-- <div>
      <p>Дата создания: {{ computedFund.created_at }}</p>
      <p>Основатель: {{ computedFund.creatorID }}</p>
      <p>Брокер: {{ computedFund.stockBroker.title }}</p>
      <p>Тип счета: {{ translateStockFundType(computedFund.accountType) }}</p>
    </div> -->

    <!-- Кнопки - заголовки -->
    <!-- <h2 class="switch-title_container">
      <div v-for="(title, i) in titles" class="switch-title_el">
        <input
          type="radio"
          :id="i"
          :value="title.name"
          v-model="currentTitle"
        />
        <label :for="i">{{ title.title }}</label>
      </div>
    </h2> -->

    <!-- list of assets -->
    <!-- <div v-if="currentTitle === 'assets'"> -->

        <!--  -->
        <!-- <div v-for="(asset, index) in computedFund.assets">
            {{ asset }}
        </div>
    </div> -->
    <!-- list of history -->
    <!-- <div v-else-if="currentTitle === 'history'"> -->

        <!--  -->
        <!-- <div v-if="!computedTransactions.length">
            Ничего нет...
        </div> -->

        <!--  -->
        <!-- <div v-else>

            <div v-for="(transaction) in computedTransactions">
                {{ transaction.type }} | {{ transaction }}
            </div>
        </div> -->
    <!-- </div> -->
    <!-- list of else -->
    <!-- <div v-else>Ни того, ни другого...</div> -->
  </Container>
</template>

<style scoped>
/*  */
.switch-title_container {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.switch-title_el input[type="radio"] {
  opacity: 0;
  position: fixed;
  width: 0;
}
.switch-title_el label {
  color: var(--bs-tertiary-color);
}
.switch-title_el label:hover {
  cursor: pointer;
}
.switch-title_el input[type="radio"]:checked + label {
  color: unset;
}

/* conspirators v1.0.0 */
.wallet-section_container {
  display: flex;
  -ms-overflow-style: none;  /* IE and Edge */
  overflow: scroll; 
  scrollbar-width: none; 
  max-width: 100vw!important;
  gap: 1rem;
}

.wallet-section_container:-webkit-scrollbar {
  display: none;
}

.section-header_wrapper:hover {
  cursor: pointer;
}

.section-header_wrapper p{
  font-size: 36px; 
  font-weight: bold;
}

.current-fund_container {
}

.current-fund_wrapper {
}
.fund-el_contatiner {

}

/*  */
@media screen and (max-width: 575px) {
  .show-max-767 {
    display: none;
  }
  .wallet-section_container {
    margin-top: 2rem;
    padding: 0 0.5rem;
    padding-bottom: 1.5rem;
    gap: .5rem;
  }
  .section-header_wrapper {
    min-width: 220px;
  }
  .section-header_wrapper p {
    font-size: 16px;
  }
}
@media screen and (min-width: 576px) {
  .section-header_wrapper {
    min-width: 330px;
  }
}
@media screen and (min-width: 576px) and (max-width: 767px) {
  .show-max-767 {
    display: none;
  }
  .wallet-section_container {
    margin-top: 2rem;
    padding: 0 1rem;
    padding-bottom: 1.5rem;
  }
  .section-header_wrapper p {
    font-size: 32px;
  }
}
@media screen and (min-width: 768px) and (max-width: 991px) {
  .wallet-section_container {
    margin-top: 2rem;
    margin-left: -1rem;
    padding-left: 1rem;
    margin-right: -.5rem;
    padding-right: .5rem;
    padding-bottom: 1.5rem;
  }
}
@media screen and (min-width: 992px) and (max-width: 1199px){
  .wallet-section_container {
    margin-top: 2rem;
    margin-left: -1rem;
    padding-left: 1rem;
    padding-bottom: 1.5rem;
  }
}
@media screen and (min-width: 1200px) {
  .wallet-section_container {
    margin-top: 2rem;
    margin-left: -1rem;
    padding-left: 1rem;
    padding-bottom: 1.5rem;
  }
}
</style>
