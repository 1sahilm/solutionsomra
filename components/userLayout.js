import Header from "./header";
import Sidebar from "./sidebar";
import UserSidebar from "./userSidebar";

const UserLayout = ({ children }) => {
  // const styles = {
  //     display: "flex",
  //     flexDirection: "row",
  //     marginLeft:"100px",
  //     marginTop:"-100px"
  //   };
  return (
    <>
      <Header />
      <div style={{ display: "flex", marginLeft: "300px" ,marginTop:"10px"}}>
        <div className="row">
          <div className="col-6">
            <UserSidebar />
          </div>
        </div>

        <main style={{ width: "100%" }}>
          <section>{children}</section>
        </main>
      </div>
    </>
  );
};

export default UserLayout;
