//catch all signin routes - acc to clerk docs for customized route

import { SignIn } from "@clerk/nextjs";

const Page = () => {
  return <SignIn />;
};

export default Page;
