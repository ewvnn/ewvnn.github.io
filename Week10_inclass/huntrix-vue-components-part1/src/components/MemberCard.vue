<template>
  <div class="card">
    <img :src="img" class="thumb">
    <h3>{{ name }}</h3>
    <p>{{ role }}</p>
    <!-- <p>MemberCard: {{  city }}</p> -->
    <WeatherInfo :curCity="city"/>
    <slot />
    <div class="footer">
      <slot name="footer">
        <!-- Fallback content if parent does not provide #footer -->
        <small class="muted">No badges yet</small>
      </slot>
    </div>


  </div>
</template>

<script>
import WeatherInfo from './WeatherInfo.vue';
export default {
    name: 'MemberCard',
    props: [ 'name', 'role', 'img', 'city'], // properties (attribute names) taken from app.vue
    components: { WeatherInfo }
}
</script>

<style>

.card {
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 180px;
    padding: 8px;
    text-align: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
.thumb {
    width: 100%;
    border-radius: 8px;
    

}
</style>