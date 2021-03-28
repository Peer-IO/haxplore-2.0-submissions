<template>
  <v-container>
    <v-toolbar class="mx-xs-0 mx-sm-4 mx-md-10 mx-lg-14 mx-xl-16 rounded-lg">
      <v-toolbar-title>
        <strong>FeedBack for your Submission</strong>
      </v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-container>
      <v-card>
        <v-card-title>
          {{ name }}
          <v-spacer />
          Final Score : {{ avg_score }}
        </v-card-title>
        <v-simple-table>
            <template v-slot:default>
                <thead>
                <tr>
                    <th class="text-left">
                    Review No
                    </th>
                    <th class="text-left">
                    Score given
                    </th>
                    <th class="text-left">
                    Remarks 
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr
                    v-for="(item,i) in reviews"
                    :key="item._id"
                >
                    <td>{{ i + 1  }}</td>
                    <td>{{ item.score }}</td>
                    <td>{{ item.remark }}</td>
                </tr>
                </tbody>
            </template>
        </v-simple-table>
      </v-card>
    </v-container>
  </v-container>
</template>
<script>

export default {
  middleware: ['auth'],
  async fetch () {
    const header = {
      headers: {
        Authorization: this.$auth.getToken('local')
      }
    }

    let submission = await this.$axios.$get(
      `https://arcane-mountain-95630.herokuapp.com/submission/${this.$route.params.sub}`,
      header
    )
    
    this.name = submission.submitter.first_name +' ' +  submission.submitter.last_name
    this.avg_score = submission.avg_score 
    this.reviews = submission.reviews
  },
  data: () => ({
    name : null ,
    avg_score : 0 ,
    reviews : [],
  }),
}
</script>
