<template>
  <div class="container w-100">
    <header class="jumbotron my-2">
      <center>
        <h1>
          <strong>{{ currentUser.username }}</strong> Profile
        </h1>
      </center>
    </header>
    <div class="row mt-3">
      <div class="col-md-3"></div>
      <div class="col-sm-12 col-md-6">
        <p>
          <strong>first name :</strong>
          {{ currentUser.firstName }}
        </p>
        <p>
          <strong>last name :</strong>
          {{ currentUser.lastName }}
        </p>
        <p>
          <strong>age:</strong>
          {{ currentUser.age }}
        </p>
        <p>
          <strong>Username :</strong>
          {{ currentUser.username }}
        </p>
        <p>
          <strong>Email:</strong>
          {{ currentUser.email }}
        </p>
        <strong>Authorities:</strong>
        <ul>
          <li v-for="(role, index) in currentUser.roles" :key="index">
            {{ role }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>
