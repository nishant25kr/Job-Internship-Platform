import { useSelector } from "react-redux";
import NavigationMenu from "./NavigationMenu";
import { Link, Outlet } from "react-router-dom";
import EmptyState from "../EmptyState";


function Profile() {
    const { user } = useSelector((state) => state.auth)

    if(!user){
        return(
            <EmptyState />
        )
    }

    return (
        <div className="w-full h-full min-h-screen">
            {/* Mobile Navigation - Fixed at top */}
            <div className="lg:hidden  top-0 z-50  p-2">
                <NavigationMenu />
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex w-full h-full p-4 gap-4 ">
                {/* Desktop Navigation Sidebar */}
                <div className="w-1/3 min-w-0 flex-shrink-0 p-2  rounded-lg">
                    <NavigationMenu />
                </div>

                {/* Desktop Main Content */}
                <div className="w-2/3 min-w-0 flex-1 p-2">
                    <div className="w-full h-full gap-4">
                        <Outlet />
                    </div>
                </div>
            </div>

            {/* Mobile Content - Full width */}
            <div className="lg:hidden w-full p-2">
                <div className="w-full gap-4">
                    <Outlet />
                </div>
            </div>
        </div>


    )
}


export default Profile;