import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import UserIcon from "/icons/user.svg";
import { Link } from "react-router-dom";

const UserDropDown = () => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">
          <img src={UserIcon} alt="User Icon" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" className="bg-primary">
        <DropdownItem key="new" textValue="My Orders">
          <Link to='/my-orders'>My Orders</Link>
        </DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="edit">Edit file</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserDropDown;
