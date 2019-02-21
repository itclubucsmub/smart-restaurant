<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex md12>
        <v-toolbar>
          <v-toolbar-title>Order List</v-toolbar-title>
        </v-toolbar>
        <v-card v-for="order in orderList" :key="order['.key']" class="hoverpointer">
          <v-flex md12 pa-4 mmunicode @click="detail(order)">
            <v-layout row wrap>
              <v-flex md2>
                <span class="spanblock">{{order.user.name}}</span>
              </v-flex>
              <v-flex md2 text-md-left>
                <span class="spanblock">{{order.user.phone}}</span>
              </v-flex>
              <v-flex md8>
                <span class="spanblock">{{order.user.address}}</span>
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

const orderRef = firestore.collection("order").where("status", "==", "pending");
export default {
  firestore() {
    return {
      orderList: orderRef
    };
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    detail(item) {
      router.push({ name: "OrderDetail", params: { id: item[".key"] } });
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

.spanblock {
  display: inline-block;
  margin: 0 20px 0 5px;
}
</style>
