import { useNavigate } from "react-router";
import Userlist from "../components/Userlist";
import FriendRequestlist from "../components/FriendRequestlist";

const Home = () => {
  return (
    <div className="grid grid-cols-3   w-full h-[1000px]">
    <FriendRequestlist/>
    <Userlist/>
    </div>
  );
};

export default Home;
