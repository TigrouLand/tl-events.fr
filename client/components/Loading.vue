<template>
  <div v-if="loading || error" class="loading-page">
    <div class="fixed w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-70 flex flex-col items-center justify-center">
      <div v-if="error">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="far"
          data-icon="signal-slash"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
          class="svg-inline--fa mb-3 fa-4x text-red-500"
        >
          <path fill="currentColor" d="M633.99 471.02L36 3.51C29.1-2.01 19.03-.9 13.51 6l-10 12.49C-2.02 25.39-.9 35.46 6 40.98l598 467.51c6.9 5.52 16.96 4.4 22.49-2.49l10-12.49c5.52-6.9 4.41-16.97-2.5-22.49zM80 384H48c-8.84 0-16 7.16-16 16v96c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16v-96c0-8.84-7.16-16-16-16zm400-272c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v127.66l64 50.04V112zm128-96c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v323.73l64 50.04V16zM416 496c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16v-23.52l-64-50.04V496zm-128 0c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V372.41l-64-50.04V496zm-80-208h-32c-8.84 0-16 7.16-16 16v192c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V304c0-8.84-7.16-16-16-16z" />
        </svg>
      </div>
      <div v-else class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4" />
      <h2 class="text-center text-white text-xl font-semibold">
        {{ error ? 'Une erreur est survenue.' : 'Chargement...' }}
      </h2>
      <p class="w-2/3 text-center text-white">
        {{ error || 'Cela peut prendre quelques secondes, ne fermez pas cette page.' }}
      </p>
    </div>
  </div>
</template>
<script>

export default {
  name: 'LoadingPage',
  data: () => ({
    loading: false,
    error: false
  }),
  methods: {
    start() {
      this.error = false;
      this.loading = true;
    },
    finish() {
      this.loading = false;
    },
    fail(error) {
      this.error = error;
    }
  }
};
</script>
<style scoped>
.loader {
  border-top-color: #3498db;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
