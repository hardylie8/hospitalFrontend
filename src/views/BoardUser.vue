<template>
  <div>
    <center>
      <h1 style="color:#17252a;" class="my-3">
        Appointment List
        {{ Stat }}
      </h1>
    </center>
    <div class="row">
      <div class=" list-group col-md-6">
        <div class="row mx-1 my-3">
          <div class="col-6">
            <input
              type="text"
              class="form-control"
              placeholder="Search"
              v-model="SearchQuery"
              style="height:40px"
            />
          </div>
          <div class="col-3">
            <div class="input-group-append w-100">
              <button
                class="btn-sm p-2 btn btn-primary w-100"
                type="button"
                @click="search"
              >
                <font-awesome-icon icon="search" />
                Search
              </button>
            </div>
          </div>
          <div class="col-3">
            <div class="form-check w-100 mt-2 me-auto form-check">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="Stat"
                :value="NotFull"
                @change="search"
                id="flexSwitchCheckDefault"
              />
              <label class="form-check-label" for="flexSwitchCheckDefault"
                >Not Full</label
              >
            </div>
          </div>
        </div>

        <a
          href="#"
          class="list-group-item list rounded my-2 list-group-item-action flex-column align-items-start "
          v-for="(appointment, id) in appointments"
          :key="id"
          @click="setActiveAppointment(appointment, index)"
        >
          <div class="d-flex w-100 row">
            <h5 class="mb-1 col-4">Doctor Name</h5>
            <h5 class="mb-1 col-6">: {{ appointment.DoctorName }}</h5>
          </div>
          <div class="row p-0 w-100">
            <label class="col-4">Description</label>
            <label class="col-6">: {{ appointment.Description }}</label>
          </div>
          <div class="row  w-100">
            <small class="col-4">Status</small>
            <small class="col-6">: {{ appointment.Status }}</small>
          </div>
        </a>
      </div>

      <div class="col-md-6 " v-if="currentAppointment">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Book This Appointment ??</h5>
            <div
              class=""
              v-if="
                currentAppointment.Status === 'NotFull' &&
                  !hasparticipate.length
              "
            >
              <p class="card-text">
                You haven't signed up for this appointment yet.
              </p>
              <button class="btn btn-outline-dark" @click="applyForAppointment">
                Apply now
              </button>
            </div>

            <div class="" v-else-if="hasparticipate.length">
              <p class="card-text">
                You has already applied for this appointment.
              </p>

              <button
                class="btn  btn-outline-danger"
                @click="deleteAppointment"
              >
                Cancel Applyment
              </button>
            </div>

            <label
              class="card-text"
              v-else-if="currentAppointment.Status === 'Full'"
            >
              <strong> This Appointment is full</strong>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '../services/user.service';
import appointmentService from '../services/appointmentService';
import userAppointmentService from '../services/userAppointmentService';
export default {
  name: 'User',
  data() {
    return {
      appointments: [],
      hasparticipate: null,
      currentAppointment: null,
      currentIndex: -1,
      SearchQuery: '',
      content: '',
      Stat: '',
      cek: ''
    };
  },
  methods: {
    applyForAppointment() {
      let data = {
        id: this.currentAppointment.id,
        userId: this.currentUser.id
      };
      userAppointmentService.create(data);
      location.reload();
    },
    deleteAppointment() {
      // this.cek = this.currentAppointment.id + ' ' + this.currentUser.id;
      userAppointmentService.delete(
        this.currentAppointment.id,
        this.currentUser.id
      );
      location.reload();
    },
    retrieveAppointments() {
      appointmentService.getAll().then(response => {
        this.appointments = response.data;
      });
    },
    setActiveAppointment(appointment, index) {
      this.currentAppointment = appointment;
      this.currentIndex = appointment ? index : -1;
      if (this.currentIndex !== -1) {
        userAppointmentService
          .HasParticipate(appointment.id, this.currentUser.id)
          .then(response => {
            this.hasparticipate = response.data;
          });
      }
    },
    search() {
      if (this.Stat === true) {
        this.Stat = 'NotFull';
      } else {
        this.Stat = '';
      }
      appointmentService
        .findByQuery(this.SearchQuery, this.Stat)
        .then(response => {
          this.appointments = response.data;
          this.setActiveAppointment(null);
          this.cek = response.data;
        })
        .catch(e => {
          this.cek = e;
        });
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
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
