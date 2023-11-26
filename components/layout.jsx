import Head from "next/head";
import SideNav from "./side-nav";

export default function Layout({ children }) {
    return (
      <div className="section">
        <Head>
          <link rel="icon" href="/logo1.svg" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#ffffff" />
          <meta
            name="description"
            content="Licence plate recognition ."
          />
        </Head>
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideNav />
          </div>
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
      </div>
    );
}