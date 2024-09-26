import apiInstance from "../../api";

class Clubs {
  public static async getClubs() {
    try {
      const response = await apiInstance({
        method: "get",
        url: "/bookclubs",
      });
      if (response) {
        return response;
      }
    } catch (error) {
      return error;
    }
  }

  public static async deleteClub(id: string) {
    try {
      const response = await apiInstance({
        method: "delete",
        url: `/bookclubs/${id}/`,
      });
      if (response) {
        return response;
      }
    } catch (error) {
      return error;
    }
  }

  public static async getClubsModeradorAndParticipant() {
    try {
      const response = await apiInstance({
        method: "get",
        url: "/bookclubs/personal_bookclubs/",
      });
      if (response) {
        return response;
      }
    } catch (error) {
      return error;
    }
  }

  public static async getPopularsClubs() {
    try {
      const response = await apiInstance({
        method: "get",
        url: "/bookclubs/popular",
      });
      if (response) {
        return response;
      }
    } catch (error) {
      return error;
    }
  }

  public static async getSearchClubs(search?: string) {
    try {
      const response = await apiInstance({
        method: "get",
        url: "/bookclubs/?search=" + search,
      });
      if (response) {
        return response;
      }
    } catch (error) {
      return error;
    }
  }

  public static async getReadings() {
    try {
      const response = await apiInstance({
        url: "/readings",
        method: "get",
      });
      if (response) {
        return response;
      }
    } catch (error) {
      return error;
    }
  }

  public static async getYouMayLike() {
    try {
      const response = await apiInstance({
        url: "/bookclubs/you_may_like/",
        method: "get",
      });
      if (response) {
        return response;
      }
    } catch (error) {
      return error;
    }
  }

  public static async getReadingsOfClub(name: string) {
    try {
      const response = await apiInstance({
        url: "/readings/?" + name,
        method: "get",
      });
      if (response) {
        return response;
      }
    } catch (error) {
      return error;
    }
  }

  public static async setClub(token: string, club: any) {
    const config = {
      method: "POST",
      body: club,
      header: {
        Authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    };
    // const response = await fetch(
    //   'http://synopsis-dev.us-east-2.elasticbeanstalk.com/bookclubs/',
    //   config
    // );

    const response = await fetch(
      "http://synopsis-prod.us-east-2.elasticbeanstalk.com/bookclubs/",
      config
    );

    return response;
  }

  public static async editClub(token: string, club: any, id: string) {
    const config = {
      method: "PATCH",
      body: club,
      header: {
        Authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    };
    // const response = await fetch(
    //   `http://synopsis-dev.us-east-2.elasticbeanstalk.com/bookclubs/${id}/`,
    //   config
    // );

    const response = await fetch(
      `http://synopsis-prod.us-east-2.elasticbeanstalk.com/bookclubs/${id}/`,
      config
    );

    return response;
  }

  public static async getClub(id: string) {
    try {
      const response = await apiInstance({
        method: "get",
        url: `/bookclubs/${id}/home`,
      });
      if (response) {
        return response;
      }
    } catch (error) {
      return error;
    }
  }

  public static async getProgressReadings(id: string) {
    try {
      const response = await apiInstance({
        method: "get",
        url: `/readings/${id}/progress`,
      });
      if (response) {
        return response;
      }
    } catch (error) {
      return error;
    }
  }

  public static async enterClub(id: string) {
    const response = await apiInstance({
      url: `/bookclubs/${id}/enter/`,
      method: "post",
    });

    return response;
  }

  public static async leaveClub(id: string) {
    try {
      const response = await apiInstance({
        url: `/bookclubs/${id}/leave/`,
        method: "post",
      });

      if (response) {
        return response;
      }
    } catch (error) {
      return error;
    }
  }

  public static async getMembersClub(id: string, page = "0") {
    try {
      const response = await apiInstance({
        method: "get",
        url: `/members/?bookclub=${id}${page !== "0" ? "&page=" + page : ""}`,
      });
      if (response) {
        return response;
      }
    } catch (error) {
      return error;
    }
  }
  public static async getDataMember(id: string, idUser: string) {
    try {
      const response = await apiInstance({
        method: "get",
        url: `/members/?bookclub=${id}&user=${idUser}`,
      });
      if (response) {
        return response;
      }
    } catch (error) {
      return error;
    }
  }
  public static async getReading(id: string) {
    try {
      const response = await apiInstance({
        method: "get",
        url: `/readings/${id}`,
      });
      if (response) {
        return response;
      }
    } catch (error) {
      return error;
    }
  }

  public static async removeMember(dto: { idClub: string; idMember: string }) {
    try {
      const response = await apiInstance({
        method: "post",
        url: `/bookclubs/${dto.idClub}/remove_member/`,
        data: {
          user_id: dto.idMember,
        },
      });
      if (response) {
        return response;
      }
    } catch (error) {
      return error;
    }
  }

  public static async searchBook(search: string) {
    try {
      const response = await apiInstance({
        method: "get",
        url: `/books/?search=${search}`,
      });
      if (response) {
        return response;
      }
    } catch (error) {
      return error;
    }
  }

  public static async getBookById(id: string) {
    try {
      const response = await apiInstance({
        method: "get",
        url: `/books/${id}`,
      });
      if (response) {
        return response;
      }
    } catch (error) {
      return error;
    }
  }

  public static async createReading(dto: any) {
    try {
      const response = await apiInstance({
        method: "post",
        url: `/readings/`,
        data: dto,
      });

      return response;
    } catch (error) {
      return error;
    }
  }

  public static async editReading(dto: any, id: string) {
    try {
      const response = await apiInstance({
        method: "patch",
        url: `/readings/${id}/`,
        data: dto,
      });

      return response;
    } catch (error) {
      return error;
    }
  }

  public static async finishReading(dto: any, id: string) {
    try {
      const response = await apiInstance({
        method: "put",
        url: `/readings/${id}/`,
        data: { ...dto },
      });

      return response;
    } catch (error) {
      return error;
    }
  }

  public static async getGoals(id: string) {
    try {
      const response = await apiInstance({
        method: "get",
        url: `/readings/${id}/reading_goals`,
      });

      return response;
    } catch (error) {
      return error;
    }
  }

  public static async createGoal(dto: {
    name: string;
    reading: string;
    description: string;
    predicted_ending: string;
  }) {
    try {
      const response = await apiInstance({
        method: "post",
        url: `/reading_goals/`,
        data: dto,
      });

      return response;
    } catch (error) {
      return error;
    }
  }

  public static async getGoal(id: string) {
    try {
      const response = await apiInstance({
        method: "get",
        url: `/reading_goals/${id}`,
      });

      return response;
    } catch (error) {
      return error;
    }
  }

  public static async editGoal(
    dto: {
      name?: string;
      description?: string;
      predicted_ending?: string;
      is_active?: boolean;
    },
    id: string
  ) {
    try {
      const response = await apiInstance({
        method: "patch",
        url: `/reading_goals/${id}/`,
        data: dto,
      });

      return response;
    } catch (error) {
      return error;
    }
  }

  public static async deleteGoal(id: string) {
    try {
      const response = await apiInstance({
        method: "delete",
        url: `/reading_goals/${id}/`,
      });

      return response;
    } catch (error) {
      return error;
    }
  }

  public static async getAuthors(dto: { name: string }) {
    try {
      const response = await apiInstance({
        method: "get",
        url: `/authors/?search=${dto.name}`,
      });

      return response;
    } catch (error) {
      return error;
    }
  }

  public static async getPublishers(dto: { name: string }) {
    try {
      const response = await apiInstance({
        method: "get",
        url: `/publishers/?search=${dto.name}`,
      });

      return response;
    } catch (error) {
      return error;
    }
  }

  public static async setBook(token: string, book: any) {
    const config = {
      method: "POST",
      body: book,
      header: {
        Authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    };
    // const response = await fetch(
    //   'http://synopsis-dev.us-east-2.elasticbeanstalk.com/books/',
    //   config
    // );

    const response = await fetch(
      "http://synopsis-prod.us-east-2.elasticbeanstalk.com/books/",
      config
    );

    return response;
  }

  public static async createNotice(
    dto: {
      title: string;
      content: string;
      pin?: boolean;
    },
    id: string
  ) {
    try {
      const response = await apiInstance({
        method: "post",
        url: `/readings/${id}/notice/`,
        data: dto,
      });

      return response;
    } catch (error) {
      return error;
    }
  }

  public static async createNoticeBookclub(
    dto: {
      title: string;
      content: string;
      pin?: boolean;
    },
    id: string
  ) {
    try {
      const response = await apiInstance({
        method: "post",
        url: `/bookclubs/${id}/notice/`,
        data: dto,
      });

      return response;
    } catch (error) {
      return error;
    }
  }

  public static async editNoticeClub(
    dto: {
      bookclub: string;
      created_by: string;
      title: string;
      content: string;
      pin: boolean;
    },
    id: string
  ) {
    try {
      const response = await apiInstance({
        method: "patch",
        url: `/bookclub_notice_board/${id}/`,
        data: dto,
      });

      return response;
    } catch (error) {
      return error;
    }
  }

  public static async editNoticeReading(
    dto: {
      created_by: string;
      title: string;
      content: string;
      pin: boolean;
    },
    id: string
  ) {
    try {
      const response = await apiInstance({
        method: "patch",
        url: `/reading_notice_board/${id}/`,
        data: dto,
      });

      return response;
    } catch (error) {
      return error;
    }
  }

  public static async removeNoticeClub(id: string) {
    try {
      const response = await apiInstance({
        method: "delete",
        url: `/bookclub_notice_board/${id}/`,
      });

      return response;
    } catch (error) {
      return error;
    }
  }

  public static async removeNoticeReading(id: string) {
    try {
      const response = await apiInstance({
        method: "delete",
        url: `/reading_notice_board/${id}/`,
      });

      return response;
    } catch (error) {
      return error;
    }
  }

  public static async getNoticeClubById(id: string) {
    try {
      const response = await apiInstance({
        method: "get",
        url: `/bookclub_notice_board/${id}/`,
      });

      return response;
    } catch (error) {
      return error;
    }
  }

  public static async getNoticeReadingById(id: string) {
    try {
      const response = await apiInstance({
        method: "get",
        url: `/reading_notice_board/${id}/`,
      });

      return response;
    } catch (error) {
      return error;
    }
  }

  public static async getNoticesReading(id: string) {
    try {
      const response = await apiInstance({
        method: "get",
        url: `/readings/${id}/notice/`,
      });

      return response;
    } catch (error) {
      return error;
    }
  }

  public static async getNoticesBookclubs(id: string) {
    try {
      const response = await apiInstance({
        method: "get",
        url: `bookclubs/${id}/notice/`,
      });

      return response;
    } catch (error) {
      return error;
    }
  }

  public static async createSurveyReading(dto: {
    title: string;
    type: "POLL" | "QUIZ" | string;
    pin: boolean;
    created_by: string;
    reading?: string | null;
    bookclub?: string;
    ending_date?: string;
  }) {
    try {
      const response = await apiInstance({
        method: "post",
        url: `/questions/`,
        data: dto,
      });

      return response;
    } catch (error) {
      return error;
    }
  }

  public static async editSurveyReading(
    dto: {
      title: string;
      start_date: string | null;
      ending_date?: string | null;
      type?: "POLL" | "QUIZ";
      pin: boolean;
      reading?: string | null;
      bookclub?: string | null;
      created_by: string;
    },
    id: string
  ) {
    try {
      const response = await apiInstance({
        method: "put",
        url: `/questions/${id}/`,
        data: dto,
      });

      return response;
    } catch (error) {
      return error;
    }
  }

  public static async createSurveyBookclub(dto: {
    title: string;
    ending_date: string;
    type: "POLL" | "QUIZ";
    pin: boolean;
    bookclub: string;
    created_by: string;
  }) {
    try {
      const response = await apiInstance({
        method: "post",
        url: `/questions/`,
        data: dto,
      });

      return response;
    } catch (error) {
      return error;
    }
  }

  public static async createChoices(dto: {
    text: string;
    question: string;
    is_correct?: boolean;
  }) {
    try {
      const response = await apiInstance({
        method: "post",
        url: `/choices/`,
        data: dto,
      });

      return response;
    } catch (error) {
      return error;
    }
  }

  public static async removeQuestions(id: string) {
    try {
      const response = await apiInstance({
        method: "delete",
        url: `/questions/${id}/`,
      });

      return response;
    } catch (error) {
      return error;
    }
  }

  public static async voteSurvey(id: string) {
    try {
      const response = await apiInstance({
        method: "post",
        url: `/choices/${id}/vote/`,
      });

      return response;
    } catch (error) {
      return error;
    }
  }

  public static async getAdminNoticesBoard() {
    try {
      const response = await apiInstance({
        method: "get",
        url: `/admin_notice_board/`,
      });

      return response;
    } catch (error) {
      return error;
    }
  }
}

export default Clubs;
