import React from "react";
import menu from "../../assets/img/menu.svg";
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openNav: false,
      navs: [
        {
          name: "Home",
          to: "#",
          alignLeft: true,
        },
        {
          name: "About",
          to: "#",
          alignLeft: false,
        },
        {
          name: "Dashboard",
          to: "#",
          alignLeft: true,
        },
        {
          name: "Profile",
          to: "#",
          alignLeft: false,
        },
      ],
    };
  }
  render() {
    return (
      <div className="m-0 p-0 overflow-hidden bg-gray-400 shadow-lg sticky top-0">
        <div className="flex flex-col sm:block">
          <div className="float-left">
            <div className="flex items-center">
              <div className="hidden sm:block px-4">
                <img
                  src="https://www.flaticon.com/svg/static/icons/svg/2734/2734227.svg"
                  className="w-12 h-12"
                  alt="lgo"
                />
              </div>
              <div
                className="block sm:hidden px-4 cursor-pointer"
                onClick={() => this.setState({ openNav: !this.state.openNav })}
              >
                <img src={menu} className="w-4" alt="menu" />
              </div>
              <div className="block text-center pl-2 pr-8 py-2 font-bold text-xl sm:text-2xl">
                Website Header
              </div>
            </div>
          </div>
          <div
            className={`${
              this.state.openNav ? "flex " : "hidden"
            } sm:block flex-col justify-center`}
          >
            {this.state.navs.map((navitem, index) => (
              <div
                key={index}
                className={navitem.alignLeft ? "float-left" : "float-right"}
              >
                <a
                  className="block text-center p-4 no-underline hover:bg-red-500 hover:text-white"
                  href={navitem.to}
                >
                  {navitem.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
