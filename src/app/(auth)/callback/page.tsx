import { redirect } from "next/navigation";

const AuthCallback = async () => {
  // 调用server action
  const auth = {status:200}; // https://youtu.be/kKa-AtjsmXQ?si=ef39-EaE-MXdoGUp&t=3118

  if (auth.status === 200 || auth.status === 201) {
    return redirect('/dashboard')
  }

  else if ([403, 400, 500].includes(auth.status)) {
    return redirect('/sign-in')
  }

}

export default AuthCallback