import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import DocumentsResult from "@/components/DocumentsResult";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen font-sans">
      <Sidebar />
      <main className="flex flex-1 flex-col min-w-0">
        <Header/>
        <DocumentsResult />
        <Footer/>
      </main>
    </div>
  );
}
