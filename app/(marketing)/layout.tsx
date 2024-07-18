import Header from "@/app/(marketing)/header";
import Footer from "@/app/(marketing)/footer";

interface MarketingLayoutProps {
  children?: React.ReactNode;
}

const MarketingLayout = ({children}: MarketingLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center">
        {children}
      </div>
      <Footer />
    </div>
  )
};

export default MarketingLayout
