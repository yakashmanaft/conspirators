<template>
  <!-- 
    type: 
      1/ original-btn
      2/ pseudo-btn

    link:
      everything in route, not external
    
    bg:
      1/ bg-full
      2/ bg-stroke

    width:
      100px/rem/em/etc...

    disabled 
      1/ true
      2/ false

    wing
      1/ true
      2/ false  
  -->
  <div style="
    display: grid; 
    grid-template-areas: 'filter filter'
                          'diagram legend';
    gap: 1rem;
  ">
    <!--  -->
    <div style="grid-area: filter;">
      <ul style="margin: unset; list-style: none; padding: 0; display: flex; gap: 1rem; ">
        <li style="border-bottom: 1px solid black;">by Amount</li>
        <li>by Owner</li>
        <li>by Type</li>
        <li>by Tag</li>
        <li>by Broker tag</li>
      </ul>
    </div>  
    <!-- diagram of meshes -->
    <div class="diagram_wrapper" style="grid-area: diagram">
      
      <svg class="chart viewBox=0 0 40 40">
        <circle v-for="(el, index) in meshes_list" :key="index" class="unit" r="15.9" cx="50%" cy="50%">
          {{ el }}
        </circle>
      </svg>
    </div>
  
    <!-- list of meshes -->
    <div class="list_wrapper" style="grid-area: legend">
  
      <ul style="padding: 0;">
        <li style="display: grid; grid-template-columns: repeat(7, 1fr); font-weight: bold; border-bottom: .5px solid black;">
          <div>id</div>
          <div>name</div>
          <div>owner</div>
          <div>type</div>
          <div>tag</div>
          <div>broker tag</div>
          <div>amount</div>
        </li>
        <li v-for="mesh in meshes_list" style="display: grid; grid-template-columns: repeat(7, 1fr);">
          <div>{{ mesh.id }}</div>
          <div>{{ mesh.name }}</div>
          <div>{{ mesh.ownerType }} {{ mesh.ownerID }}</div>
          <div>{{ mesh.type }}</div>
          <div>{{ mesh.tag }}</div>
          <div>{{ mesh.broker_tag }}</div>
          <div>{{ calcMeshAmount(mesh.id, mesh.type, mesh.tag, mesh.name, 0) }}</div>
        </li>
        <!-- {{ meshes_list }} -->
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>

//plugins
import {calcMeshAmount} from "~/helpers/calc_mesh_amount"

const route = useRoute()

// PROPS
const props = defineProps({
  // type: String,
  // link: String,
  // bg: String,
  // bgc: {
  //   type: String,
  //   default: '--color-btn-bg'
  // },
  // width: {
  //   type: String,
  //   default: 'unset'
  // } ,
  // disabled: Boolean
  meshes_list: {
    type: Array,
    default: []
  },
  // transaction_ledger {
  //   type: Array,
  //   default: []
  // }
});

// EMITS
// = variables
// const emit = defineEmits(["changed"]);
// = emits
// const emit_object = (obj: any) => {
//   if (obj) {
//     emit("changed", obj);
//     // console.log(name)
//   }
// };

// Mounted
onMounted(() => {
});

// FUNC
//=
// const setStrokeDashArrayAndOffset = () => {

//     let chart = document.querySelector('.chart')

//     if(chart) {
//         setTimeout(() => {
//             let units = chart.querySelectorAll('.unit')

//             for(let i = 0; i <= props.meshes_list?.length; i++) {

//                 if(props.meshes_list?.[i]) {
//                     // let ratio = 1 / computed_landing_list.value?.length * 100;
//                     let ratio = setMinValueLandingLeads(computed_landing_list.value?.[i].leads) / sumQtyLandingLeadsFunc() * 100

//                     units[i].setAttribute('stroke-dasharray', `${ratio},100`)
//                     units[i].setAttribute('stroke-dashoffset', 0);

//                     if(i === 0) {
//                         units[i].setAttribute('stroke-dashoffset', 0);
//                     } else {
//                         // Получаем значение 'stroke-dasharray' предыдущего элемента
//                         let sdArrPrev = parseFloat(units[i - 1].getAttribute('stroke-dasharray')) * (-1);
//                           // Получаем значение 'stroke-dashoffset' предыдущего элемента
//                         let sdOffPrev = parseFloat(units[i - 1].getAttribute('stroke-dashoffset'));
//                         // Суммируем значения
//                         let sumParam = sdArrPrev + sdOffPrev;
//                         // console.log(sumParam );
//                         // Устанавливаем значения в текущий элемент
//                         units[i].setAttribute('stroke-dashoffset', sumParam);
//                     }
//                 }

//             }
//         },110)
//     }
// }

//=


// WATCHERS
//= 
</script>

<style scoped>


@media screen and (max-width: 575px) {

}

@media screen and (min-width: 576px) and (max-width: 767px) {

}

@media screen and (min-width: 768px) and (max-width: 991px) {

}

@media screen and (min-width: 992px) and (max-width: 1199px) {

}

@media screen and (min-width: 1200px) and (max-width: 1399px) {
  .diagram_wrapper {
    display: flex; 
    background-color: var(--color-btn-hover-bg); 
    width: 25rem; 
    height: 25rem; 
    position: relative;
    margin-top: 1rem;
  }
  .diagram_wrapper svg{
    margin: 0 auto;
  }
}

@media screen and (min-width: 1400px) {

}

</style>
