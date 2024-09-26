import apiInstance from '../../api';

interface DataRegister {
  username: string;
  email: string;
  password1: string;
  password2: string;
}
interface DataLogin {
  username: string;
  email: string;
  password: string;
}
interface DataReset {
  email: string;
}

interface Code {
  token: string;
}

interface DataChangePassword {
  new_password1: string;
  new_password2: string;
  uid: string;
  token: string;
}

class Auth {
  public static async signup(dataRegister: DataRegister) {
    try {
      const result = await apiInstance({
        method: 'post',
        url: '/account/register/',
        data: dataRegister,
      });

      return result;
    } catch (error) {
      return error;
    }
  }
  public static async signin(dataLogin: DataLogin) {
    try {
      const result = await apiInstance({
        method: 'post',
        url: '/account/login/',
        data: dataLogin,
      });
      if (result?.data?.access_token) {
        apiInstance.defaults.headers.Authorization = `Bearer ${result?.data?.access_token}`;
      }

      return result;
    } catch (error) {
      return error;
    }
  }
  public static async logout() {
    try {
      const result = await apiInstance({
        method: 'post',
        url: '/account/logout/',
      });

      return result;
    } catch (error) {
      return error;
    }
  }
  public static async forgotPassword(passwordReset: DataReset) {
    try {
      const result = await apiInstance({
        method: 'post',
        url: '/account/password/reset/',
        data: passwordReset,
      });

      return result;
    } catch (error) {
      return error;
    }
  }
  public static async sendCode(code: Code) {
    try {
      const result = await apiInstance({
        method: 'post',
        url: '/account/token/verify/',
        data: code,
      });

      return result;
    } catch (error) {
      return error;
    }
  }
  public static async changePassword(changePassword: DataChangePassword) {
    try {
      const result = await apiInstance({
        method: 'post',
        url: '/account/password/reset/confirm/',
        data: changePassword,
      });

      return result;
    } catch (error) {
      return error;
    }
  }
}

export default Auth;
