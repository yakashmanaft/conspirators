
<template>
    <div class="popup_container" style="" :id="props?.id">

        <div class="popup_wrapper" style="">
            <!-- header -->
            <div class='popup_header'>
                <h4>{{ props?.popup_title }}</h4>
            </div>    
            <!-- content -->
             <div class="popup_content" style="padding-top: 4rem; height: 100%; overflow-y: scroll;">

                 <slot></slot>
             </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

// props
const props = defineProps({
    popup_title: String,
    popup_opened: Boolean,
    id: String
})

// emits
const emit = defineEmits(['emitClosePopup'])


//
window.addEventListener('click', (e) => {
    if(e.target.id && e.target.id === props?.id) {
        emit('emitClosePopup')
    }
})

</script>

<style scoped>
.popup_container {
    z-index: 100; 
    height: 100vh; 
    width: 100%; 
    background-color: var(--color-bg-popup); 
    backdrop-filter: blur(2px); 
    position: fixed; 
    top: 0; 
    left: 0; 
    display: flex; 
    align-items: center; 
    justify-content: center;    
}
.popup_wrapper {
    background-color: var(--color-btn-text); 
    height: 60vh; 
    width: 50%; 
    position: relative; 
    border-radius: 1rem; 
    padding: .5rem 1rem;
}
.popup_header {
    position: absolute; 
    top: 0; 
    left: 0; 
    padding: 1rem; 
    background-color: var(--color-btn-text); 
    width: 100%; 
    border-radius: 1rem 1rem 0 0;
}
.popup_content::-webkit-scrollbar { 
    width: 0; 
};
.popup_content { 
    -ms-overflow-style: none; 
}

@media screen and (max-width: 575px) {

} 

@media screen and (max-width: 767px) {
    .popup_wrapper {
        width: 90%;
    }
}

@media screen and (min-width: 768px) and (max-width: 991px) {
    .popup_wrapper {
        width: 70%;
    }
}

@media screen and (min-width: 992px) {
    .popup_wrapper {
        width: 60%;
    }
}

@media screen and (min-width: 1200px) {
    .popup_wrapper {
        width: 50%;
    }
}
</style>