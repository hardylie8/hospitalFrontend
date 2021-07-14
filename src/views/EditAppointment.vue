<template>
  <div v-if="currentAppointment" class="edit-form " id="form">
    <center>
      <h1 class="my-3">
        Edit Appointment
      </h1>
    </center>
    <form>
      <div class="form-group">
        <label for="DoctorName">DoctorName</label>
        <input
          type="text"
          class="form-control"
          id="DoctorName"
          v-model="currentAppointment.DoctorName"
        />
      </div>
      <div class="form-group">
        <label for="Description">Description</label>
        <input
          type="text"
          class="form-control"
          id="Description"
          v-model="currentAppointment.Description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label
        ><br />
        <input
          type="radio"
          name="StatRadio"
          :checked="currentAppointment.Status === 'Full'"
          value="Full"
          id="Full"
          v-model="currentAppointment.Status"
        />
        <label class="mr-3" for="Full">Full</label>
        <input
          type="radio"
          name="StatRadio"
          :checked="currentAppointment.Status === 'NotFull'"
          value="NotFull"
          id="NotFull"
          v-model="currentAppointment.Status"
        />
        <label for="NotFull">NotFull</label>

        <!-- {{ currentAppointment.Status }} -->
      </div>
    </form>

    <button
      class="btn btn-primary mr-2"
      v-if="currentAppointment.published"
      @click="updatePublished(false)"
    >
      Full
    </button>
    <button class="btn btn-danger mr-2" @click="deleteTutorial">
      Delete
    </button>
    <button type="submit" class="btn btn-success" @click="updateAppointment">
      Update
    </button>
  </div>

  <div v-else>
    <br />
    {{ currentAppointment }}
    <p>Please click on a Tutorial...</p>
  </div>
</template>
<script>
import appointmentService from '../services/appointmentService';
export default {
  name: 'edit-appointment',
  data() {
    return {
      currentAppointment: null
    };
  },
  methods: {
    getAppointment(id) {
      appointmentService.get(id).then(response => {
        this.currentAppointment = response.data;
      });
    },
    updateAppointment() {
      appointmentService.update(
        this.currentAppointment.id,
        this.currentAppointment
      );
      location.reload();
    }
  },
  mounted() {
    this.getAppointment(this.$route.params.id);
  }
};
</script>
