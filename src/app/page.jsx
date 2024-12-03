import { Suspense } from "react";
import Container from "../components/Container";
import Entertainment from "../components/Entertainment";
import Religion from "../components/Religion";
import Slide from "../components/Slide";
import Sport from "../components/Sport";
import Loading from "./loading";

export default function Home() {

  return (
    <Suspense fallback={<Loading />}>
      <section className="w-full pt-1">
        <Container>
          <Slide />
          <Entertainment />
          <Sport />
          <div className="bg-red-700 mt-4 h-6 w-full SFPro text-2xl text-white font-bold py-6 flex items-center justify-center">
            Sponsor
          </div>
          <Religion />
        </Container>
      </section>
    </Suspense>
  );
}
