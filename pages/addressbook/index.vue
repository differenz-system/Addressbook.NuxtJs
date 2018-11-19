<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-8">
        <h1>Address Book </h1>
      </div>
      <div class="col-lg-4">
        <button
          class="btn btn-warning float-right"
          @click="logout"> Logout </button>
      </div>
    </div>
    <Add/>
    <!-- <div class="clearfix">&nbsp;</div> -->
    <List/>
  </div>
</template>

<script>
import Add from './add.vue'
import List from './list.vue'
export default {
  components: {
    Add,
    List
  },
  mounted() {
    if (!localStorage.getItem('isLogin')) {
      this.$router.push({ path: '/' })
    }
  },
  methods: {
    logout() {
      this.$store.commit('UPDATE_AUTH', false)
      localStorage.clear()
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style>
</style>
