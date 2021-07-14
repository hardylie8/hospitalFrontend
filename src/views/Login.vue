<template>
  <div class="content mx-auto my-3 col-sm-12 col-md-6 col-lg-4">
    <div class="card p-3 mt-3 container">
      <center>
        <img
          id="profile-img"
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          class="rounded-circle"
          style="height:80px;width:80px"
        />
      </center>
      <br />
      <form name="form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label class="form-label" for="username">Username</label>
          <input
            v-model="user.username"
            v-validate="'required'"
            type="text"
            placeholder="Please enter Username"
            class="form-control mb-1 inputField"
            name="username"
          />
          <small
            v-if="errors.has('username')"
            class="form-text text-muted"
            role="alert"
          >
            Username is required!
          </small>
        </div>
        <div class="form-group">
          <label class="form-label" for="password">Password</label>
          <input
            v-model="user.password"
            v-validate="'required'"
            type="password"
            class="form-control  inputField"
            name="password"
            placeholder="Please enter password"
          />
          <small
            v-if="errors.has('password')"
            class="form-text text-muted"
            role="alert"
          >
            Password is required!
          </small>
        </div>
        <br />
        <div class="row">
          <div class="col-6">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label class="form-check-label" for="flexCheckDefault">
              Remember me
            </label>
          </div>
          <div class="col-6 text-end">
            <a href="#" style="font-size:15px"> Forgot Password ?</a>
          </div>
        </div>
        <br />
        <div class="form-group">
          <button
            class="form-control p-0 inputField btn btn-primary "
            :disabled="loading"
          >
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Login</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import User from '../models/user';

export default {
  name: 'Login',
  data() {
    return {
      user: new User('', ''),
      loading: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.user.username && this.user.password) {
          this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.$router.push('/profile');
            },
            error => {
              this.loading = false;
              this.message =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
            }
          );
        }
      });
    }
  }
};
</script>
<style scoped>
.inputField {
  height: 40px;
}
</style>
