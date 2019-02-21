<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex md12>
        <v-toolbar color="white">
          <v-toolbar-title>Feedback</v-toolbar-title>
        </v-toolbar>
      </v-flex>
      <v-flex md12>
        <v-card mmunicode v-for="feedback in feedbackList" :key="feedback">
          <v-flex pa-3>
            <blockquote>
              <span class="mmunicode" v-text="feedback.the_feedback"></span>
            </blockquote>

            <br>
            <v-flex text-md-right>
              <span class="mmunicode" v-text="feedback.user_name"></span>
              <span v-text="feedback.user_phone"></span>
              <span class="mmunicode" text-md-right v-text="feedback.user_address"></span>
            </v-flex>
          </v-flex>
          <v-divider></v-divider>
        </v-card>
      </v-flex>
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
