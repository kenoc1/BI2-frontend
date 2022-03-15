<template>
  <div class="page-log-in">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h1 class="title">Webshop Anmeldung</h1>
        <p>Dies ist ein Studentenprojekt der IBS IT & Business School Oldenburg und ist nicht für die Öffentlichkeit bestimmt. </p>
        <hr>
        <form @submit="validateBeforeSubmit">


          <div class="field">
            <label>Password</label>
            <div class="control">
              <input type="password" class="input" v-model="password">
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-dark">Log in</button>
            </div>
          </div>




        </form>
      </div>
    </div>
  </div>
</template>

<script>
import storageHelper from 'storage-helper'
import router from "@/router";

export default {
  name: 'AppLogIn',
  data() {
    return {
      username: '',
      password: '',
      errors: []
    }
  },
  methods: {

    validateBeforeSubmit() {
      const hashedPassword = this.hashFunction(this.password);
      if (hashedPassword === -1512564111) {
        storageHelper.setItem('user-password', hashedPassword)
        router.push('/')
      } else {
        window.alert("Das eingegebene Passwort ist falsch!")
      }
    },

    hashFunction(string) {
//set variable hash as 0
      var hash = 0;
// if the length of the string is 0, return 0
      if (string.length === 0) return hash;
      for (var i = 0; i < string.length; i++) {
        let ch = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + ch;
        hash = hash & hash;
      }
      return hash;
    }
  }
}

</script>