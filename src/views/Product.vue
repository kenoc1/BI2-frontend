<template>
    <div class="page-product">
        <div class="columns is-multiline">
            <div class="column is-7">
                <figure class="image mb-6">
                    <img v-bind:src="product.get_image">
                </figure>
            </div>

            <div class="column is-5">

                <h1 class="title">{{ product.name }}</h1>

                <p v-if="product.evaluation!=null"><strong>Evaluation:  </strong>{{ product.evaluation }}</p>
                <p v-else><strong>Evaluation: </strong>Nothing to show </p>

                <p><strong>Price: </strong>{{ product.get_price }}€</p>
                <p v-if="product.discount!=0 && product.discount!=null"><strong>Discount: {{product.discount}}</strong></p>

                <div class="field has-addons mt-6">
                    <div class="control">
                        <input type="number" class="input" min="1" v-model="quantity">
                    </div>

                    <div class="control">
                        <a class="button is-dark" @click="addToCart()">Add</a>
                    </div>
                </div>

                <h2 class="subtitle"><strong>Details:</strong></h2>
                <p v-if="product.description!=null">{{ product.description }}</p>

                <p style="padding-top:20px;"><strong>SKU: </strong>{{ product.sku }}</p>

                <p v-if="product.recycle=1"><strong>recycle: </strong>yes</p>
                <p v-if="product.recycle=0"><strong>recycle: </strong>no</p>

                <p  v-if="product.lowfat=1"><strong>low-fat: </strong>yes</p>
                <p  v-if="product.lowfat=0"><strong>low-fat: </strong>no</p>

            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import { toast } from 'bulma-toast'

    export default {
        name: 'Product',
        data() {
            return {
                product: {},
                quantity: 1
            }
        },
        mounted() {
            this.getProduct()
        },
        methods: {
            async getProduct() {
                this.$store.commit('setIsLoading', true)

                const category_slug = this.$route.params.category_slug
                const product_slug = this.$route.params.product_slug

                await axios
                    .get(`/api/v1/${category_slug}/${product_slug}`)
                    //.get('/api/v1/one/')
                    .then(response => {

                        this.product = response.data;


                        document.title = this.product.name + ' | IBSUPERMARKT'
                    })
                    .catch(error => {
                        console.log(error)
                    })

                this.$store.commit('setIsLoading', false)
            },
            addToCart() {
                if (isNaN(this.quantity) || this.quantity < 1) {
                    this.quantity = 1
                }

                const item = {
                    product: this.product,
                    quantity: this.quantity
                }

                this.$store.commit('addToCart', item)

                toast({
                    message: 'The product was added to the cart',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                    duration: 2000,
                    position: 'bottom-right',
                })
            }
        }
    }
</script>

<style lang="scss">

    .seperator h5 {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 1em;
    }

    .seperator h5::before,
    .seperator h5::after {
        content: "";
        display: block;
        flex-grow: 1;
        height: 1px;
        background: #ccc;
    }

    .seperator h5 span {
        padding: 0 2em;
    }
</style>