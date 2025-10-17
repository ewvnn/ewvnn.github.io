<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      group: 'HUNTRIX',
      members: [
        {
          id: 1,
          name: 'Rumi',
          role: 'Leader, Vocal',
          img: '/photos/rumi.jpg',
          profile: [
            'Zodiac Sign: Aries',
            'Chinese Zodiac Sign: Goat',
            'Oldest of the three members in HUNTRIX',
            'Taekwondo Black Belt',
            'Loves cats',
            'Her favorite ramen flavor is Spicy Chicken.'
          ],
          city: 'Seoul',
          // optional: initialize to show loading state right away
          temp: undefined,
          tempError: false


        },
        { 
          id: 2, 
          name: 'Mira', 
          role: 'Rapper',        
          img: '/photos/mira.jpg',
          profile: [
            'Zodiac Sign: Taurus',
            'Chinese Zodiac Sign: Monkey',
            'Dancing since 4 years old',
            'Choreography for most of HUNTRIX songs',
            'Mira can play drums',
            'Her favorite ramen flavor is roast beef.'
          ],
          city: 'Los Angeles',
          temp: undefined,
          tempError: false


        },
        { 
          id: 3, 
          name: 'Zoey', 
          role: 'Dancer',        
          img: '/photos/zoey.jpg',
          profile: [
            'Zodiac Sign: Sagittarius',
            'Chinese Zodiac Sign: Rooster',
            'Her hobbies are drawing and skateboarding.',
            'She can play the bass',
            "Wrote most of HUNTRIX songs' rap parts",
            'Her favorite ramen flavor is pork with soy sauce.'
        ],
        city: 'Moscow',
        temp: undefined,
        tempError: false

        }
      ],
      query: '',
      selectedMember: null
    };
  },
  computed: {
    filteredMembers() {
      // Step 1: Clean up the query
      const q = this.query.trim().toLowerCase();

      // Step 2: If query is empty, show everyone
      if (!q) return this.members;

      // Step 3: Create a new array that only includes matches
      return this.members.filter(m =>
        m.name.toLowerCase().startsWith(q)
      );
    }
  },
  methods: {
    showProfile(member) {
      if (this.selectedMember != member) {
        this.selectedMember = member;
      } else {
        this.selectedMember = null;
      }
        
    },
    
    async fetchWeather(member) {
      const API_KEY = '08c8f631b3aaa95f6628204508437904'; // replace for the demo
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(member.city)}&units=metric&appid=${API_KEY}`;
      try {
        const { data } = await axios.get(url);
        member.temp = Math.round(data.main.temp); // e.g., 14
        member.tempError = false;
      } catch (err) {
        console.error('Weather fetch failed for', member.city, err?.message || err);
        member.temp = undefined;
        member.tempError = true;
      }
    },

    async fetchAllWeather() {
      await Promise.all(this.members.map(m => this.fetchWeather(m)));
    }
  },
  watch: {
    query() {
      this.selectedMember = null;
    }
  },
  mounted() {
    this.fetchAllWeather();
  }
};

</script>

<template>
  <main class="container">
    <h1>HUNTRIX Member Explorer</h1>
    <p>
      Search: <input type="text" v-model="query">
    </p>
    <p>
      Results: {{ filteredMembers.length }} of {{ members.length }}
    </p>
    <p v-if="filteredMembers.length == 0">
      No members Found <span v-if="query">for {{ query }}</span>
    </p>
    <ol v-else>
      <li v-for="m in filteredMembers" :key="m.id">
        <button 
        :class="{active: selectedMember && selectedMember.id === m.id}"
        @click="showProfile(m)">
          {{ m.name }} – {{ m.role }}
        </button>
        <br>
        <img :src="m.img" :alt="m.name" width="100">
        
        <!-- City + temperature -->
        <p class="city-temp">
          <strong>{{ m.city }}</strong>
          <span v-if="m.tempError"> - N/A</span>
          <span v-else-if="m.temp === undefined"> - Loading...</span>
          <span v-else> :: {{ m.temp }}°C</span>
        </p>

      </li>
    </ol>
    <section v-if="selectedMember" class="profile">
      <h2>{{ selectedMember.name }}'s Profile</h2>
      <ul>
        <li 
          v-for="(info, idx) in selectedMember.profile" :key="idx">
          {{ info }}
        </li>
      </ul>
    </section>


    

  </main>
</template>

<style scoped>
.container {
  max-width: 700px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: Arial, Helvetica, sans-serif;
}

.active {
  background-color: purple;
  color: white;
}

.city-temp {
  margin: 0.25rem 0 1rem;
  font-size: 0.9rem;
  color: #666;
}


</style>
