<template>
  <div>
    <center>
      <h1 class="my-3">
        Appointment List
      </h1>
    </center>
    <label for="">{{ participant.username }}</label>
    <div class="row mt-2">
      <div class="list-group col-md-6 ">
        <a
          id="add"
          href
          class="list-group-item m-2 mr-3 rounded  list list-group-item-action"
        >
          <router-link to="/add" class="nav-link">
            <h5 style="color:#17252a">
              Add new Appointment
            </h5>
          </router-link>
        </a>
        <a
          href="#"
          class="list-group-item list  rounded m-2 mr-3 list-group-item-action flex-column align-items-start "
          v-for="(appointment, index) in appointments"
          :key="index"
          @click="setActiveAppointment(appointment, index)"
        >
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ appointment.DoctorName }}</h5>
          </div>
          <p class="mb-1">
            {{ appointment.Description }}
          </p>
          <small>
            {{ appointment.Status }}
          </small>
        </a>
      </div>
      <div class="col-md-6" v-if="currentAppointment">
        <center>
          <h3>
            Action
          </h3>
        </center>
        <br />
        <div class="row">
          <div class="col-3"></div>

          <router-link
            class="btn  btn-primary col-3"
            :to="'/appointment/' + currentAppointment.id"
          >
            <font-awesome-icon icon="pen-square" /> Edit
          </router-link>
          &emsp;
          <button class="btn ml-3 col-3 btn-danger" @click="deleteAppointment">
            <font-awesome-icon icon="trash" />
            Delete
          </button>
        </div>
        <br />
        <center>
          <h3 class=" mt-2">
            Participant List
          </h3>
        </center>

        <div id="box" clas>
          <ul class="list-group">
            <div v-if="participant.length">
              <li
                class="list-group-item list mr-1 my-2 "
                v-for="(participant, id) in participant[0].users"
                :key="id"
              >
                {{ participant.username }}
              </li>
            </div>
            <li class="list-group-item list mr-1 my-2 " v-else>
              <strong>No Participant yet </strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UserService from '../services/user.service';
import appointmentService from '../services/appointmentService';
export default {
  name: 'Admin',
  data() {
    return {
      appointments: [],
      participant: [],
      currentAppointment: null,
      currentIndex: -1,
      title: '',
      content: ''
    };
  },
  methods: {
    retrieveAppointments() {
      appointmentService.getAll().then(response => {
        this.appointments = response.data;
      });
      // appointmentService.findAllParticipant().then(res => {
      //   this.participant = res.data;
      // });
    },
    setActiveAppointment(appointment, index) {
      this.currentAppointment = appointment;
      this.currentIndex = appointment ? index : -1;
      appointmentService
        .findAllParticipant(this.currentAppointment.id)
        .then(res => {
          this.participant = res.data;
        });
    },

    deleteAppointment() {
      appointmentService
        .delete(this.currentAppointment.id)
        .then(location.reload(true));
    }
  },
  mounted() {
    this.retrieveAppointments();
    UserService.getUserBoard().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>
