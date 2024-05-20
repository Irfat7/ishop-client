import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import UserIcon from "/icons/user.svg";
import { Link } from "react-router-dom";
import { useAdminVerify } from "../../hooks/useAdminVerify";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";

const UserDropDown = () => {
  const { user } = useAuthContext()
  const [admin] = useAdminVerify(user?.email || '')
  const { logOut } = useLogout()
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">
          <img src={UserIcon} alt="User Icon" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" className="bg-primary">
        {
          admin && <DropdownItem key="admin" textValue="Admin Dashboard">
            <Link to='/admin'>Admin Dashboard</Link>
          </DropdownItem>
        }
        <DropdownItem key="myOrders" textValue="My Orders">
          <Link to='/my-orders'>My Orders</Link>
        </DropdownItem>
        <DropdownItem key="myReviews" textValue="My Reviews">
          <Link to='/my-reviews'>My Reviews</Link>
        </DropdownItem>
        <DropdownItem key="logout" textValue="Log-out" onClick={() => logOut()}>
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserDropDown;
