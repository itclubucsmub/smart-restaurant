<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Stock List</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">New Stock</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                {{editedItem}}
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.item_id" label="Id"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.item_name" label="Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.item_price" label="Price"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.item_image" label="Image"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.cateID" label="Category ID"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="stockList"
      :pagination.sync="pagination"
      :rows-per-page-items="rowsPerPageItems"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.item_id }}</td>
        <td>{{ props.item.item_name }}</td>
        <td>{{ props.item.item_price }}</td>
        <td>{{ props.item.item_image }}</td>
        <td>{{ props.item.cateID }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon small @click="deleteItem(props.item)">delete</v-icon>
        </td>
      </template>
      <template slot="no-data">
        <p align="center">{{ dataMsg }}</p>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import firestore from "../firebase/firestore.js";
//controllers
import crudsAdd from "./controllers/crudsAdd.js";
import crudsUpdate from "./controllers/crudsUpdate.js";
import crudsDelete from "./controllers/crudsDelete.js";

const collectionRef = firestore.collection("stocklist");

export default {
  data() {
    return {
      dialog: false,
      headers: [
        { text: "ID", value: "item_id", sortable: true },
        { text: "Name", value: "item_name", sortable: true },
        { text: "Price", value: "item_price", sortable: false },
        { text: "Image", value: "item_image", sortable: false },
        { text: "Category", value: "cateID", sortable: false },
        { text: "Actions", value: "name", align: "center", sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        item_id: "",
        item_name: "",
        item_price: "",
        item_image: "",
        cateID: ""
      },
      defaultItem: {
        item_id: "",
        item_name: "",
        item_price: "",
        item_image: "",
        cateID: ""
      },
      dataMsg: "No data found",
      rowsPerPageItems: [10, 30, 50],
      pagination: {
        rowsPerPage: 10
      }
    };
  },
  firestore() {
    return {
      stockList: collectionRef
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {},
  mounted() {
    // collectionRef.get().then(snapshot => {
    //   snapshot.forEach(doc => {
    //     var tempData = {};
    //     tempData = doc.data();
    //     tempData.key = doc.id;
    //     this.stockList.push(tempData);
    //   });
    // });
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.stockList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        crudsDelete(item);
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        var editTmp = {};
        var ekey = this.editedItem['.key'];
        editTmp.item_id = this.editedItem.item_id;
        editTmp.item_name = this.editedItem.item_name;
        editTmp.item_price = this.editedItem.item_price;
        editTmp.item_image = this.editedItem.item_image;
        editTmp.cateID = this.editedItem.cateID;
        crudsUpdate(ekey, editTmp);
        console.log(ekey, editTmp);
        //edit
      } else {
        //save
        // parms (id, data)
        crudsAdd({
          item_id: this.editedItem.item_id,
          item_name: this.editedItem.item_name,
          item_price: this.editedItem.item_price,
          item_image: this.editedItem.item_image,
          cateID: this.editedItem.cateID
        });
      }
      this.close();
    }
  }
};
</script>
<style>
</style>
