
const SectionHeader = ({ title }: { title: string }) => {
    return (
        <div className="flex center mb-7 md:mb-14">
            <p className=" small-header md:big-header px-3 border-x-4 border-x-dark-red">{title}</p>
        </div>
    );
};

export default SectionHeader;