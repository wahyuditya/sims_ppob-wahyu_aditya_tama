import Services from "../components/Services";
import Promo from "../components/Promo";
import UserInfo from "../components/UserInfo";
import { useEffect, useState } from "react";
import axios from "axios";
import { login } from "../redux/slices/authSlice";
import { setServices } from "../redux/slices/servicesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setBanners } from "../redux/slices/bannerSlice";

import { useNavigate } from "react-router-dom";
import { setSelectedService } from "../redux/slices/selectedServiceSlice";

function Home() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const token = localStorage.getItem("jwtToken");
  const services = useSelector((state: RootState) => state.services.services);
  const banners = useSelector((state: RootState) => state.banners.banners);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileResponse = await axios.get(
          "https://take-home-test-api.nutech-integrasi.com/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }
        );

        const balanceResponse = await axios.get(
          "https://take-home-test-api.nutech-integrasi.com/balance",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }
        );

        const servicesResponse = await axios.get(
          "https://take-home-test-api.nutech-integrasi.com/services",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }
        );

        const bannerResponse = await axios.get(
          "https://take-home-test-api.nutech-integrasi.com/banner",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }
        );

        const user = {
          email: profileResponse.data.data.email,
          firstName: profileResponse.data.data.first_name,
          lastName: profileResponse.data.data.last_name,
          profilePhoto: profileResponse.data.data.profile_image,
        };

        const balanceData = balanceResponse.data.data.balance;

        dispatch(
          login({
            token: String(token),
            user: {
              firstName: user.firstName,
              lastName: user.lastName,
              profilePhoto: user.profilePhoto,
            },
            balance: balanceData,
          })
        );

        dispatch(setServices({ services: servicesResponse.data.data }));

        dispatch(setBanners({ banners: bannerResponse.data.data }));

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [token, dispatch]);

  // Show loading spinner or placeholder while fetching
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <svg
          className="animate-spin h-5 w-5 ml-3 text-[#F42619]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
      </div>
    );
  }

  const handlePayment = (
    serviceCode: string,
    serviceName: string,
    serviceIcon: string,
    serviceTarif: number
  ) => {
    dispatch(
      setSelectedService({
        service_code: serviceCode,
        service_name: serviceName,
        service_icon: serviceIcon,
        service_tariff: serviceTarif,
      })
    );

    navigate("/pembayaran");
  };

  return (
    <>
      <div className=" flex px-[100px] flex-col gap-[68px] my-[20px]">
        <UserInfo />

        <div className="flex flex-row gap-[8px] w-full cursor-pointer">
          {services.map((service, index) => (
            <Services
              key={index}
              service_code={service.service_code}
              service_name={service.service_name}
              service_icon={service.service_icon}
              onClick={() =>
                handlePayment(
                  service.service_code,
                  service.service_name,
                  service.service_icon,
                  service.service_tariff
                )
              }
            />
          ))}
        </div>

        <div className="flex flex-col gap-[20px]">
          <p className="text-[20px] font-bold">Temukan promo menarik</p>
          <div className="scrollbar-hide flex gap-[20px] overflow-x-scroll">
            {banners.map((banner, index) => (
              <Promo key={index} banner_image={banner.banner_image} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
