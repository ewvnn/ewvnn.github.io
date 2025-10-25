<template>
    <div class="weather">
        {{ curCity }}: {{ temp }}

        <br>
        <button @click="getTemp()">
            Get Weather Info
        </button>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    // cur_city: null,
    data() {
        return {
            temp: 'Nothing Here Yet!'
        }
    },
    props: ['curCity'],
    methods: {
        // async getTemp() {
        //     // console.log('getTemp() called');
        //     try {
        //     const API_KEY = '08c8f631b3aaa95f6628204508437904'    // replace with your key
        //     const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.curCity}&appid=${API_KEY}&units=metric`
        //     const resp = await axios.get(url)
        //     console.log(resp.data.main.temp)
        //     this.temp = resp.data.main.temp
        //     } catch {
        //         this.error = true
        //     }

        // }
    },
    async created() {
            // console.log('getTemp() called');
        try {
            const API_KEY = '08c8f631b3aaa95f6628204508437904'    // replace with your key
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.curCity}&appid=${API_KEY}&units=metric`
            const resp = await axios.get(url)
            console.log(resp.data.main.temp)
            this.temp = resp.data.main.temp
        } catch {
            this.error = true
        }
    }

}
</script>

<style scoped>

.weather {
    font-size: 0.9rem;
    color: #333;

}
</style>