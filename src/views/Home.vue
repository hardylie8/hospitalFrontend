<template>
  <div class="jumbotron jumbotron-fluid mt-3">
    <h1 class="display-4">
      Hello,
    </h1>
    <p class="lead">
      Make an appointment Now with our profesional doctor
    </p>
    <hr class="my-4" />
    <router-link to="/user" class="nav-link">
      <a class="btn btn-outline-primary btn" href="#" role="button"
        >Learn more</a
      >
    </router-link>
  </div>
</template>

<script>
import UserService from '../services/user.service';

export default {
  name: 'Home',
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    UserService.getPublicContent().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>
