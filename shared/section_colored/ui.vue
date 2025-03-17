<template>
    <div class="section_wrapper"> 
        <div class="section" :class="[props.padding ? 'pt-3 pb-2 px-3' : '']">

            <!-- {{ props.current_task}} -->

            <div v-if="props.current_task" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">

              <!-- CREATED DATE -->
              <!-- <div>
                <p style="margin: 0; white-space: nowrap; font-size: 0.8rem;">{{ props.current_task?.created_at }}</p>
              </div> -->

              <!-- TITILES -->
              <div>

                <!-- TITLE -->
                <h4 style="font-size: 0.6rem; display: block; font-weight: normal; margin: 0; color: var(--color-global-text_second)">*{{ props?.name }}</h4>
                <!-- DESK-->
                <h3 style="font-size: 1.2rem; margin-top: .3rem">{{ cutTaskDesc(props.current_task?.desc, 40) }}</h3>
              </div>


              <!-- FOOTER -->
              <div style="display: flex; flex-direction: column; align-items: space-between; justify-content: space-between;">

                <div class="label_count-wrapper">

                  <!-- Label -->
                  <div
                    style="font-size: 0.8rem;"
                    :style="
                      setTaskAccomplishmentLabel(
                        countFinishedAccomplishmentTask(props?.taskArray),
                        countAccomplishmentTask(props?.taskArray)
                      ) === 'Долг' ? `color: var(--color-urgency-middle)` : `color: var(--color-urgency-low-wo)`
                    ">
                    {{ setTaskAccomplishmentLabel(countFinishedAccomplishmentTask(props?.taskArray), countAccomplishmentTask(props?.taskArray)) }}
                  </div>

                  <!-- COUNT -->
                  <div style="font-size: 0.8rem;">
                    paid {{ countFinishedAccomplishmentTask(props?.taskArray) }} из {{ countAccomplishmentTask(props?.taskArray) }}
                  </div>
                </div>

                <div class="status_deadline-wrapper">
                  <!-- STATUS -->
                  <p class="ticket_status">{{ props.current_task?.status }}</p>
                  <!-- DEADLINE -->
                  <p class="ticket_deadline">Успеть до: {{ props.current_task?.deadline.slice(0,10) }}</p>
                </div>

                <!-- URGENCY -->
                <div 
                  class="ticket_urgency"
                  :style="`background-color: ${set_bgColor_by_urgency(props.current_task?.urgency)}`"
                  style="display: flex; align-items: center; justify-content: center; font-size: .6rem;"
                >
                  {{ props.current_task?.urgency }}
                </div>
              </div>


              <!-- ADDONS -->
              <!--  -->
              <!-- DEADLINE -->
              <!-- <div v-if="props.current_task?.deadline" class="ticket_deadline">
                Deadline: {{ props.current_task?.deadline.slice(0,10) }}
              </div> -->
              
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
                <div style="background-color: var(--color-btn-text); border-radius: 100%; width: 42px; height: 42px; display: flex; align-items: center; justify-content: center;">
                  <Icon
                    name="material-symbols-light:done-all-rounded"
                    size="32px"
                    color="var(--color-urgency-low)"
                  />
                </div>
                <!-- <p>Выполнено</p> -->
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

  .section_wrapper {
    transition: all .2s ease-in;
    border-radius: 1rem;
  }
  .section_wrapper:hover {
    box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  }

  .section {
    /* background-color: var(v-bind('bgColor')); */
    /* width: 100%; */
    display: flex;
    flex-direction: v-bind('props.fDirection');
    /* align-items: center; */
    justify-content: center;
    gap: v-bind('props.fGap');
    height: 100%;
    position: relative;
    overflow: hidden;
    border: 1px solid var(--color-btn-hover-bg);
    border-radius: 1rem;
  }

  .label_count-wrapper,
  .status_deadline-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  /* TICKET STATUS */
  .ticket_status {
    margin: 0; 
    font-size: 0.8rem;
    color: var(--color-global-text_second);
  }
  /* TICKET DEADLINE */
  .ticket_deadline {
    width: fit-content;
    color: var(--color-btn-bg); 
    font-size: 0.8rem;
    margin: 0;
  }

  /* TIKET PERIOD */
  /*  */
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
    /* border-radius: var(--bs-border-radius); */
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
  .ticket_paused p {
    margin: 0;
    background-color: var(--color-btn-text);
    color: var(--color-global-text_second);
    border-radius: 1rem;
    padding: 4px 8px;
  }
  /* urgency */
  .ticket_urgency {
    margin-top: .3rem;
    width: fit-content; 
    padding: 2px 8px;
    background-color: black;
    color: black;
    align-self: flex-end;
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