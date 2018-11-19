<template>
  <div class="row">
    <div class="col-sm-6 form-group">
      <label>First Name</label>
      <input
        v-validate="'required|min:3'"
        v-model="contacts.firstName"
        :class="{ 'border-danger': errors.has('firstName') }"
        data-vv-as="First Name"
        type="text"
        class="form-control"
        name="firstName"
        placeholder="Enter First Name">
      <small class="form-text text-danger">{{ errors.first('firstName') }}</small>
    </div>
    <div class="col-sm-6 form-group">
      <label>Last Name</label>
      <input
        v-validate="'required|min:3'"
        v-model="contacts.lastName"
        :class="{ 'border-danger': errors.has('lastName') }"
        data-vv-as="Last Name"
        type="text"
        class="form-control"
        name="lastName"
        placeholder="Enter Last Name">
      <small class="form-text text-danger">{{ errors.first('lastName') }}</small>
    </div>
    <div class="col-sm-6 form-group">
      <label>Mobile No</label>
      <input
        v-validate="'required|digits:10'"
        v-model="contacts.mobileNo"
        :class="{ 'border-danger': errors.has('mobileNo') }"
        data-vv-as="Mobile No"
        type="text"
        class="form-control"
        name="mobileNo"
        placeholder="Enter Mobile No">
      <small class="form-text text-danger">{{ errors.first('mobileNo') }}</small>
    </div>
    <div class="col-sm-6 form-group">
      <label>Email Address</label>
      <input
        v-validate="'required|email'"
        v-model="contacts.emailAddress"
        :class="{ 'border-danger': errors.has('emailAddress') }"
        data-vv-as="Email Address"
        type="text"
        class="form-control"
        name="emailAddress"
        placeholder="Enter Email Address">
      <small class="form-text text-danger">{{ errors.first('emailAddress') }}</small>
    </div>
    <div class="col-sm-12 form-group">
      <button
        class="btn btn-success"
        @click="saveContact">Save</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      contacts: {
        id: 0,
        firstName: '',
        lastName: '',
        mobileNo: '',
        emailAddress: '',
        isEdit: false
      }
    }
  },
  methods: {
    saveContact() {
      this.$validator.validateAll().then(result => {
        console.log(result)
        if (result) {
          this.contacts.id = this.count++
          this.$store.commit('ADD_CONTACT', this.contacts)
          this.resetObject()
          this.$validator.reset()
        }
      })
    },
    resetObject() {
      this.contacts = {
        id: 0,
        firstName: '',
        lastName: '',
        mobileNo: '',
        emailAddress: '',
        isEdit: false
      }
    }
  }
}
</script>

<style>
</style>
