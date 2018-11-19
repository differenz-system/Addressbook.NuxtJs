<template>
  <div class="row">
    <table class="table table-bordered">
      <thead>
        <th>#</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Mobile No</th>
        <th>Email Address</th>
        <th>Action</th>
      </thead>
      <tbody>
        <tr
          v-for="(contact,index) in contactsdetails"
          :key="contact.id" >

          <td >{{ index + 1 }}</td>

          <td v-if="!contact.isEdit">{{ contact.firstName }}</td>
          <td v-else><input
            v-validate="'required|min:3'"
            v-model="contact.firstName"
            :class="{ 'border-danger': errors.has('firstName'+index) }"
            :name="'firstName'+index"
            data-vv-as="First Name"
            type="text"
            class="form-control">
            <small class="form-text text-danger">{{ errors.first('firstName'+index) }}</small>
          </td>

          <td v-if="!contact.isEdit">{{ contact.lastName }}</td>
          <td v-else><input
            v-validate="'required|min:3'"
            v-model="contact.lastName"
            :class="{ 'border-danger': errors.has('lastName'+index) }"
            :name="'lastName'+index"
            data-vv-as="Last Name"
            type="text"
            class="form-control">
            <small class="form-text text-danger">{{ errors.first('lastName'+index) }}</small>
          </td>



          <td v-if="!contact.isEdit">{{ contact.mobileNo }}</td>
          <td v-else><input
            v-validate="'required|digits:10'"
            v-model="contact.mobileNo"
            :class="{ 'border-danger': errors.has('mobileNo'+index) }"
            :name="'mobileNo'+index"
            data-vv-as="Mobile No"
            type="text"
            class="form-control">
            <small class="form-text text-danger">{{ errors.first('mobileNo'+index) }}</small>
          </td>

          <td v-if="!contact.isEdit">{{ contact.emailAddress }}</td>
          <td v-else><input
            v-validate="'required|email'"
            v-model="contact.emailAddress"
            :class="{ 'border-danger': errors.has('emailAddress'+index) }"
            :name="'emailAddress'+index"
            data-vv-as="Email Address"
            type="text"
            class="form-control">
            <small class="form-text text-danger">{{ errors.first('emailAddress'+index) }}</small>
          </td>

          <td v-if="!contact.isEdit" ><button
            class="btn btn-primary"
            @click="editContacts(index)">Edit</button> <button
              class="btn btn-danger"
              @click="deleteContacts(index)">Delete</button></td>
          <td v-else><button
            class="btn btn-primary"
            @click="updateContacts(index,contact)">Update</button> <button
              class="btn btn-danger"
              @click="cancelUpdateContacts(index)">cancel</button></td>
        </tr>

        <tr v-if="contactsdetails && contactsdetails.length==0">
          <td
            colspan="6"
            class="text-center">No Contacts Found</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      return: {
        selectedObject: {}
      }
    }
  },
  computed: {
    contactsdetails: function() {
      console.log(this.$store.state.addressBooks)
      return this.$store.state.addressBooks
    }
  },
  methods: {
    deleteContacts: function(index) {
      let x = confirm('Are You sure went to delete this contact?')
      if (x) this.$store.commit('DELETE_CONTACT', index)
    },
    editContacts: function(index) {
      this.selectedObject = Object.assign(
        {},
        this.$store.state.addressBooks[index]
      )
      this.$store.state.addressBooks.forEach((element, ind) => {
        if (ind == index) element.isEdit = true
        else element.isEdit = false
      })
      // this.$store.state.addressBooks[index].isEdit = true
      console.log(this.selectedObject)
    },
    updateContacts: function(index, data) {
      console.log(index)
      this.$validator.validateAll().then(result => {
        console.log(result)
        if (result) {
          data.isEdit = false
          let obj = {
            index: index,
            data: data
          }
          this.$store.commit('UPDATE_CONTACT', obj)
          console.log(result)
        }
      })
    },
    cancelUpdateContacts: function(index) {
      console.log(index, this.selectedObject)
      let obj = {
        index: index,
        data: this.selectedObject
      }
      this.$store.commit('UPDATE_CONTACT', obj)
    }
  }
}
</script>

<style>
</style>
