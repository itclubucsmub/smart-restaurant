<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Category List</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">New Category</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.id" label="Id"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.title" label="Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.icon" label="Icon"></v-text-field>
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
      :items="cateList"
      :pagination.sync="pagination"
      :rows-per-page-items="rowsPerPageItems"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.title }}</td>
        <td>{{ props.item.icon }}</td>
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

const collectionRef = firestore.collection("catelist");

export default {
  data() {
    return {
      dialog: false,
      headers: [
        { text: "ID", value: "id", sortable: true },
        { text: "Title", value: "title", sortable: true },
        { text: "Icon", value: "icon", sortable: false },
        { text: "Actions", value: "name", align: "center", sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        id: "",
        title: "",
        icon: ""
      },
      defaultItem: {
        id: "",
        title: "",
        icon: ""
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
      cateList: collectionRef
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
  mounted() {},

  methods: {
    editItem(item) {
      this.editedIndex = this.cateList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        crudsDelete(item, "catelist");
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
        var ekey = this.editedItem[".key"];
        editTmp.id = this.editedItem.id;
        editTmp.title = this.editedItem.title;
        editTmp.icon = this.editedItem.icon;
        crudsUpdate(ekey, editTmp, "catelist");
        //edit
      } else {
        //save
        // parms (id, data)
        crudsAdd(
          {
            id: this.editedItem.id,
            title: this.editedItem.title,
            icon: this.editedItem.icon
          },
          "catelist"
        );
      }
      this.close();
    }
  }
};
</script>
<style>
</style>
