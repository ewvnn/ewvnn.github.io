<script>
import HeaderBar from './components/HeaderBar.vue'
import MemberCard from './components/MemberCard.vue';
import FooterBar from './components/FooterBar.vue';

export default {
  name: 'App',
  components: { HeaderBar, MemberCard, FooterBar},
  data() {
    return {
      group: 'HUNTRIX',
      members: [
        {
          id: 1,
          name: 'Rumi',
          role: 'Leader, Vocal',
          img: '/photos/rumi.jpg',
          city: 'Seoul'
        },
        {
          id: 2,
          name: 'Mira',
          role: 'Rapper',
          img: '/photos/mira.jpg',
          city: 'Los Angeles'
        },
        {
          id: 3,
          name: 'Zoey',
          role: 'Dancer',
          img: '/photos/zoey.jpg',
          city: 'Moscow'
        }
      ],
      likes: {1:0, 2:0, 3:0 } // key:value -> id: num of likes
    }
  },
  methods: {
    onLiked(id) {
      this.likes[id]++
    }
  }
}

</script>

<template>
  <div id="app">

    <!-- Header Bar goes here -->
     <HeaderBar />
    <!-- Content goes here -->

    <div class="main">
      <!-- Member Cards go here -->
       <MemberCard v-for="member in members" :key="member.id"
        :name="member.name"
        :id="member.id"
        :role="member.role"
        :img="member.img"
        :city="member.city"
        :likes="likes[member.id]"
        v-on:likeyy="onLiked"
       >
        <!-- Appears inside the MemberCard's slot -->
        <p style="font-size:0.9rem;color:#555;">
          ✨ {{ member.name }} is shining bright today!
        </p>
        <button @click="likes = {1:0, 2:0, 3:0}">Reset All Likes</button>
        
        <template #footer>
          <div v-if="member.name === 'Rumi'">🏆 Leader’s Choice</div>
          <div v-else-if="member.name === 'Mira'">🎤 Rap Star</div>
          <div v-else>💃 Dance Icon</div>
        </template>


        </MemberCard>
    
        
    </div>
    <div class="text-center">
      <p>Total Likes: {{ Object.values(likes).reduce((a,b)=>a+b, 0) }}</p>
    </div>
    <!-- footer -->
    <FooterBar />
  </div>
</template>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
}
</style>
