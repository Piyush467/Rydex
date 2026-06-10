import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PublicHome from "@/components/PublicHome";
import { auth } from "@/auth";
import PartnerDashboard from "@/components/PartnerDashboard";
import AdminDashboard from "@/components/AdminDashboard";
import connectDB from "@/lib/db";
import User from "@/models/user.model";

export default async function Home() {
  const session = await auth();
  
  let role = session?.user?.role;
  
  // Fetch fresh role from database to bypass stale JWT role
  if (session?.user?.email) {
    await connectDB();
    const user = await User.findOne({ email: session.user.email }).select("role");
    if (user) {
      role = user.role;
    }
  }

  return (
    <div className="w-full min-h-screen bg-white">
      
      {role === "partner"
        ? <>
        <Nav />
        <PartnerDashboard />
        </>
        : (
          role === "admin" ? <AdminDashboard /> 
          : <>
          <Nav />
          <PublicHome />
          </>
        )}
      <Footer />
    </div>
  );
}
