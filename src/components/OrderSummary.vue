<template>
  <div class="box mb-4">
    <h3 class="is-size-4 mb-6">Order #{{ order['order_id'] }}</h3>

    <h4 class="is-size-5">Products</h4>

    <table class="table is-fullwidth">
      <thead>
      <tr>
        <th>Product</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Total</th>
      </tr>
      </thead>

      <tbody>
      <tr
          v-for="item in order['products']"
          v-bind:key="item['product_id']"
      >
        <td>{{ item['name'] }}</td>
        <td>€{{ item['price'].toFixed(2) }}</td>
        <td>{{ item['quantity'] }}</td>
        <td>€{{ getItemTotal(item).toFixed(2) }}</td>
      </tr>
      </tbody>
      <tfoot>
      <tr>
        <td colspan="2">Total</td>
        <td>{{ getTotalQuantity() }}</td>
        <td>€{{ getTotalPrice().toFixed(2) }}</td>
      </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  name: 'OrderSummary',
  props: {
    order: Object
  },
  methods: {
    getItemTotal(item) {
      return item['price'] * item['quantity']
    },
    orderTotalLength(order) {
      return order['products'].reduce((acc, curVal) => {
        return acc += curVal['quantity']
      }, 0)
    },
    getTotalPrice() {
      let price = 0;
      for (let index in this.order.products) {
        price = price + this.order.products[index].price
      }
      return price;
    },
    getTotalQuantity() {
      let price = 0;
      for (let index in this.order.products) {
        price = price + this.order.products[index].quantity
      }
      return price;
    }
  }
}
</script>
