"use server";

import handleError from "@/utils/handleError";
import { createClient } from "@/utils/server";

export const loginAction = async (email: string, password: string) => {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signInWithPassword({ email, password });
    if (error) {
      throw error;
    }
    return { errorMsg: null };
  } catch (e) {
    return handleError(e);
  }
};

export const signUpAction = async (email: string, password: string) => {
  try {
    const { auth } = await createClient();
    const { data, error } = await auth.signUp({
      email,
      password,
    });
    if (error) {
      throw error;
    }

    const userId = data.user?.id;
    if (!userId) throw new Error("Error signing up");

    return { errorMsg: null };
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};

export const SignOutAction = async () => {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signOut();
    return { error };
  } catch (e) {
    console.error(e);
    return { error: null };
  }
};

/**
 * 



 */
