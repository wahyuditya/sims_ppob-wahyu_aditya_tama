interface servicesProps {
  service_code?: string;
  service_name?: string;
  service_icon?: string;
  service_tariff?: number;
}

function Services({ service_name, service_icon }: servicesProps) {
  return (
    <>
      <div className="w-full flex flex-col justify-start items-center">
        <img src={service_icon} alt="" />
        <p className="text-center">{service_name}</p>
      </div>
    </>
  );
}

export default Services;
