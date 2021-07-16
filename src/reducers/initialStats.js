const initialStats = {
  hello: {
    loading: true,
    data: null,
    err: null,
  },
  emailExists: {
    emailSignupMod: false,
    emailExistsErr: false,
  },
  userLoggedIn: {
    isLoggedIn: false,
    accessToken: null,
    path: null,
  },
  userSignIn: {
    signInErr: null,
  },
  pwinquiry: {
    success: false,
    error: false,
  },
  userInfo: {
    loading: false,
    userName: null,
    userEmail: null,
    userPhoto: null,
    userLevel: null,
    userEXP: null,
    redirect: null,
  },
  daily: {
    loading: false,
    top: {
      monthlyBudget: null,
      monthlyUsed: null,
      exMonthlyUsed: null,
    },
    bottom: [],
    categoryList: null,
  },
  budget: {
    loading: true,
    categories: null,
    budgetGraph: null,
    userGraph: null,
    err: false,
  },
  socialData: {
    email: null,
    photo: null,
    username: null,
  },
  yearlyData: {
    top: [],
    bottom: {
      best: [],
      topthree: [],
      achieve: [
        {
          scrooge: [],
          leastspend: [],
        },
      ],
    },
  },
  monthlyData: {
    data: [],
  },
  navEffect: {
    currentPath: '/daily',
  },
  modalMessage: {
    message: null,
    errored: false,
    isModal: false,
  },
};
export default initialStats;
