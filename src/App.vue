<template>
  <div id="app">
    <sidebar/>
    <div class="main">
      <navbar/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import { Navbar } from 'components';
import { Sidebar } from 'components';

export default {
  components: {
    Navbar,
    Sidebar
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
