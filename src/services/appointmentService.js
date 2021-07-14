import http from '../http-common';

class AppointmentDataService {
  getAll() {
    return http.get('/appointment');
  }

  get(id) {
    return http.get(`/appointment/${id}`);
  }

  create(data) {
    return http.post('/appointment', data);
  }

  update(id, data) {
    return http.put(`/appointment/${id}`, data);
  }

  delete(id) {
    return http.delete(`/appointment/${id}`);
  }

  deleteAll() {
    return http.delete(`/appointment`);
  }
  findAllParticipant(id) {
    return http.get(`/appointment/ua/${id}`);
  }
  findByQuery(SQuery, Stat) {
    return http.get(`/appointment?squery=${SQuery}&stat=${Stat}`);
  }
}

export default new AppointmentDataService();
