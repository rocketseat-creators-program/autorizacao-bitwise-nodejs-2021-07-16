const permissions = {
  manageUsers: 1,
  getExams: 1 << 1,
  getPersonalInfo: 1 << 2,
  getMedicines: 1 << 3,
}

module.exports = {
  permissions,
}
