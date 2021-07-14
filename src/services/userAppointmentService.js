import http from '../http-common';

class UserAppointmentDataService {
  getAll() {
    return http.get('/userappointment');
  }
  HasParticipate(id, userId) {
    return http.get(`/userappointment/${id}/${userId}`);
  }
  create(data) {
    return http.post(`/userappointment`, data);
  }
  delete(id, userId) {
    return http.delete(`/userappointment/${id}/${userId}`);
  }
}

export default new UserAppointmentDataService();
