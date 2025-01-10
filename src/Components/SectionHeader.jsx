export const SectionHeader = ({ header, subHeader }) => {
  return (
    <>
      <div className="text-center mb-4 border-b-2">
        <h2 className="text-3xl md:text-4xl font-bold font-nunito uppercase text-[rgba(0,18,26)] w-fit mx-auto border-b-2 border-blue-950">{header}</h2>
        <p className="font-heebo text-[rgba(0,18,26,0.7)]">{subHeader}</p>
      </div>
    </>
  );
};
