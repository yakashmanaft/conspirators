<script setup lang="ts">
// shared
import { Container } from "@/shared/container";
import { Section } from '@/shared/section';

// components
import { HorizontalCard } from "@/components/card";
import { StackedCard } from "@/components/card"


// components
import { Chip } from "~/components/chip";

//
const route = useRoute();
// 
const sessionUser = useUserSession().user;
// useProfileStore().loadData()
// const profiles = useProfileStore().profiles
// = chip
const choosenChip_bank = ref({
  title: 'Все',
  name: 'all',
  id: null
})
// = wallet articles
const wallet_sections = ref([
  {
    title: 'Свободные средства',
    total: 3750287.08,
    aticles: [

    ]
  },
  {
    title: 'Инвестировано',
    total: 150428.08,
    aticles: [

    ]
  },
  {
    title: 'Долг',
    total: 0.00,
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

// EMITS FUNCTIONs
// = chip
const emittedChip_bank = (chip: any) => {
  choosenChip_bank.value = {
    title: chip.title,
    name: chip.name,
    id: chip.id
  }
}

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
</script>

<template>
  <Container>

    <!-- TITLE -->
    <h1 class="show-max-767" style="font-weight: bold; font-size: 42px;">Мой кошелек</h1>

    <!-- CHIPs -->
    <chip
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
        }
      ]"
      :default="{
        title: 'Все',
        name: 'all',
        id: null,
      }" 
      :btn_all_exist="true"
      @changed="emittedChip_bank"
    />

    <br>

    {{ choosenChip_bank }}
    <br>

    <br>

    <!-- === WALLET SECTIONS === -->
    <div class="wallet-section_container">

      <Section v-for="section in wallet_sections">
        
        <!-- section header -->
        <header>
          <h2 style="font-size: unset; font-weight: unset;">{{ section.title }}</h2>
          <p style="font-size: 36px; font-weight: bold;">{{ section.total }} P</p>
        </header>

        <!-- section articles -->
        <HorizontalCard>123</HorizontalCard>
        <StackedCard>2704Кредит2024 | 275 734.00 P</StackedCard>
        <StackedCard>Брокерский счет (Тинькофф) | 275 734.00 P</StackedCard>
      </Section>

    </div>

    <br>
    <p>session: {{ sessionUser }}</p>

    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam earum recusandae officia quasi, odit commodi, voluptatum ut debitis nostrum aspernatur pariatur deserunt perspiciatis fugit magni, illum nihil modi deleniti eaque fuga. Dolorem sed, eos adipisci ex harum ipsum quisquam odit autem iure laboriosam quis sit ullam neque aliquam recusandae amet ad dicta expedita excepturi deserunt. Blanditiis, voluptate exercitationem atque animi commodi quis beatae fuga consequuntur quasi ab quidem tempora illum? Quibusdam, aspernatur dolor! Unde, illo incidunt? Explicabo accusantium molestias quidem voluptatibus in quasi consectetur ex et! Nulla, eaque, obcaecati incidunt repellendus dolorem, unde voluptatibus asperiores laudantium accusantium eum necessitatibus. Quidem quo voluptate explicabo sunt dolorem omnis maxime ullam culpa corporis quas quis adipisci amet perferendis, quos eligendi minus ad! Totam, voluptas facilis. In saepe sed ex officia ea assumenda iusto fugiat minima et error impedit temporibus voluptates cumque accusantium similique, repellat, quisquam sit exercitationem aliquid autem. Unde consectetur voluptatibus at possimus, dolore saepe dicta alias ipsa voluptates hic, quaerat itaque necessitatibus ipsam excepturi omnis eos incidunt aliquid? Soluta sunt mollitia illum ipsum consequuntur fugit distinctio, vel magni quis officiis in vero porro odit. Nemo, vero vel. Nostrum ipsam distinctio atque. Eveniet vel neque praesentium blanditiis illum. Magni dolorum ea omnis molestiae! Omnis non tempore vitae qui expedita accusantium! Commodi alias fuga odio vero minus dicta blanditiis rerum quam illo impedit quod hic saepe iure sequi minima, facere tempore neque cum delectus asperiores, sunt eius quisquam aliquid? Similique blanditiis dicta quasi aperiam eveniet, iusto optio. Tempore placeat delectus eius quia consequatur nihil corrupti fugit! Fugit sunt nam reprehenderit officiis veniam perferendis quisquam numquam error saepe vel neque, consequuntur libero voluptates non, similique labore inventore. Molestiae doloremque minus aut fugit repellendus praesentium ullam voluptatem iste, fugiat quam ut itaque illum possimus, consectetur officiis eaque temporibus ea! Dolorum voluptatum est suscipit, nemo corporis, minima voluptas voluptate necessitatibus labore blanditiis sed cupiditate dignissimos, voluptatem incidunt praesentium dolore voluptatibus adipisci iusto quod facilis hic. Eligendi a doloribus reiciendis minus harum ut fuga sequi, accusantium animi labore, adipisci odit nam quas quos aliquam repudiandae totam. Repellendus voluptate eum dolor quo consectetur a sit at blanditiis optio enim sapiente expedita officiis, sint nostrum iusto reprehenderit est vero totam illo ut! Animi consectetur adipisci recusandae mollitia, nostrum neque tempora cum quia reiciendis debitis. Ex illum numquam deserunt odit sit laboriosam vero, quisquam vel voluptates architecto? Eligendi tempora quae voluptatibus corporis? Expedita, rem vitae? Explicabo, consequatur! Non exercitationem enim at velit accusantium, recusandae quibusdam sed placeat cum in delectus fugiat ab repellendus provident ipsa iusto vel laborum quam eos unde voluptatem pariatur facilis. Voluptatibus ipsum atque numquam quo explicabo asperiores et dicta aperiam unde reiciendis hic officia assumenda dolore pariatur quos quaerat, nulla libero tempora magni. Odit doloremque non adipisci nostrum reiciendis. Nemo illo quaerat adipisci sapiente facilis reiciendis rerum praesentium nisi. Harum fugiat atque perspiciatis sunt incidunt eligendi est, delectus numquam ad facilis molestiae? Iusto quo totam delectus eligendi? Facilis, vero dicta voluptatem porro sapiente dolore optio! Ullam, beatae est fugit ut quisquam sequi esse, animi magni minus cum ipsum nostrum quis modi quos dolorem voluptatibus vero quidem necessitatibus illo eligendi, quaerat soluta! Nemo minima magni illo animi? Quidem sint temporibus nihil iste quia repellendus sequi dolorum quod, enim praesentium tempora, impedit optio quo, deleniti illo modi. Sint adipisci distinctio, temporibus magni natus reiciendis qui, porro pariatur accusamus velit repellendus minima facilis sed officia esse iusto sequi, veritatis modi saepe. Quaerat accusantium beatae aliquam voluptatibus inventore neque necessitatibus fugit? Molestias, accusamus dicta. Sapiente, cupiditate hic accusantium quaerat doloremque quasi recusandae obcaecati dolor dolores corporis, saepe optio accusamus pariatur neque, nam praesentium voluptates reiciendis. Pariatur fugit eligendi odit quas iste harum unde non dolor. Eaque obcaecati suscipit, veniam atque eius veritatis magni quisquam ipsa ex, facere accusamus laudantium voluptatum iure exercitationem labore reiciendis explicabo unde sint itaque! Dolorum ex vitae quo minus, consequatur illo quas corporis voluptatum, repudiandae ad nobis commodi, iure voluptatibus. Error ipsam nobis accusantium cum itaque temporibus architecto debitis, repellendus pariatur ullam, quam modi eum recusandae odio consequatur beatae neque enim, optio veniam ipsum dignissimos. Veritatis expedita temporibus ratione deserunt laboriosam aperiam tempora, soluta sed quos quam. Nam temporibus amet nulla necessitatibus laborum sint accusantium adipisci fugit, voluptatem blanditiis tenetur illum placeat odit dolorem harum neque perspiciatis quod dolores tempora minima iusto omnis! Laboriosam rerum eveniet laudantium excepturi modi natus quo, consectetur at nihil id dolores voluptatem! Similique fugit doloremque ab sint necessitatibus culpa, facilis esse ullam, fugiat explicabo saepe accusantium vel ea harum numquam expedita mollitia? Cupiditate asperiores aperiam ratione explicabo. Nisi, sed? Asperiores molestias unde voluptates architecto corrupti fugiat reiciendis illo repellat blanditiis veritatis iure, quos id exercitationem iusto provident ullam eum! Sint perspiciatis rem sequi reprehenderit ullam tempore mollitia quod ipsam id quaerat velit ab expedita aliquam consectetur nesciunt, delectus facere modi voluptate totam autem vitae iste eius laborum. Quaerat error perspiciatis adipisci nobis praesentium, saepe eos alias ipsum, corrupti, debitis sapiente nisi! Reprehenderit dolor esse similique nisi fugit nam tenetur odit. Tempore saepe, delectus sed unde voluptatum alias quam molestias adipisci maiores voluptates vel iste ad nam totam voluptas harum id fugit perferendis iusto modi dignissimos quia rerum! Et sed iure fugiat, exercitationem debitis neque ipsam nobis, impedit consectetur corrupti tempore voluptatibus ratione aspernatur rem non ut temporibus deserunt dicta, nulla accusantium similique qui. Praesentium repudiandae laborum quam commodi recusandae, saepe minus ducimus veniam repellendus numquam vero, magni nobis quia impedit reprehenderit ullam esse, repellat reiciendis quidem dignissimos quisquam. Dignissimos iusto modi mollitia adipisci, voluptate corrupti tempore, perspiciatis impedit illum cumque ad odit eveniet sint dicta? Ullam, nemo. Adipisci cumque maxime, voluptates fugit itaque laboriosam quis illum non aliquid. Repudiandae ullam incidunt, amet illum deserunt fugit voluptatibus ipsam atque reprehenderit nihil accusamus quod excepturi libero et eligendi dolores laudantium ea, placeat corporis quo temporibus eveniet? Aut alias eos repellat officia aspernatur excepturi recusandae adipisci voluptas odit voluptatem, error id. Perferendis ipsa esse culpa quos, consequuntur alias nihil exercitationem! Voluptatibus inventore hic excepturi nam repudiandae sunt voluptatum perferendis voluptates quam numquam adipisci quisquam minima, voluptas ipsam error libero ex aspernatur velit veritatis dolorum! s</p>
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
  display: grid;
  gap: 0.5rem;
}

/*  */
@media screen and (max-width: 767px) {
  .show-max-767 {
    display: none;
  }
  .wallet-section_container {

  }
}
@media screen and (min-width: 768px) {
  .wallet-section_container {
    grid-template-columns: repeat(2, 1fr)
  }
}
@media screen and (min-width: 992px) {
  .wallet-section_container {
    grid-template-columns: repeat(3, 1fr)
  }
}
</style>
