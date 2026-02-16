<template>
  <div class="relative w-[245px] h-[180px] overflow-hidden animate-[turn_2s_linear_forwards_1s] rotate-x-180">
    <div class="absolute w-0 h-0 border-l-[105px] border-l-transparent border-r-[105px] border-r-transparent border-b-[180px] border-b-[#41b883]" />
    <div
      class="absolute top-[30px] left-[35px] w-0 h-0 border-l-[87.5px] border-l-transparent border-r-[87.5px] border-r-transparent border-b-[150px] border-b-[#3b8070] animate-[goright_0.5s_linear_forwards_3.5s]"
    />
    <div
      class="absolute top-[60px] left-[35px] w-0 h-0 border-l-[70px] border-l-transparent border-r-[70px] border-r-transparent border-b-[120px] border-b-[#35495e] animate-[goright_0.5s_linear_forwards_3.5s]"
    />
    <div
      class="absolute top-[120px] left-[70px] w-0 h-0 border-l-[35px] border-l-transparent border-r-[35px] border-r-transparent border-b-[60px] border-b-white animate-[godown_0.5s_linear_forwards_3s]"
    />
  </div>
</template>

<style scoped>
@keyframes turn {
  100% {
    transform: rotateX(0deg);
  }
}

@keyframes godown {
  100% {
    top: 180px;
  }
}

@keyframes goright {
  100% {
    left: 70px;
  }
}
</style>
