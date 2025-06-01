import { ConnectButton } from "@rainbow-me/rainbowkit";
import Header from "../component/Header";
import DappDashboard from "@/component/DappDashboard";
import UserDashboard from "@/component/UserDashboard";

export default function Home() {
  return(
    <div>
      <UserDashboard 
      />
      {/* <DappDashboard
      /> */}
    </div>
  );
}