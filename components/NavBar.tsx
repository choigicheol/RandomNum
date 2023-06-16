import { useState } from "react";
import { useRouter } from "next/router";
import { Menu } from "semantic-ui-react";

function NavBar() {
  const [activeItem, setActiveItem] = useState("home");
  const router = useRouter();
  const handleNavigation = (uri: string) => {
    router.push(uri);
  };
  return (
    <Menu inverted>
      <Menu.Item name="메인" onClick={() => handleNavigation("/")} />
      <Menu.Item
        name="번호생성"
        onClick={() => handleNavigation("production")}
      />
      <Menu.Item
        name="과거당첨번호 검색"
        onClick={() => handleNavigation("search")}
      />
    </Menu>
  );
}

export default NavBar;
