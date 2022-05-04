import React, { Component } from "react";
import Router from "next/router";
import {useSession} from "next-auth/client"

export default function Index() {
  const [user,loading] = useSession();
  
 

  React.useEffect(() => {
    const isSuperAdmin = user?.user?.isSuperAdmin;
    if(isSuperAdmin){
    Router.push("/admin/dashboard");
    }else{
    Router.push("/process");
    }
  },[user]);

  return <div />;
}
