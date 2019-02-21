<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex md12>
        <v-toolbar>
          <v-btn flat medium round color="primary" @click="backtoOrder">
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <v-toolbar-title>Order History</v-toolbar-title>
        </v-toolbar>
        <v-card v-for="order in confirmedOrder" :key="order['.key']">
          <v-flex md12 pa-4 mmunicode @click="detail(order)">
            <v-layout row wrap>
              <v-flex md2 mt-3>
                <span>{{order.user.name}}</span>
              </v-flex>
              <v-flex md2 text-md-left mt-3>
                <span>{{order.user.phone}}</span>
              </v-flex>
              <v-flex md4 mt-3>
                <span>{{order.user.address}}</span>
              </v-flex>
              <v-flex md2 mt-3>
                <span class="green--text">{{order.status}}</span>
              </v-flex>
              <v-flex md2>
                <v-btn outline round color="primary" @click="restore(order['.key'])">Restore</v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-divider></v-divider>
        </v-card>

        <v-card v-for="order in canceledOrder" :key="order['.key']">
          <v-flex md12 pa-4 mmunicode @click="detail(order)">
            <v-layout row wrap>
              <v-flex md2 mt-3>
                <span>{{order.user.name}}</span>
              </v-flex>
              <v-flex md2 text-md-left mt-3>
                <span>{{order.user.phone}}</span>
              </v-flex>
              <v-flex md4 mt-3>
                <span>{{order.user.address}}</span>
              </v-flex>
              <v-flex md2 mt-3>
                <span class="red--text">{{order.status}}</span>
              </v-flex>
              <v-flex md2>
                <v-btn outline round color="primary" @click="restore(order['.key'])">Restore</v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-divider></v-divider>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import firestore from "../firebase/firestore.js";
import router from "../router";

const canceledOrder = firestore
  .collection("order")
  .where("status", "==", "canceled");
const confirmedOrder = firestore
  .collection("order")
  .where("status", "==", "confirmed");
export default {
  firestore() {
    return {
      canceledOrder: canceledOrder,
      confirmedOrder: confirmedOrder
    };
  },
  data() {
    return {};
  },
  created() {},
  mounted() {
    console.log(this.canceledOrder, this.confirmedOrder);
  },
  methods: {
    backtoOrder() {
      router.push({ name: "Order" });
    },
    restore(id) {
      firestore
        .collection("order")
        .doc(id)
        .update({
          status: "pending"
        });
    }
  }
};
</script>
<style scoped>
@import url(//fonts.googleapis.com/earlyaccess/notosansmyanmar.css);
.mmunicode {
  font-family: "Noto Sans Myanmar", sans-serif;
}
.hoverpointer {
  cursor: pointer;
}
.hoverpointer:hover {
  background: #e5e5e5;
}
</style>
