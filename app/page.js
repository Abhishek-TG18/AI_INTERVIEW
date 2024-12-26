import { Button } from "/components/ui/button";
import Image from "next/image";

export default function Home() {
  console.log('DB URL:', process.env.NEXT_PUBLIC_DRIZZLE_DB_URL);

  return (
    <>


   <div> hI</div>
   <Button> Go to localhost:3000/dashboard</Button>
   </>
  );
}
