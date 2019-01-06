<template>
  <div id="app">
    <Navbar />
    <sui-container text-align="center">
      <router-view/>
    </sui-container>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
  },
};
</script>
