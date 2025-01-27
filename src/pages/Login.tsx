import { FormEvent, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { FiAtSign, FiEye, FiEyeOff, FiLock, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import axios from "axios";

function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("format email tidak valid");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/login",
        {
          email: email,
          password: password,
        }
      );

      if (response.status === 200) {
        setEmail("");
        setPassword("");

        const token = response.data.data.token;

        dispatch(login({ token: String(token) }));

        localStorage.setItem("jwtToken", token);

        navigate("/");
      }
    } catch (error: any) {
      if (
        error.response.data.message === "Paramter email tidak sesuai format"
      ) {
        setEmailError("Paramter email tidak sesuai format");
      } else if (
        error.response.data.message === "Username atau password salah"
      ) {
        setEmailError("Username atau password salah");
        setPasswordError("Username atau password salah");
      }

      setErrorMsg(error.response.data.message);
    }

    setLoading(false);
  };

  const handleCloseError = () => {
    setErrorMsg("");
  };

  return (
    <>
      <div className="flex h-[100vh]">
        <div className="flex flex-col justify-center items-center px-[100px] w-[45%] gap-[40px] ">
          <div className="flex items-center w-full justify-center gap-[8px]">
            <img src="src/assets/images/Logo.png" alt="" />
            <h1 className="font-extrabold">SIMS PPOB</h1>
          </div>
          <p className="font-extrabold text-[40px]/[48px] text-center">
            Masuk atau buat akun untuk memulai
          </p>
          <form className="w-full" onSubmit={handleRegister}>
            <div className="flex flex-col gap-[32px] w-full">
              <Input
                label="Emali"
                type="email"
                leadingIcon={
                  <FiAtSign className={`${emailError && "text-[#F42619]"}`} />
                }
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                required
                error={!!emailError}
                value={email}
              />
              <Input
                label="Password"
                type={isPasswordVisible ? "text" : "password"}
                leadingIcon={
                  <FiLock className={`${passwordError && "text-[#F42619]"}`} />
                }
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                required
                error={!!passwordError}
                value={password}
                trailingIcon={
                  isPasswordVisible ? (
                    <FiEyeOff onClick={togglePasswordVisibility} />
                  ) : (
                    <FiEye onClick={togglePasswordVisibility} />
                  )
                }
              />
              <Button lable="Masuk" type="submit" loading={loading} />
            </div>
          </form>
          <p>
            belum punya akun? registrasi{" "}
            <Link className="text-[#F42619]" to="/register">
              di sini
            </Link>
          </p>

          {errorMsg && (
            <div className="absolute flex items-center bottom-[20px] w-[540px] px-[18px] py-[8px] rounded-sm mx-30px error px-30px py-8px bg-red-100 text-[#F42619]">
              <p className="w-full">{errorMsg}</p>
              <FiX className="cursor-pointer" onClick={handleCloseError} />
            </div>
          )}
        </div>

        <div className="w-[55%]">
          <img
            className="h-[100vh] w-full object-cover"
            src="/images/illustrasi-Login.png"
            alt="Login Illustration"
          />
        </div>
      </div>
    </>
  );
}

export default Login;
