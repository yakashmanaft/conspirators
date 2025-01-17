<template>
    <div class="section_wrapper"> 
        <div class="section shadow rounded" :class="[props.padding ? 'py-4 px-4' : '']" >

            <!-- {{ props.current_task}} -->

            <div v-if="props.current_task">

              <!-- CREATED DATE -->
              <div>
                <p style="margin: 0; white-space: nowrap; font-size: 0.8rem;">{{ props.current_task?.created_at }}</p>
              </div>
              <!-- DESK-->
              <h3 style="font-size: 1.2rem;">{{ cutTaskDesc(props.current_task?.desc, 40) }}</h3>

              <!-- TITLE -->
              <h4 style="font-size: 0.6rem; display: block; font-weight: normal;" >*{{ props?.name }}</h4>
              <!-- <h4>*{{ translateProjectID(item.project_id, project_list) }}</h4> -->

              <!-- FOOTER -->
              <div style="display: flex; align-items: flex-end; justify-content: space-between;">

                <!-- LEFT -->
                <div>

                  <div>
                    <!-- STATUS -->
                    <p style="margin: 0; font-size: 0.8rem;">{{ props.current_task?.status }}</p>
                    <!-- URGENCY -->
                    <div 
                      class="ticket_urgency"
                      :style="`background-color: ${set_bgColor_by_urgency(props.current_task?.urgency)}`"
                    ></div>
                  </div>

                  <!-- COUNT -->
                  <div>
                   {{ countFinishedAccomplishmentTask(props?.taskArray) }} / {{ countAccomplishmentTask(props?.taskArray) }}
                  </div>
                </div>

                <!-- RIGHT -->
                <!-- Label -->
                <div
                  :style="
                    setTaskAccomplishmentLabel(
                      countFinishedAccomplishmentTask(props?.taskArray),
                      countAccomplishmentTask(props?.taskArray)
                    ) === 'Долг' ? `color: var(--color-urgency-middle)` : `color: var(--color-urgency-low-wo)`
                  ">
                  {{ setTaskAccomplishmentLabel(countFinishedAccomplishmentTask(props?.taskArray), countAccomplishmentTask(props?.taskArray)) }}
                </div>


              </div>

              <!-- ADDONS -->
              <!--  -->
              <!-- DEADLINE -->
              <div v-if="props.current_task?.deadline" class="ticket_deadline">
                Deadline: {{ props.current_task?.deadline }}
              </div>
              
              <!-- CANCELED -->
              <div v-if="props.current_task?.status === 'canceled'" class="ticket_canceled">
                <p>Отменён</p>
              </div>

              <!-- PAUSED -->
              <div v-if="props.current_task?.status === 'paused'" class="ticket_paused">
                <p>Пауза</p>
              </div>

              <!-- FINISHED -->
              <div v-if="props.current_task?.status === 'finished'" class="ticket_finished">
                <p>Выполнено</p>
              </div>

            </div>
        </div>
    </div>
  </template>

<script lang="ts" setup>
  const props = defineProps({
    current_task: {
      type: Object,
      default: undefined
    },
    name: {
      type: String,
      default: 'Беез имени'
    },
    taskArray: {
      type: Array,
      default: []
    },
    padding: {
      type: Boolean,
      default: true
    },
    bg: {
      type: String,
      default: '#fff'
    },
    fDirection: {
      type: String,
      default: 'row'
    },
    fGap: {
      type: String,
      default: 'unset'
    }
  })

  // CONST
  //= bgColor
  // const bgColor = ref('var(--color-btn-text)')

  // PROPS
  //= cutTaskDesc
  const cutTaskDesc = (str: string, maxLength: number) => {
    if(str.length > maxLength) {
      str = str.substring(0, maxLength - 3)
      return `${str}...`
    } else {

      return str
    }
  }

// SET
//= set_bgColor_by
const set_bgColor_by_urgency = (urgency: string) => {
  // let color = bgColor.value
  let color = 'red';

  // by urgency
  if(urgency) {

    //= low
    if(urgency === 'low') {
      color = 'var(--color-urgency-low)'
    }
    //= middle
    if(urgency === 'middle'){

      color = `var(--color-urgency-middle)`
    }
    //= high
    if(urgency === 'high'){
      color = `var(--color-urgency-high)`
    }
    return color
  } 
  // set_bgColor_by_
  // by status
  // if(el?.status) {
  //     // BLANK
  //   if(el?.status === 'blank') {
  //     color = 'var(--color-status-canceled)'
  //   }
  //   // PAUSED
  //   else if(el?.status === 'paused') {
  //     // color = 'var(--color-bg-popup)'
  //     color = 'var(--color-status-paused)'
  //   }
  //   // CANCELED
  //   else if(el?.status === 'canceled') {
  //     color = 'var(--color-status-canceled)'
  //   }
  //   // PAUSED
  //   // FINISHED
  //   else if(el?.status === 'finished') {
  //     color = 'var(--color-status-finished)'
  //   }
  // }

}



onMounted(() => {
  // bgColor.value = set_bgColor_by(props?.current_task)
})

// SET
//= count finished accomplishment task
const countFinishedAccomplishmentTask = (taskLedger: any) => {
  let endedSum:number = 0;

  taskLedger?.forEach((item:any) => {

    if(item?.status === 'finished') {

      endedSum += Math.abs((new Date(item.ended_at) - new Date(item.created_at)) / (1000 * 60 * 60) % 24)
    }    
  })

  return endedSum.toFixed(2)
}
//= count accomplishment task
const countAccomplishmentTask = (taskLedger: any) => {
  let sum:number = 0

  taskLedger?.forEach((item:any) => {
    sum += Math.abs((new Date(item.ended_at) - new Date(item.created_at)) / (1000 * 60 * 60) % 24)
  })

 return sum.toFixed(2)
}
//= accomplishment label by task
const setTaskAccomplishmentLabel = (finished: any, sum: any) => {
  if(finished < sum) {

    return `Долг`
  } else if (finished == sum) {
    return `Оплачено`
  }
}

// WATCH
// set_bgColor_by

</script>
  
  <style scoped>
  /* .backgroundUrgencyColor {
    background-color: v-bind('bgColor');
  } */

  .section {
    /* background-color: var(v-bind('bgColor')); */
    /* width: 100%; */
    display: flex;
    flex-direction: v-bind('props.fDirection');
    /* align-items: center; */
    justify-content: center;
    gap: v-bind('props.fGap');
    height: 100%;
  }

  /* TIKET PERIOD */
  /*  */
  /* TICKET DEADLINE */
  .ticket_deadline {
    position: absolute; 
    top: 0; 
    left: 0; 
    width: 100%;
    background-color: black; 
    color: var(--color-btn-text); 
    font-size: 0.6rem;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  /* TICKET PLUG */
  /* .rounded {
    
  } */
  /* TICKET PAUSED */
  .ticket_canceled,
  .ticket_paused,
  .ticket_finished {
    position: absolute; 
    top: 0; 
    left: 0;
    backdrop-filter: blur(2px);
    width: 100%; 
    height: 100%; 
    display: flex; 
    align-items: center; 
    justify-content: center;
    border-radius: 0.5rem;
    /* overflow: hidden;s */
  }
  .ticket_canceled {
    background-color: var(--color-status-canceled); 
  }
  .ticket_paused {
    background-color: var(--color-status-paused); 
  }
  .ticket_finished {
    background-color: var(--color-status-finished)
  }
  .ticket_canceled p,
  .ticket_paused p,
  .ticket_finished p {
    margin: 0;
    color: var(--color-btn-text);
    text-transform: uppercase;
  }
  /* urgency */
  .ticket_urgency {
    position: absolute;
    top: 1.4rem;
    right: 1rem;
    border-radius: 50%;
    /* border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem; */
    width: 1.3rem; 
    height: 1.3rem; 
    background-color: black
  }
@media screen and (max-width: 575px) {
}

@media screen and (max-width: 767px) {
    .section {
        /* background-color: unset!important;
        padding: unset!important;
        box-shadow: unset!important; */
    }
    
}
  </style>
  
  <!-- https://github.com/vadimkaKharitonenko/severyanochka/tree/master -->