import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CategoryIcon from "@mui/icons-material/Category";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DiscountIcon from "@mui/icons-material/Discount";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export const adminRoutes = [
  {
    name: "Add Product",
    path: "/admin/add-product",
    icon: AddCircleOutlineIcon,
  },
  {
    name: "Search",
    path: "/admin/search",
    icon: LocationSearchingIcon,
  },
  {
    name: "Assign Role",
    path: "/admin/assign-role",
    icon: AssignmentIndIcon,
  },
  {
    name: "Add Category",
    path: "/admin/add-category",
    icon: CategoryIcon,
  },
  {
    name: "Orders",
    path: "/admin/orders",
    icon: LocalShippingIcon,
  },
  {
    name: "Sale Events",
    path: "/admin/sale-events",
    icon: DiscountIcon,
  },
  {
    name: "Coupons",
    path: "/admin/coupons",
    icon: AttachMoneyIcon,
  },
];

export const afterBreakRoutes = [{
  name: "Home",
  path: "/",
  icon: HomeIcon,
},]

export const baseUrl = "http://localhost:3001/";
