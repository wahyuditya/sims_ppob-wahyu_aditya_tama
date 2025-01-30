interface servicesProps {
  service_code?: string;
  service_name?: string;
  service_icon?: string;
  service_tariff?: number;
  onClick?: () => void;
}

function Services({ service_name, service_icon, onClick }: servicesProps) {
  return (
    <>
      <div
        onClick={onClick}
        className=" flex flex-col justify-start items-center"
      >
        <img
          src={service_icon}
          alt={service_icon}
          className="w-[80px] h-[80px] object-contain"
        />
        <p className="text-center mt-2 w-[98px]">{service_name}</p>
      </div>
    </>
  );
}

export default Services;
