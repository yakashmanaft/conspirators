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

    <!-- MINE -->
    <section class="current-fund_container" v-if="currentAffiliation.name === 'mine'">

      <div class="current-fund_wrapper">
        <section class="fund-el_contatiner" v-if="choosenChip_section === 'available'">
          <header>Накопительные счета</header>
          <main>
            <section>
              <h4>Личные</h4>
            </section>
            <section>
              <h4>Unidrum <span style="font-size: 0.8rem;">1/2</span></h4>
            </section>
            <section>
              <h4>АС <span style="font-size: 0.8rem;">1/2</span></h4>
            </section>
            <section>
              <h4>ЕС <span style="font-size: 0.8rem;">1/2</span></h4>
            </section>
          </main>
          <header>Наличка</header>
          <main>
            <section>
              <h4>ЕС <span style="font-size: 0.8rem;">1/2</span></h4>
            </section>
          </main>
        </section>

        <section class="fund-el_contatiner" v-if="choosenChip_section === 'invested'">
          <header>Фонда</header>
          <main>
            <section>
              <h4>Личные</h4>
            </section>
            <section>
              <h4>ИС <span style="font-size: 0.8rem;">1/2</span></h4>
            </section>
            <section>
              <h4>BOT <span style="font-size: 0.8rem;">1/5</span></h4>
            </section>
          </main>
        </section>

        <section class="fund-el_contatiner" v-if="choosenChip_section === 'debt'">
          <header>Кредиты</header>
          <main>
            <section>
              <h4>ЕС</h4>
            </section>
          </main>
          <header>Взносы</header>
          <main>
            <section>
              <h4>ЕС</h4>
            </section>
          </main>
        </section>
      </div>
    </section>

    <!-- CONSPIRATORS ALL -->
     <section v-else class="current-fund_container">
       <div class="current-fund_wrapper">
   
         <div class="fund-el_contatiner">
           <header>Вклады</header>
         </div>
   
         <div class="fund-el_contatiner">
           <header>Фонда</header>
         </div>
   
         <div class="fund-el_contatiner">
           <header>Крипта</header>
         </div>

         <div class="fund-el_contatiner">
           <header>Кредиты</header>
         </div>

         <div class="fund-el_contatiner">
           <header>Взносы</header>
         </div>
         Всего # ### ###,## RUB
         Моя доля 1/2 # ### ###,## RUB
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
    margin-top: 1rem;
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
    margin-top: 1rem;
    padding: 0 1rem;
    padding-bottom: 1.5rem;
  }
  .section-header_wrapper p {
    font-size: 32px;
  }
}
@media screen and (min-width: 768px) and (max-width: 991px) {
  .wallet-section_container {
    margin-top: 1rem;
    margin-left: -1rem;
    padding-left: 1rem;
    margin-right: -.5rem;
    padding-right: .5rem;
    padding-bottom: 1.5rem;
  }
}
@media screen and (min-width: 992px) and (max-width: 1199px){
  .wallet-section_container {
    margin-top: 1rem;
    margin-left: -1rem;
    padding-left: 1rem;
    padding-bottom: 1.5rem;
  }
}
@media screen and (min-width: 1200px) {
  .wallet-section_container {
    margin-top: 1rem;
    margin-left: -1rem;
    padding-left: 1rem;
    padding-bottom: 1.5rem;
  }
}
</style>
