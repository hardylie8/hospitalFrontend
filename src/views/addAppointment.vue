<template>
  <div class="submit-form mt-3">
    <center>
      <h1 class="my-3">
        Add New Appointment
      </h1>
    </center>
    <div v-if="!submitted">
      <div class="form-group">
        <h5>Doctor Name</h5>
        <input
          type="text"
          class="form-control"
          id="title"
          refs="DoctorName"
          required
          v-model="appointment.DoctorName"
          name="title"
        />
      </div>

      <div class="form-group">
        <h5>Description</h5>
        <input
          class="form-control"
          id="description"
          refs="Description"
          required
          v-model="appointment.Description"
          name="description"
        />
      </div>

      <button
        @click="saveAppointment"
        class="btn mt-3 text-light"
        style="background-color:#17252a"
      >
        Submit
      </button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newAppointment">Add</button>
    </div>
  </div>
</template>
<script>
import appointmentService from '../services/appointmentService';
export default {
  name: 'addAppointment',
  data() {
    return {
      appointment: {
        id: null,
        DoctorName: '',
        Description: ''
      },
      submitted: false
    };
  },
  methods: {
    saveAppointment() {
      var data = {
        DoctorName: this.appointment.DoctorName,
        Description: this.appointment.Description,
        Status: 'NotFull'
      };

      appointmentService.create(data).then(response => {
        this.appointment.id = response.data.id;
        this.submitted = true;
      });
    },

    newAppointment() {
      this.submitted = false;
      this.tutorial = {};
    }
  }
};
</script>
