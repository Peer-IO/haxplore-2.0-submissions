<template>
  <div>
    <v-parallax :src="background" dark>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="12" md="5" align="center">
          <v-btn class="white black--text" to="/login"> Get Started </v-btn>
        </v-col>
        <v-col cols="12" sm="12" md="5" align="center">
          <v-img max-height="250" max-width="250" aspect-ratio :src="imgSrc" />
        </v-col>
      </v-row>
    </v-parallax>
    <v-lazy
      :options="{
        threshold: 0.6,
      }"
      transition="scale-transition"
    >
      <div class="mt-5 text-h4 text-md-h3 white--text text-center">
        How Does it Work ?
      </div>
    </v-lazy>
    <div class="tw-container tw-mx-auto tw-px-4 tw-my-8">
      <v-timeline dark align-top>
        <v-timeline-item
          v-for="(content, i) in process"
          :key="i"
          :color="content.color"
          small
        >
          <div class="py-4">
            <h2
              :class="`tw-text-lg md:tw-text-2xl tw-font-semibold mb-4 ${content.color}--text`"
            >
              {{ content.title }}
            </h2>
            <p class="tw-text-sm md:tw-text-base tw-text-justify">
              {{ content.body }}
            </p>
          </div>
        </v-timeline-item>
      </v-timeline>
    </div>
    <v-lazy
      :options="{
        threshold: 0.6,
      }"
      transition="scroll-y-transition"
    >
      <div class="tw-mt-20 text-h4 text-md-h3 white--text text-center">
        Build on academic research
      </div>
    </v-lazy>
    <v-container>
      <div
        class="tw-flex tw-flex-col md:tw-flex-row tw-justify-center tw-items-center md:tw-justify-evenly tw-my-6"
      >
        <p
          class="text-body-1 tw-container tw-mx-auto tw-text-justify tw-block tw-px-4"
        >
          Peer IO is not just a tool that can provide you with insights into your
          students’ performance and save you time. It also creates a much better
          learning experience for your students. Don’t believe us? There’s a
          bunch of studies that actually proves that it can increase learning up
          to 30%!
        </p>
        <div class="tw-max-w-md">
          <img
            alt="thinking"
            load="lazy"
            :src="student"
            class="tw-object-cover"
          />
        </div>
      </div>
    </v-container>
    <v-lazy
      :options="{
        threshold: 0.6,
      }"
      transition="scale-transition"
    >
      <div class="mt-5 text-h4 text-md-h3 white--text text-center">
        What people are saying ?
      </div>
    </v-lazy>
    <v-container>
      <v-carousel
        class="mp-5"
        :hide-delimiters="true"
        :show-arrows-on-hover="true"
        height="400"
      >
        <v-carousel-item v-for="(review, i) in reviews" :key="i">
          <v-sheet
            height="100%"
            color="transparent"
            class="d-flex justify-center align-center"
          >
            <v-card color="pink" dark max-width="450" height="200">
              <v-card-title class="headline">
                <span class="mt-n4">
                  {{ review.name }}
                </span>
                <v-avatar class="ml-auto mt-n14" size="125">
                  <v-img :src="review.image" />
                </v-avatar>
              </v-card-title>
              <v-card-text class="text-body-2">
                {{ review.text }}
              </v-card-text>
            </v-card>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-container>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const [reviewData, processData] = await Promise.all([
      $content('reviews').only(['data']).fetch(),
      $content('process').only(['data']).fetch(),
    ])
    return {
      reviews: reviewData.data,
      process: processData.data,
    }
  },
  data() {
    return {
      imgSrc: require('../assets/images/study.webp'),
      background: require('../assets/images/background.webp'),
      student: require('../assets/images/student.jpg'),
    }
  },
  head: {
    title: 'Welcome',
  },
}
</script>
<style scoped></style>
