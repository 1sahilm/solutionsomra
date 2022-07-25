import React from 'react';

import { useSession } from 'next-auth/client';
import Router from 'next/router';

export default function Index() {
  const [user, loading] = useSession();

  React.useEffect(() => {
    const isSuperAdmin = user?.user?.isSuperAdmin;
    if (isSuperAdmin) {
      Router.push("/admin/dashboard");
    } else {
      Router.push("/process");
    }
  }, [user]);

  return <div />;
}
