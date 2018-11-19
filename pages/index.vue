<template>
  <section class="container-login">
    <div>
      <logo/>
      <h1 class="title">
        Address Book
      </h1>
      <!-- <form method="post"> -->
      <div
        v-if="$store.state.auth.error"
        class="alert alert-danger"
        role="alert">
        invalid username or Password
      </div>
      <div class="form-group">
        <input
          v-validate="'required|email'"
          :class="{ 'border-danger': errors.has('emailAddress') }"
          v-model="username"
          data-vv-as="Email Address"
          type="email"
          class="form-control"
          name="emailAddress"
          placeholder="Enter email">
        <small class="form-text text-danger">{{ errors.first('emailAddress') }}</small>
      </div>
      <div class="form-group">
        <input
          v-validate="'required|min:6'"
          :class="{ 'border-danger': errors.has('password') }"
          v-model="password"
          type="password"
          class="form-control"
          name="password"
          placeholder="Enter Password">
        <small class="form-text text-danger">{{ errors.first('password') }}</small>
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        @click="checkLogin">Submit</button>
        <!-- </form> -->
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  mounted() {
    if (localStorage.getItem('isLogin')) {
      this.$router.push({ path: '/addressbook' })
    }
  },
  methods: {
    checkLogin() {
      this.$validator.validateAll().then(result => {
        console.log(result)
        if (result) {
          if (this.username == 'admin@admin.com' && this.password == '123456') {
            localStorage.setItem('isLogin', true)
            this.$store.commit('UPDATE_AUTH', true)
            this.$router.push({ path: '/addressbook' })
          } else {
            this.$store.commit(
              'UPDATE_AUTH_ERROR',
              'Invalid Username or Password'
            )
          }
        }
      })
    }
  }
}
</script>

<style>
.container-login {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
