import apiInstance from '../../api';

interface DataChangePassword {
  new_password1: string;
  new_password2: string;
  old_password: string;
}
class Profile {
  public static async getProfile() {
    try {
      const response = await apiInstance({
        method: 'get',
        url: '/account/profile/',
      });
      if (response) {
        return response;
      }
    } catch (error) {
      return error;
    }
  }
  public static async deleteProfile() {
    try {
      const response = await apiInstance({
        method: 'delete',
        url: '/account/profile/',
      });
      if (response) {
        return response;
      }
    } catch (error) {
      return error;
    }
  }
  public static async changePasswordLogged(changePassword: DataChangePassword) {
    try {
      const result = await apiInstance({
        method: 'post',
        url: '/account/password/change/',
        data: changePassword,
      });

      return result;
    } catch (error) {
      return error;
    }
  }
}

export default Profile;
