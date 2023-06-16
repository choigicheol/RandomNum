import { useState } from "react";
import { Menu } from "semantic-ui-react";

function NavBar() {
  const [activeItem, setActiveItem] = useState("home");
  return (
    <Menu inverted>
      <Menu.Item
        name="메인"
        active={activeItem === "home"}
        // onClick={this.handleItemClick}
      />
      <Menu.Item
        name="번호생성"
        active={activeItem === "make"}
        // onClick={this.handleItemClick}
      />
      <Menu.Item
        name="과거당첨번호 검색"
        active={activeItem === "search"}
        // onClick={this.handleItemClick}
      />
    </Menu>
  );
}

export default NavBar;
