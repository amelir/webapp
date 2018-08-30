<template>
  <div id="app">
    <navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from 'components/Navbar';

export default {
  components: {
    Navbar
  }
}
</script>


<style lang="scss">
  body{
    margin: 0;
    padding: 0;
    height: 100vh;
  }
</style>
