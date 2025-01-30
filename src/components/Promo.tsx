interface promoProps {
  banner_image?: string;
}

function Promo({ banner_image }: promoProps) {
  return (
    <>
      <img src={banner_image} />
    </>
  );
}

export default Promo;
