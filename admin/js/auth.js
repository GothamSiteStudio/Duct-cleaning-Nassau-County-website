// ============================================
// Auth - Login, logout, page protection
// ============================================

const AUTH = {
  loginPage: '/admin/login.html',
  dashboardPage: '/admin/dashboard.html',

  // Check if user is logged in; redirect to login if not
  async requireAuth() {
    const { data: { session } } = await db.auth.getSession();
    if (!session) {
      window.location.href = this.loginPage;
      return null;
    }
    return session.user;
  },

  // If already logged in, skip login page
  async redirectIfLoggedIn() {
    const { data: { session } } = await db.auth.getSession();
    if (session) {
      window.location.href = this.dashboardPage;
    }
  },

  // Login with email + password
  async login(email, password) {
    const { data, error } = await db.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  // Logout
  async logout() {
    await db.auth.signOut();
    window.location.href = this.loginPage;
  },

  // Get current user
  async getUser() {
    const { data: { user } } = await db.auth.getUser();
    return user;
  }
};
