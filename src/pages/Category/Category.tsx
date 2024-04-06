import { useParams } from "react-router-dom";
import SectionHeader from "../../components/SectionHeader/SectionHeader";

const Category = () => {
    const { categoryName } = useParams()
    return (
        <div>
            <SectionHeader title={categoryName}/>
        </div>
    );
};

export default Category;