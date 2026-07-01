import { defineStore } from "pinia";

// type CartItem = {
//     id: number;
//     title: string;
//     // uuid: string;
//     // address: string;
//     // partnerType: string;
//     // partnerID: number;
//     // creator: number
//     // curatorType: string;
//     // curatorID: number;
//     // workType: string;
//     // completion: GLfloat;
//     // phone: string;
//     // created_at: string;
//     // update_at: string;
//     // sharers: JSON;
//     // bandID: number;
//     // stages: JSON;
// }

// export const useCartStore = defineStore('Cart', () => {
//     // Create state for holding projects
//     const cartItems = ref<CartItem[]>([])

//     // ** Function to add product/service to cart

//     //** Function to load projects data */
//     // const loadProjectsData = async () => {
//     //     try {
//     //         // Fetch data from the server
//     //         projects.value = await $fetch('/api/projects/projects')
//     //     } catch (error: any) {
//     //         alert({

//     //             toString: function () {
//     //                 return `Error: ${error.data.message}`
//     //             }
//     //         })
//     //     }
//     // }
//     const addToCart = (CartItem) => {

//     }

//     return {
//         cartItems,addToCart
//     }
// })

// if (import.meta.hot) {
//     import.meta.hot.accept(acceptHMRUpdate(useProjectsStore, import.meta.hot))
// }

export const useCart = defineStore('cart', {
    state: () => ({
        items: [] as {
            id: number; 
            title: string;
            qty: number;
            max_qty: number;
            measure: string,
            article: string;
            imgUrl: string;
            currency: string;
            price: number;
        }[]
    }),

    getters: {

    },

    actions: {

        init() {

        },

        addToCart(product: any) {
            const existing = this.items.find((i) => i.id === product.id)
            if (existing) {
                existing.qty += 1   
            } 
            else {
                this.items.push({ ...product, qty: 1, max_qty: product.qty })
            }
            this.save()
        },

        updateQuantity(id: number, delta: number) {
            const item = this.items.find((i) => i.id === id)
            if (!item) return
                item.qty += delta
                if (item.qty <= 0) {
                    // this.removeFromCart(id)
                } 
                else {
                    this.save()
                }
        },

        removeFromCart(id: number) {
            this.items = this.items.filter((i) => i.id !== id)
            this.save()
        },

        clearCart() {
            this.items = []
            this.save()
        },

        save() {

        }
    }
})