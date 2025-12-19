// src/lib/navigation.ts
export const navigateTo = {
  // Страница входа теперь корневая
  login: () => {
    // Перенаправляем на корень
    if (window.location.pathname !== '/') {
      window.location.href = '/';
    }
  },
  
  // Остальные функции
  createAccount: () => {
    if (window.location.pathname !== '/create_acc') {
      window.location.href = '/create_acc';
    }
  },
  verify: (email?: string) => {
    const url = '/create_acc/verify' + (email ? `?email=${encodeURIComponent(email)}` : '');
    if (window.location.pathname + window.location.search !== url) {
      window.location.href = url;
    }
  },
  
  // Главные страницы после авторизации
  manager: () => {
    if (window.location.pathname !== '/manager') {
      window.location.href = '/manager';
    }
  },
  vet: () => {
    if (window.location.pathname !== '/vet') {
      window.location.href = '/vet';
    }
  },
  warehouse: () => {
    if (window.location.pathname !== '/warehouse_manager') {
      window.location.href = '/warehouse_manager';
    }
  },
  
  // Выход из системы - перенаправляем на корень
  logout: () => {
    console.log('Выход из системы...');
    
    // Очищаем данные авторизации
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_email');
    
    // Перенаправляем на корневую страницу (логин)
    window.location.href = '/';
    
    // Или с заменой истории
    // window.location.replace('/');
  }
};