const SectionHeader = ({ title }: { title: string | undefined }) => {
  return (
    <div className="center my-10 flex md:my-20">
      <p className="small-header md:big-header border-x-4 border-x-dark-red px-3 capitalize">
        {title}
      </p>
    </div>
  );
};

export default SectionHeader;
