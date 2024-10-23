
<template>
    <div style="z-index: 100; height: 100vh; width: 100%; background-color: var(--color-bg-popup); backdrop-filter: blur(2px); position: fixed; top: 0; left: 0; display: flex; align-items: center; justify-content: center;" id="popup_container_id">

        <div class="popup_wrapper" style="background-color: var(--color-btn-text); height: 60vh; width: 50%; position: relative;">
            <!-- header -->
            <div style="position: absolute; top: 0;padding: 1rem 0; background-color: var(--color-btn-hover-bg); width: 100%;">
                <h4 style="">{{ props?.popup_title }}</h4>
            </div>
            <br>
            <br>
            <br>        
            <!-- content -->
             <div class="popup_content" style="height: 85%; overflow-y: scroll;">

                 <slot></slot>
             </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

// props
const props = defineProps({
    popup_title: String,
    popup_opened: Boolean
})

// emits
const emit = defineEmits(['emitClosePopup'])


//
window.addEventListener('click', (e) => {
    if(e.target.id && e.target.id === 'popup_container_id') {
        emit('emitClosePopup')
    }
})

</script>

<style scoped>
.popup_content::-webkit-scrollbar { 
    width: 0; 
};
.popup_content { 
    -ms-overflow-style: none; 
}
</style>