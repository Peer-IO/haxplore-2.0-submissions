<template>
  <nav>
    <v-navigation-drawer v-if="isSignIn" v-model="navbar" light fixed app>
      <!-- user details section -->
      <v-list three-line>
        <v-list-item>
          <v-list-item-avatar>
            <v-img v-if="imgsrc !== 'null'" :src="imgsrc" />
            <v-icon v-else dark size="40" color="black">
              mdi-account-circle
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ user.first_name }}
            </v-list-item-title>
            <v-list-item-subtitle class="black--text">
              <div class="grey--text text--darken-3 tw-truncate">
                {{ user.email }}
              </div>
              <div class="tw-font-semibold">
                {{ user.institution }}
              </div>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- links -->
      <v-list>
        <v-list-item
          v-for="item in links"
          :key="item.title"
          :to="item.route"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-spacer />
    </v-navigation-drawer>
    <v-app-bar light elevate-on-scroll app>
      <v-app-bar-nav-icon
        v-if="isSignIn"
        x-large
        class="black--text text--darken-5"
        @click="navbar = !navbar"
      />
      <v-toolbar-title class="tw-font-bold tw-text-lg flex tw-items-center">
        <nuxt-link to="/">
          <figcaption class="tw-text-gray-700">Peer IO</figcaption>
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <v-btn class="ml-auto" depressed href="https://github.com/king-11/P2P">
        <v-icon large> mdi-github </v-icon>
      </v-btn>
      <v-btn
        v-if="isSignIn"
        outlined
        class="black white--text"
        @click="SignOut"
      >
        Sign Out
      </v-btn>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      navbar: false,
      imgsrc: null,
      links: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/courses' },
        { title: 'Profile', icon: 'mdi-account', route: '/profile' },
        { title: 'Assignments', icon: 'mdi-equal-box', route: '/assignments' },
      ],
    }
  },
  computed: {
    isSignIn() {
      return this.$store.state.auth.loggedIn
    },
    user() {
      if (this.$store.state.auth.loggedIn) {
        return this.$auth.user.data
      } else {
        return null
      }
    },
  },
  mounted() {
    this.imgsrc = localStorage.getItem('photoUrl')
  },
  methods: {
    async SignOut() {
      if (!this.$auth.loggedIn) return
      this.$auth.setToken('local', '')
      this.$auth.setRefreshToken('local', '')
      await Promise.all([
        this.$auth.logout(),
        this.$store.dispatch('authStore/logout'),
      ])
    },
  },
}
</script>

<style lang="scss" scoped></style>
