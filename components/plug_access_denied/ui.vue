<template>
    <div class="plug_wrapper">

        <article style="display: flex; align-items: center; gap: 3rem;">
            <!-- IMG -->
            <!-- <NuxtImg src="/img/feature_16993811.webp"/> -->
            <img width="256" height="256" alt="Страница на доработке..." src="@/assets/img/information_7887083.webp"/>

            <!-- DESCRIPTION -->
            <aside>
                <!-- PATH -->
                <p>Вы пытаетесь попасть в: {{ route.path }}</p>
                <!-- TITLE -->
                <h3><span style="display: block;">У вас нет доступа</span> но вы рветесь :)</h3>

                <!-- LINKS -->
                <Button type="pseudo-btn" link="/">На главную</Button>

            </aside>
        </article>
    </div>
</template>

<script lang="ts" setup>

// compponents
import { Button } from '@/components/button'

const route = useRoute()
const router = useRouter()
// PROPS
const props = defineProps({
    // tabs: Array,
    // default: String
})

// EMITS
// = variables
// const emit = defineEmits(['name_changed'])
// = emits
// const emit_TitleName = (name: string) => {
//     if(name) {

//         emit('name_changed', name)
//     }
// }

// WATCHERS
// = titles
</script>
  
<style scoped>
.plug_wrapper {
    position: fixed;
    z-index: 98;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center; 
    background-color: var(--color-btn-text)
}
@media screen and (max-width: 575px) {

}

@media screen and (max-width: 767px) {
    article {
        flex-direction: column;
    }
}
</style>