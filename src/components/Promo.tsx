interface promoProps {
  banner_image?: string;
}

function Promo({ banner_image }: promoProps) {
  return (
    <>
      <img src={banner_image} />

      {/* <div className="scrollbar-hide flex gap-[20px] overflow-x-scroll">
          <img src="src/assets/images/Banner 1.png" alt="" />
        </div> */}
    </>
  );
}

export default Promo;
