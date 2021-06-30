const initialStats = {
  hello: {
    loading: false,
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
  },
  userSignIn: {
    signInErr: null,
  },
  userInfo: {
    userName: null,
    userEmail: null,
    userPhoto: null,
    userLevel: null,
    userEXP: null,
  },
  userSet: {
    darkMode: false,
  },
  daily: {
    top: {
      monthlyBudget: null,
      monthlyUsed: null,
      exMonthlyUsed: null,
    },
    bottom: null,
    categoryList: null,
  },
  budget: {
    budgetGraph: null,
    categories: null,
    userGraph: null,
  },
  // 년도별 데이터: {
  //   차트data: [
  //     [{ type: 'date', id: 'Date' }, { type: 'number', id: 'Won/Loss' }],
  //     [new Date(2021, 8, 12), 100000],
  //   ]
  // }
};
export default initialStats;
