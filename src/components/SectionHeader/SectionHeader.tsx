
const SectionHeader = ({ title }: { title: string | undefined }) => {
    return (
        <div className="flex center my-10 md:my-20">
            <p className=" small-header md:big-header px-3 border-x-4 border-x-dark-red">{title}</p>
        </div>
    );
};

export default SectionHeader;