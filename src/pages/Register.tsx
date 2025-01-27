import { FormEvent, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { FiAtSign, FiEye, FiEyeOff, FiLock, FiX } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";

function Register() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [successMsg, setSuccessMsg] = useState("");

  const [email, setEmail] = useState("");
  const [namaDepan, setNamaDepan] = useState("");
  const [namaBelakang, setNamaBelakang] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [namaDepanError, setNamaDepanError] = useState("");
  const [namaBelakangError, setNamaBelakangError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (
      !email ||
      !namaDepan ||
      !namaBelakang ||
      !password ||
      !confirmPassword
    ) {
      setEmailError("wajib diisi");
      setLoading(false);

      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("format email tidak valid");
      setLoading(false);

      return;
    }
    if (password.length < 8) {
      setPasswordError("password minimal 8 karakter");
      setLoading(false);

      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("password tidak sama");
      setLoading(false);

      return;
    }

    try {
      const response = await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/registration",
        {
          email: email,
          first_name: namaDepan,
          last_name: namaBelakang,
          password: password,
        }
      );

      if (response.status === 200) {
        setSuccessMsg(response.data.message);

        setEmail("");
        setNamaDepan("");
        setNamaBelakang("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error: any) {
      if (error.response.status == 400) {
        if (error.response.data.message === "Parameter email harus di isi") {
          setEmailError("Email harus di isi");
        } else if (
          error.response.data.message === "Paramter first_name harus di isi"
        ) {
          setNamaDepanError("Nama depan harus di isi");
        } else if (
          error.response.data.message === "Paramter last_name harus di isi"
        ) {
          setNamaBelakangError("Nama belakang harus di isi");
        } else if (
          error.response.data.message === "Paramter password harus di isi"
        ) {
          setPasswordError("Password harus di isi");
        } else if (
          error.response.data.message === "Paramter email tidak sesuai format"
        ) {
          setEmailError("Email tidak sesuai format");
        } else if (error.response.data.message === "Email sudah terdaftar") {
          setEmailError("Email sudah terdaftar");
        } else if (
          error.response.data.message === "Password length minimal 8 karakter"
        ) {
          setPasswordError("Password minimal 8 karakter");
        }
      } else {
        setErrorMsg("terjadi kesalahan pada server");
      }
    }

    setLoading(false);
  };

  const handleCloseWarn = () => {
    setErrorMsg("");
    setSuccessMsg("");
  };

  return (
    <>
      <div className="flex h-[100vh] ">
        <div className="flex flex-col justify-center px-[100px] w-[45%] gap-[40px]  h-[850px]">
          <div className="flex items-center w-full justify-center gap-[8px]">
            <img src="src/assets/images/Logo.png" alt="" />
            <h1 className="font-extrabold">SIMS PPOB</h1>
          </div>
          <p className="font-extrabold text-[40px]/[48px] text-center">
            Lengkapi data untuk membuat akun
          </p>
          <form onSubmit={handleRegister}>
            <div className="flex flex-col gap-[32px] w-full">
              <Input
                label="masukan email anda"
                type="email"
                leadingIcon={
                  <FiAtSign className={`${emailError && "text-[#F42619]"}`} />
                }
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                error={!!emailError}
                feedback={emailError}
                value={email}
              />
              <Input
                label="masukan nama depan"
                type="text"
                leadingIcon={
                  <FaRegUser
                    className={`${namaDepanError && "text-[#F42619]"}`}
                  />
                }
                required
                onChange={(e) => {
                  setNamaDepan(e.target.value);
                  setNamaDepanError("");
                }}
                error={!!namaDepanError}
                feedback={namaDepanError}
                value={namaDepan}
              />
              <Input
                label="masukan nama belakang"
                type="text"
                leadingIcon={
                  <FaRegUser
                    className={`${namaBelakangError && "text-[#F42619]"}`}
                  />
                }
                required
                onChange={(e) => {
                  setNamaBelakang(e.target.value);
                  setNamaBelakangError("");
                }}
                error={!!namaBelakangError}
                feedback={namaBelakangError}
                value={namaBelakang}
              />
              <Input
                label="buat password"
                type={isPasswordVisible ? "text" : "password"}
                leadingIcon={
                  <FiLock className={`${passwordError && "text-[#F42619]"}`} />
                }
                required
                trailingIcon={
                  isPasswordVisible ? (
                    <FiEyeOff onClick={togglePasswordVisibility} />
                  ) : (
                    <FiEye onClick={togglePasswordVisibility} />
                  )
                }
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                error={!!passwordError}
                feedback={passwordError}
                value={password}
              />
              <Input
                label="konfirmasi password"
                type={isConfirmPasswordVisible ? "text" : "password"}
                required
                leadingIcon={
                  <FiLock
                    className={`${confirmPasswordError && "text-[#F42619]"}`}
                  />
                }
                trailingIcon={
                  isConfirmPasswordVisible ? (
                    <FiEyeOff onClick={toggleConfirmPasswordVisibility} />
                  ) : (
                    <FiEye onClick={toggleConfirmPasswordVisibility} />
                  )
                }
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setConfirmPasswordError("");
                }}
                error={!!confirmPasswordError}
                feedback={confirmPasswordError}
                value={confirmPassword}
              />
              <Button lable="Masuk" type="submit" loading={loading} />
            </div>
          </form>
          <p className="text-center">
            sudah punya akun? login{" "}
            <Link className="cursor-pointer text-[#F42619]" to="/login">
              di sini
            </Link>
          </p>
          {errorMsg && (
            <div className="relative -mx-[30px] bg-red-100 text-[#F42619] p-2 rounded-md flex ">
              <div className="w-full">{errorMsg}</div>
              <FiX className="cursor-pointer w-fit" onClick={handleCloseWarn} />
            </div>
          )}
          {successMsg && (
            <div className="relative -mx-[30px] bg-red-100 text-[#F42619] p-2 rounded-md flex ">
              <div className="w-full">{successMsg}</div>
              <FiX className="cursor-pointer w-fit" onClick={handleCloseWarn} />
            </div>
          )}
        </div>

        <div className="w-[55%]">
          <img
            className="h-[850px] w-full object-cover"
            src="src/assets/images/illustrasi%20Login.png"
            alt="Login Illustration"
          />
        </div>
      </div>
    </>
  );
}

export default Register;
