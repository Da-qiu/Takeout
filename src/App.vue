<template>
  <div id="app">
    <Header></Header>
    <Nav></Nav>
    <Content></Content>
  </div>
</template>
<script>
import Header from './components/header/header.vue'
import Nav from './components/nav/nav.vue'
import Content from './components/content/content.vue'

export default {
  components:{
    Header,
    Nav,
    Content
  }
}
</script>

<style lang="less">

</style>
