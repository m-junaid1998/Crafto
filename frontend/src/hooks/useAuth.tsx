import { useCrudMutation } from "../api/apiSlice";
import { endpoints } from "../api/config";
import { toast } from "sonner"; // ya aapka toast utility
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "../store/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const [crudMutation, { isLoading: isAuthLoading }] = useCrudMutation();

  // 1. Email/Password Login
  const loginUser = async (loginPayload: any) => {
    try {
      const res = await crudMutation({
        endpoint: endpoints.authRoutes.login,
        method: "POST",
        data: loginPayload,
      }).unwrap();

      if (res?.success) {
        dispatch(loginSuccess(res));
        toast.success(res.message || "Login successful!");
        return { success: true, data: res };
      } else {
        toast.error(res?.message || "Login failed.");
        return { success: false };
      }
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "Login failed.");
      return { success: false, error };
    }
  };

  // 2. Google OAuth Login
  const googleLoginUser = async (idToken: string) => {
    try {
      const res = await crudMutation({
        endpoint: endpoints.authRoutes.google,
        method: "POST",
        data: { idToken },
      }).unwrap();

      if (res?.success) {
        dispatch(loginSuccess(res));
        toast.success(res.message || "Google Authentication successful!");
        return { success: true, data: res };
      } else {
        toast.error(res?.message || "Google authentication failed.");
        return { success: false };
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || error?.message || "Google Login failed."
      );
      return { success: false, error };
    }
  };

  // 3. User Registration
  const registerUser = async (registerPayload: any) => {
    try {
      const res = await crudMutation({
        endpoint: endpoints.authRoutes.register,
        method: "POST",
        data: registerPayload,
      }).unwrap();

      if (res?.success) {
        dispatch(loginSuccess(res));
        toast.success(res.message || "Registration successful!");
        return { success: true, data: res };
      } else {
        toast.error(res?.message || "Registration failed.");
        return { success: false };
      }
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "Registration failed.");
      return { success: false, error };
    }
  };

  // 4. Update Password
  const updatePassword = async (passwordPayload: { oldPassword: ""; newPassword: "" }) => {
    try {
      const res = await crudMutation({
        endpoint: endpoints.authRoutes.updatepassword,
        method: "PUT",
        data: passwordPayload,
      }).unwrap();

      if (res?.success) {
        toast.success(res.message || "Password updated successfully.");
        return { success: true, data: res };
      }
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "Password update failed.");
      return { success: false, error };
    }
  };

  // 5. Delete User Account
  const deleteUser = async (email: string) => {
    try {
      const res = await crudMutation({
        endpoint: endpoints.authRoutes.deleteUser,
        method: "DELETE",
        data: { email },
      }).unwrap();

      if (res?.success) {
        toast.success(res.message || "User deleted successfully.");
        dispatch(logout());
        return { success: true };
      }
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "Account deletion failed.");
      return { success: false, error };
    }
  };

  return {
    isAuthLoading,
    loginUser,
    googleLoginUser,
    registerUser,
    updatePassword,
    deleteUser,
  };
};