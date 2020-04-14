export default {
  getQuizzes: () => {
    return fetch("/quiz/").then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } else
        return {
          message: { messageBody: " UnAuthorised" },
          messageError: true,
        };
    });
  },

  addQuiz: (quiz) => {
    return fetch("/quiz/add", {
      method: "post",
      body: JSON.stringify(quiz),
      headers: { "Content-type": "application/json" },
    }).then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } else
        return {
          message: { messageBody: " UnAuthorised" },
          messageError: true,
        };
    });
  },

  deleteQuiz: () => {
    return fetch("/quiz/:id", {
      method: "delete",
    }).then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } else
        return {
          message: { messageBody: " UnAuthorised" },
          messageError: true,
        };
    });
  },
};
