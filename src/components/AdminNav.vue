<template>
  <aside class="menu">
    <p class="menu-label">
      General
    </p>
    <ul class="menu-list">
      <li v-if="highlight === 'first'"><a  href="/dashboard" class="is-active">Dashboard</a></li>
      <li v-else><a  href="/dashboard">Dashboard</a></li>

      <li v-if="highlight === 'second'"><a class="is-active" href="/rules">Regeln</a></li>
      <li v-else><a href="/rules">Regeln</a></li>
    </ul>
    <!--    <p class="menu-label">-->
    <!--      Kennzahlen-->
    <!--    </p>-->
    <!--    <ul class="menu-list">-->
    <!--      <li><a>Verkäufe</a></li>-->
    <!--      <li><a>Produkte</a></li>-->
    <!--    </ul>-->
    <p class="menu-label">
      Administration
    </p>
    <ul class="menu-list">
      <li><a>Angebotsgeneration starten</a></li>
      <li><a>Personenbezogene Berechnung starten</a></li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: "AdminNav",
  props: {
    highlight: String
  }
}
</script>

