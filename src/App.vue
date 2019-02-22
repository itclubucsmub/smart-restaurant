<template>
  <v-app>
    <v-navigation-drawer :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" fixed app>
      <v-list class="pt-1" dense>
        <v-list-tile v-for="item in items" :key="item.title" :to="item.to">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed color="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>
    <v-toolbar fixed app :clipped-left="clipped" dark color="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      //
      clipped: true,
      drawer: true,
      fixed: false,
      items: [
        { icon: "bubble_chart", title: "Order", to: "/" },

        { icon: "bubble_chart", title: "Table Order", to: "/tableOrder" },
        { icon: "feedback", title: "Feedback", to: "/feedback" },
        { icon: "apps", title: "Inventory", to: "/inventory" },
        { icon: "library_books", title: "Category", to: "/category" }

      ],
      miniVariant: false,
      right: false,
      rightDrawer: false,
      title: "Smart Restaurant"
    };
  }
};
</script>
