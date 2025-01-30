interface NominalCardProps {
  label: string;
}

function NominalCard({ label }: NominalCardProps) {
  return (
    <>
      <div className="flex hover:bg-gray-100 justify-center items-center w-full px-[20px] h-[42px] border-1 border-gray-300 rounded-sm max-md:px-[0px]">
        <p>{label}</p>
      </div>
    </>
  );
}

export default NominalCard;
