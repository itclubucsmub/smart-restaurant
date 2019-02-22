<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex md2>
        <v-btn flat medium round color="primary" @click="backtoOrder">
          <v-icon>arrow_back</v-icon>
        </v-btn>
      </v-flex>
      <!-- <v-flex md2 text-md-right mt-2>
        <v-icon>person</v-icon>
        <span class="mmunicode">{{user.name}}</span>
      </v-flex>
      <v-flex md2 text-md-center mt-2>
        <v-icon>phone</v-icon>
        <span class="mmunicode">{{user.phone}}</span>
      </v-flex>
      <v-flex md4 text-md-left mt-2>
        <v-icon>location_on</v-icon>
        <span class="mmunicode">{{user.address}}</span>
      </v-flex>-->
      <v-flex md12>
        <v-divider></v-divider>
        <br>
        <h3>Order List</h3>
        <br>
        <v-card>
          <v-layout row wrap>
            <v-flex md6 pa-3>
              <v-flex v-for="stock in stockList" :key="stock.item_id">
                <v-layout row wrap>
                  <v-flex md4>
                    <img v-bind:src="stock.item_image" alt width="50">
                  </v-flex>
                  <v-flex md4 pt-4>
                    <span>{{stock.item_name}}</span>
                  </v-flex>
                  <v-flex md4 pt-4>
                    <span>{{stock.item_price}} Ks</span>
                  </v-flex>
                </v-layout>
                <v-divider></v-divider>
              </v-flex>
            </v-flex>

            <v-flex md6 pa-3>
              <v-flex v-for="order in orderList" :key="order.id">
                <v-layout row wrap>
                  <v-flex md4 pt-4 pb-3>
                    <span>x {{order.itemCount}} =</span>
                  </v-flex>
                  <v-flex md4 pt-4 pb-3>
                    <span class>{{order.chargePrice}} MMKs</span>
                  </v-flex>
                </v-layout>
                <!-- <v-divider></v-divider> -->
              </v-flex>
              <v-flex mt-4>
                <v-layout row wrap>
                  <v-flex md4>Total:</v-flex>
                  <v-flex md6 text-md-left>{{pri}} MMKs</v-flex>
                </v-layout>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firestore from "../firebase/firestore.js";
import router from "../router";
export default {
  data() {
    return {
      key: "",
      orders: [],
      table: 0,
      stockList: [],
      orderList: [],
      pri: 0
    };
  },
  mounted() {
    firestore
      .collection("tableOrder")
      .doc(this.$route.params.id)
      .get()
      .then(doc => {
        if (doc.exists) {
          var temp = {};
          this.key = doc.id;
          temp = doc.data();
          this.table = temp.tableID;
          this.orders = temp.orders;
        } else {
          alert("No such document!");
        }
        this.getStock();
      });
  },
  methods: {
    backtoOrder() {
      router.push({ name: "TableOrder" });
    },
    getStock() {
      this.pri = 0;

      this.stockList = [];
      for (let index = 0; index < this.orders.length; index++) {
        const element = this.orders[index];
        console.log(element.itemID);
        this.calcAmt(element.chargePrice);
        this.orderList.push(element);
        firestore
          .collection("stocklist")
          .where("item_id", "==", element.itemID)
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              this.stockList.push(doc.data());
            });
          });
      }
    },
    calcAmt(price) {
      this.pri += price;
    }
  }
};
</script>

<style>
@import url(//fonts.googleapis.com/earlyaccess/notosansmyanmar.css);
.mmunicode {
  font-family: "Noto Sans Myanmar", sans-serif;
}
</style>
