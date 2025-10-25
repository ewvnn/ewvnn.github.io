<template>
  <div class="card">
    <img :src="img" class="thumb">
    <h3>{{ name }}</h3>
    <p>{{ role }}</p>
    <!-- <p>MemberCard: {{  city }}</p> -->
    <WeatherInfo :curCity="city"/>
    <p class="likes">👍 {{ likes }} Likes</p>
    <button class="like-btn" @click="$emit('likeyy', id)">Like +</button>
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
    props: [ 'name', 'role', 'img', 'city', 'id', 'likes'], // properties (attribute names) taken from app.vue
    // emits: ['likeyy'],
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

.likes { font-weight: 600; margin: 6px 0; }

.like-btn {
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
}
.like-btn:hover { background: #f7f7f7; }

</style>