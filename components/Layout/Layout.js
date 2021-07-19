import Nav from "../Nav/Nav";

const Layout = (props) => {
  return (
    <div>
      <Nav />
      {props.children}
    </div>
  );
};

export default Layout;
