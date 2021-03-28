<template>
  <v-container>
    <v-toolbar class="mx-xs-0 mx-sm-4 mx-md-10 mx-lg-14 mx-xl-16 rounded-lg">
      <v-toolbar-title>
        <strong>Reviewed Submissions</strong>
      </v-toolbar-title>
      <v-spacer />
      <v-switch
        v-model="switch1"
        inset
        color="white"
        :label="switch1 ? 'Completed' : 'Inphase'"
      />
    </v-toolbar>
    <v-container v-if="!switch1">
      <v-card v-for="(item,i) in in_phase_submissions" :key="i">
        <v-card-title>
          {{ item.submitter.first_name }}
          <v-spacer />
          {{ item.avg_score }}
        </v-card-title>
        <v-card-actions>
          <div>Reviews</div>
          <v-spacer />

          <v-btn icon @click="view(item)">
            <v-icon>
              {{ item.show ? "mdi-chevron-up" : "mdi-chevron-down" }}
            </v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="item.show">
            <v-data-table
              :headers="headers"
              :items="item.reviews"
              :items-per-page="3"
              class="elevation-1"
            />
          </div>
        </v-expand-transition>
      </v-card>
    </v-container>
    <v-container v-if="switch1">
      <v-card v-for="(item,i) in completed_submissions" :key="i">
        <v-card-title>
          {{ item.submitter.first_name }}
          <v-spacer />
          {{ item.avg_score }}
        </v-card-title>
        <v-card-actions>
          <div>Reviews</div>
          <v-spacer />

          <v-btn icon @click="view(item)">
            <v-icon>
              {{ item.show ? "mdi-chevron-up" : "mdi-chevron-down" }}
            </v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="item.show">
            <v-data-table
              :headers="headers"
              :items="item.reviews"
              :items-per-page="3"
              class="elevation-1"
            />
          </div>
        </v-expand-transition>
      </v-card>
    </v-container>
  </v-container>
</template>
<script>

export default {
  middleware: ['auth'],
  async fetch () {
    const header = {
      params: {
        courseId: this.$route.params.id,
        assignmentId: this.$route.params.assg,
        userSpecific: 'F'
      },
      headers: {
        Authorization: this.$auth.getToken('local')
      }
    }

    let InPhaseSubmissions = await this.$axios.$get(
      'https://arcane-mountain-95630.herokuapp.com/submission/get-in-phase/',
      header
    )
    let CompletedSubmissions = await this.$axios.$get(
      'https://arcane-mountain-95630.herokuapp.com/submission/get-reviewed/',
      header
    )
    CompletedSubmissions = CompletedSubmissions.submissions
    InPhaseSubmissions = InPhaseSubmissions.map((e) => {
      e.show = false
      return e
    })
    CompletedSubmissions = CompletedSubmissions.map((e) => {
      e.show = false
      return e
    })
    this.in_phase_submissions = InPhaseSubmissions
    this.completed_submissions = CompletedSubmissions
  },
  data: () => ({
    in_phase_submissions: [],
    completed_submissions: [],
    switch1: true,
    headers: [
      {
        text: 'Reviewed by',
        align: 'start',
        sortable: true,
        value: 'reviewer.first_name'
      },
      { text: 'Roll number', value: 'reviewer.roll_number' },
      { text: 'Score', value: 'score' },
      { text: 'Remarks', value: 'remark' }
    ]
  }),

  computed: {
  },

  methods: {
    view (submission) {
      submission.show = !submission.show
    }
  },
  head: {
    title : 'All Reviews'
  }
}
</script>
