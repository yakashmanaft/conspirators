<template>
    <div :id="props?.id" style="display: none" class="toast_container">
        
        <div class="toast_wrapper shadow py-4 px-4 mb-4 rounded">
            
            <!-- {{ props?.id }} -->
            <div style="font-weight: bold;">
                {{ props?.title }}
            </div>
            <div>
                {{ props?.content }}
            </div>

            <!-- btn close -->
            <div class="toast_close-btn" @click="closeToast"></div>
        </div>
    </div>
    <!-- <div class="tab_wrapper">

        <div class="tab" v-for="(tab, index) in tabs">
            <input type="radio" :id="`tab-title_item_${index}`" :value="tab.name" v-model="currentTitle"/>
                <label :for="`tab-title_item_${index}`" @click="emit_TitleName(tab.name)"><h2>
                    {{ tab.title }}
                </h2></label>
        </div>
    </div> -->
</template>

<script lang="ts" setup>

// // PROPS
const props = defineProps({
    id: {
        type: String,
        default: 'toast'
    },
    duration: {
        type: Number,
        default: 1000
    },
    title: {
        type: String,
        default: 'This is title'
    },
    content: {
        type: String,
        default: 'This is notification'
    }
})
// const currentTitle = ref(props?.default)

// // EMITS
// // = variables
// const emit = defineEmits(['name_changed'])
// // = emits
// const emit_TitleName = (name: string) => {
//     if(name) {

//         emit('name_changed', name)
//         // console.log(name)
//     }
// }

onMounted(() => {
    const toast = document.getElementById(`${props?.id}`)
    // if(toast) {

    //     const close_btn = toast.querySelector('toast_close-btn')
    //     close_btn?.addEventListener('click', () => {
    //         if(toast) {
    
    //             console.log('clicked')
    //         }
    //     })
    // }
    // console.log(toast)
    // setTimeout(() => {
    //     if(toast?.style.display === 'none') {

    //         // toast.style.display = 'block'
    //     } else if(toast?.style.display) {
    //         toast.style.display = 'none'
    //     }
    // }, props?.duration)
})

//
const closeToast = () => {
    const toast = document.getElementById(`${props?.id}`)
    if(toast) {
        toast.style.display = 'none';
    }
}

// WATCHERS
// = 

</script>
  
<style scoped>


.toast_container {
    z-index: 111; 
    position: fixed; 
    top: 0; 
    left: 50%;
    transform: translateX(-50%); 
    padding: 1rem;
}

.toast_wrapper {
    background-color: var(--color-global-text_second);
    color: #fff;
    position: relative;
}

.toast_close-btn {
    width: 24px;
    height: 24px;
    /* background-color: var(--color-global-text);  */
    top: 1.5rem;
    right: 1.5rem;
    position: fixed;
}
.toast_close-btn:after {
    content: '';
    position: absolute;
    top: 50%;
    width: 100%;
    height: 3px;
    transform: translateY(-50%) rotate(45deg);
    background-color: #fff;
}
.toast_close-btn:before {
    content: '';
    position: absolute;
    top: 50%;
    width: 100%;
    height: 3px;
    transform: translateY(-50%) rotate(-45deg);
    background-color: #fff;
}

@media screen and (max-width: 575px) {
}

@media screen and (max-width: 767px) {
    .toast_container  {
        width: 100%;
        left: 0;
        transform: unset;
    }

} 

@media scren and (min-width: 768px) {

}
</style>