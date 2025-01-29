import { HiPencil } from "react-icons/hi";
import Input from "../components/Input";
import Button from "../components/Button";
import { FiAtSign } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { persistor } from "../redux/store";
import { useState } from "react";
import { RootState } from "../redux/store";
import axios from "axios";
import { login } from "../redux/slices/authSlice";

function Akun() {
  const [isEdit, setIsEdit] = useState(false);

  const currentUserState = useSelector((state: RootState) => state.auth.user);

  const email = currentUserState?.email;
  const firstName = currentUserState?.firstName;
  const lastName = currentUserState?.lastName;
  const profileImg = currentUserState?.profilePhoto;

  const [updateImgProfileError, setUpdateImgProfileError] = useState("");
  const [tempProfileImg, setTempProfileImg] = useState(
    profileImg || "images/Profile-Photo.png"
  );

  const [tempFirstName, setTempFirstName] = useState(firstName);
  const [tempLastName, setTempLastName] = useState(lastName);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEdit = async () => {
    try {
      const updateProfileResponse = await axios.put(
        "https://take-home-test-api.nutech-integrasi.com/profile/update",
        {
          first_name: tempFirstName,
          last_name: tempLastName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      if (updateProfileResponse.status == 200) {
        dispatch(
          login({
            token: String(localStorage.getItem("jwtToken")),
            user: {
              ...currentUserState,
              firstName: tempFirstName,
              lastName: tempLastName,
            },
          })
        );
      }
    } catch (e: any) {
      console.log(e);
    }

    setIsEdit(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    persistor.purge();
    dispatch(logout());

    navigate("/login");
  };

  const handleProfileImgUpdate = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Check file size (max 100KB)
      if (file.size > 100 * 1024) {
        setUpdateImgProfileError("Ukuran file maksimim 100kb");

        return;
      }

      // Check file type (only JPEG and PNG)
      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        setUpdateImgProfileError("Format yang diterima hanya JPEG dan PNG");

        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const updteProfileimgResponse = await axios.put(
          "https://take-home-test-api.nutech-integrasi.com/profile/image",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
              "Content-Type": "multipart/form-data",
              accept: "application/json",
            },
          }
        );

        if (updteProfileimgResponse.status === 200) {
          const newProfileImg = updteProfileimgResponse.data.data.profile_image;
          setTempProfileImg(newProfileImg);

          dispatch(
            login({
              token: String(localStorage.getItem("jwtToken")),
              user: {
                ...currentUserState,
                profilePhoto: newProfileImg,
              },
            })
          );
          setUpdateImgProfileError("");
        } else {
          setUpdateImgProfileError("Terjadi kesalahan, mohon coba lagi");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="flex px-[300px] flex-col gap-[68px] my-[8px]">
        <div className="flex justify-center items-center flex-col gap-[8px]">
          <div className="relative inline-block">
            <label htmlFor="profileImgUpdate" className="cursor-pointer">
              <img
                src={tempProfileImg}
                alt="Profile"
                className="w-36 h-36 rounded-full"
              />
              <div className="absolute rounded-full border-1 bottom-0 right-0 bg-white p-1">
                <HiPencil />
              </div>
            </label>
            <input
              id="profileImgUpdate"
              type="file"
              accept="image/jpeg, image/png"
              className="hidden"
              onChange={handleProfileImgUpdate}
            />
          </div>

          <div>
            <p className="text-[32px] font-extrabold">{`${firstName} ${lastName}`}</p>
          </div>
        </div>
        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[8px]">
            <p>Email</p>
            <Input
              label=""
              type="text"
              leadingIcon={<FiAtSign />}
              disabled
              value={email}
            />
          </div>

          <div className="flex flex-col gap-[8px]">
            <p>Nama Depan</p>
            <Input
              label=""
              type="text"
              leadingIcon={<FaRegUser />}
              disabled={!isEdit}
              value={tempFirstName}
              onChange={(e) => setTempFirstName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-[8px]">
            <p>Nama Belakang</p>
            <Input
              label="Aditya Tama"
              type="text"
              leadingIcon={<FaRegUser />}
              disabled={!isEdit}
              value={tempLastName}
              onChange={(e) => setTempLastName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[28px]">
            {isEdit ? (
              <>
                <Button lable="Simpan" onClick={handleEdit} />
                <Button
                  lable="Batalkan"
                  secondary
                  onClick={() => setIsEdit(!isEdit)}
                />
              </>
            ) : (
              <>
                <Button
                  lable="Edit"
                  secondary
                  onClick={() => setIsEdit(!isEdit)}
                />
                <Button lable="Logout" onClick={handleLogout} />
              </>
            )}
          </div>
        </div>
      </div>
      {updateImgProfileError}
    </>
  );
}

export default Akun;
