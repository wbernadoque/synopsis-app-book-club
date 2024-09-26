<template>
  <div class="h-52 w-52 flex justify-center">
    <img src="../../assets/tiny/s-logo.png" alt="" id="logo-s" />
  </div>
</template>

<script>
export default {
  name: "Anima",
  data() {
    return {};
  },
};
</script>

<style>
#logo-s {
  animation: go-back 0.5s infinite alternate;
  height: 50%;
}
@keyframes go-back {
  from {
    transform: translateY(50px);
    height: 40%;
    width: 40%;
  }
  to {
    transform: translateY(0px);
    height: 50%;
    width: 30%;
  }
}
</style>
