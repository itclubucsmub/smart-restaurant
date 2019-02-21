<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-toolbar color="white">
        <v-toolbar-title>Feedback</v-toolbar-title>
      </v-toolbar>
      <v-card>
        <v-flex md12 pa-3>
          <v-layout row v-for="feedback in feedbackList" :key="feedback" mt-4 mb-2>
            <v-flex>
              <span class="mmunicode" v-text="feedback.the_feedback"></span>
            </v-flex>
            <v-flex>
              <span class="mmunicode" v-text="feedback.user_address"></span>
            </v-flex>
            <v-flex>
              <span class="mmunicode" v-text="feedback.user_name"></span>
            </v-flex>
            <v-flex>
              <span v-text="feedback.user_phone"></span>
            </v-flex>
            <v-flex>
              <span>{{ feedback.date}}</span>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-card>
    </v-layout>
  </v-container>
</template>
<script>
import firestore from "../firebase/firestore.js";

const feedbackRef = firestore.collection("feedback_collection");
export default {
  firestore() {
    return {
      feedbackList: feedbackRef
    };
  },
  data() {
    return {
      headers: [
        {
          text: "Order Id",
          sortable: true,
          value: "order_id"
        },
        { text: "Item Id", value: "item_id" },
        { text: "Qty", value: "item_count" }
      ],
      order: {
        order_id: "",
        item_id: "",
        item_count: ""
      }
    };
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style scoped>
@import url(//fonts.googleapis.com/earlyaccess/notosansmyanmar.css);
.mmunicode {
  font-family: "Noto Sans Myanmar", sans-serif;
}
</style>
