<template>
  <div class="content mx-auto my-3 col-sm-12 col-md-6 col-lg-4">
    <div class="card p-3 mt-3 container">
      <br />
      <form name="form" @submit.prevent="handleRegister">
        <div v-if="!successful">
          <div class="form-group">
            <label class="form-label" for="username">first name</label>
            <input
              v-model="user.firstName"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control inputField"
              name="firstName"
            />
            <small
              v-if="submitted && errors.has('firstName')"
              class="form-text text-muted"
            >
              {{ errors.first('firstName') }}
            </small>
          </div>
          <div class="form-group">
            <label class="form-label" for="username">last name</label>
            <input
              v-model="user.lastName"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control inputField"
              name="lastName"
            />
            <small
              v-if="submitted && errors.has('lastName')"
              class="form-text text-muted"
            >
              {{ errors.first('lastName') }}
            </small>
          </div>
          <div class="form-group">
            <label class="form-label" for="username">Username</label>
            <input
              v-model="user.username"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control inputField"
              name="username"
            />
            <small
              v-if="submitted && errors.has('username')"
              class="form-text text-muted"
            >
              {{ errors.first('username') }}
            </small>
          </div>
          <div class="form-group">
            <label class="form-label" for="username">age</label>
            <input
              v-model="user.age"
              v-validate="'required|min:3|max:20'"
              type="number"
              class="form-control inputField"
              name="age"
            />
            <small
              v-if="submitted && errors.has('age')"
              class="form-text text-muted"
            >
              {{ errors.first('age') }}
            </small>
          </div>
          <div class="form-group">
            <label class="form-label mt-2" for="email">Email</label>
            <input
              v-model="user.email"
              v-validate="'required|email|max:50'"
              type="email"
              class="form-control inputField"
              name="email"
            />
            <small
              v-if="submitted && errors.has('email')"
              class="form-text text-muted"
            >
              {{ errors.first('email') }}
            </small>
          </div>
          <div class="form-group">
            <label class="form-label mt-2" for="password">Password</label>
            <input
              v-model="user.password"
              v-validate="'required|min:6|max:40'"
              type="password"
              class="form-control inputField"
              name="password"
            />
            <small
              v-if="submitted && errors.has('password')"
              class="form-text text-muted"
            >
              {{ errors.first('password') }}
            </small>
          </div>
          <br />
          <div class="form-group">
            <button class="form-control p-0 inputField btn btn-primary ">
              Sign Up
            </button>
          </div>
        </div>
      </form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import User from '../models/user';

export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', ''),
      submitted: false,
      successful: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
            },
            error => {
              this.message =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
              this.successful = false;
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
