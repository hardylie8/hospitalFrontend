<template>
  <div id="app">
    <!-- <nav class="navbar navbar-expand navbar-dark bg-dark ">
      <div class="container">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapse_Navbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <a class="navbar-brand" @click.prevent> Healventure</a>

        <div class="collapse navbar-collapse" id="collapse_Navbar">
          <div class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link to="/home" class="nav-link">
                <font-awesome-icon icon="home" />Home
              </router-link>
            </li>
            <li v-if="showAdminBoard" class="nav-item">
              <router-link to="/admin" class="nav-link"
                >Admin Board</router-link
              >
            </li>
            <li v-if="showModeratorBoard" class="nav-item">
              <router-link to="/mod" class="nav-link"
                >Moderator Board</router-link
              >
            </li>
            <li class="nav-item">
              <router-link v-if="currentUser" to="/user" class="nav-link"
                >User</router-link
              >
            </li>
          </div>

          <div v-if="!currentUser" class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/register" class="nav-link">
                <font-awesome-icon icon="user-plus" />Sign Up
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link">
                <font-awesome-icon icon="sign-in-alt" />Login
              </router-link>
            </li>
          </div>

          <div v-if="currentUser" class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/profile" class="nav-link">
                <font-awesome-icon icon="user" />
                {{ currentUser.username }}
              </router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href @click.prevent="logOut">
                <font-awesome-icon icon="sign-out-alt" />LogOut
              </a>
            </li>
          </div>
        </div>
      </div>
    </nav> -->
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" @click.prevent> Healventure</a>

        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapse_Navbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse " id="collapse_Navbar">
          <ul class="nav navbar-nav me-auto ">
            <li class="nav-item">
              <router-link to="/home" class="nav-link">
                <font-awesome-icon icon="home" />Home
              </router-link>
            </li>
            <li v-if="showAdminBoard" class="nav-item">
              <router-link to="/admin" class="nav-link"
                >Admin Board</router-link
              >
            </li>
            <li v-if="showModeratorBoard" class="nav-item">
              <router-link to="/mod" class="nav-link"
                >Moderator Board</router-link
              >
            </li>
            <li class="nav-item">
              <router-link v-if="currentUser" to="/user" class="nav-link"
                >User</router-link
              >
            </li>
          </ul>
          <div v-if="!currentUser" class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link to="/register" class="nav-link">
                <font-awesome-icon icon="user-plus" />Sign Up
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link">
                <font-awesome-icon icon="sign-in-alt" />Login
              </router-link>
            </li>
          </div>
          <ul v-if="currentUser" class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link to="/profile" class="nav-link">
                <font-awesome-icon icon="user" />
                {{ currentUser.username }}
              </router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href @click.prevent="logOut">
                <font-awesome-icon icon="sign-out-alt" />LogOut
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="h-100 container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>
<style>
html,
body {
  height: 100vh;
}
/* #app {
  background-color: #3aafa9;
  color: #feffff;
  min-height: 100vh;
}
li a,
nav a {
  color: #feffff;
} */
</style>
