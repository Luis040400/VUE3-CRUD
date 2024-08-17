<script setup></script>

<template>
  <RouterView />
</template>

<style>
:root {
  --nv-gap: 1rem;
  --nv-z: 9999;

  /* Set the maximum width of the stream */
  --nv-root-width: var(--container-width);

  /* Add the top padding and place it below the header */
  --nv-root-top: calc(var(--header-height) + var(--container-padding));

  /* Add the same left-right paddings of your app container */
  --nv-root-left: var(--container-padding);
  --nv-root-right: var(--container-padding)
}
</style>
