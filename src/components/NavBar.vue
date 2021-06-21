<template>
  <div id="navbar" class="bg-indigo-100 border-b border-gray-200">
    <nav class="flex justify-between items-center p-1 mx-3">
      <div>
        <h1>
          <a href="/" class="text-2xl font-bold uppercase">Tola-Telo</a>
        </h1>
      </div>
      <ul class="flex justify-center items-baseline">
        <li>
          <a href="#">
            <span>Home</span>
          </a>
        </li>
        <li class="text-gray-700 font-semibold ml-4 border-b-2 border-red-300">
          <a href="#">
            <span>Task</span>
          </a>
        </li>
      </ul>
      <div class="text-lg w-36 text-right">
        <span class="bg-red-300 px-2 py-0.5 rounded-lg border-red-500"><a href="">Log Out</a></span>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
};
</script>

<style></style>
