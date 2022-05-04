import Header from "./header";
import Sidebar from "./sidebar";

const Layout = ({ children }) => {
  // const styles = {
  //     display: "flex",
  //     flexDirection: "row",
  //     marginLeft:"100px",
  //     marginTop:"-100px"
  //   };
  return (
    <>
      <Header />
      <div style={{ display: "flex", marginLeft: "250px" }}>
        <div className="row">
          <div className="col-6">
            <Sidebar />
          </div>
        </div>

        <main style={{ width: "100%" }}>
          <section>{children}</section>
        </main>
      </div>
    </>
  );
};

export default Layout;
