// Создаем объект базы данных
let database = {
    users: []
  };
  
  // Функция добавления пользователя в базу данных
function addUser(name, email) {
    let user = {
      name: name,
      email: email
};
    database.users.push(user);
    saveDatabase(); // Сохраняем базу данных после добавления пользователя
  }
  
  // Функция сохранения базы данных в localStorage
  function saveDatabase() {
    localStorage.setItem('database', JSON.stringify(database));
  }
  
  // Функция загрузки базы данных из localStorage
  function loadDatabase() {
    let data = localStorage.getItem('database');
    if (data) {
      database = JSON.parse(data);
    } else {
      saveDatabase();
    }
  }
  
  // Загружаем базу данных при запуске скрипта
loadDatabase();