import React, { useState } from 'react'
import NavigationMenu from './NavigationMenu'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'


function CompanyDashboard() {
    const { theme } = useSelector((state) => state.theme)

    return (
        <div className="w-full h-full min-h-[85vh] ">
            <div className="lg:hidden   top-0 z-50  p-2">
                <NavigationMenu />
            </div>

            <div className="hidden lg:flex w-full h-full p-4 gap-4 ">
                {/* Desktop Navigation Sidebar */}
                <div className={`w-1/3 min-w-0 flex-shrink-0  border  rounded-lg 
                ${theme == "dark" ? "border-gray-700" : "border-gray-300"}
                   `} >
                    <NavigationMenu />
                </div>

                {/* Desktop Main Content */}
                <div className="w-2/3 min-w-0  flex-1 ">
                    <div className={`w-full max-h-screen overflow-scroll  gap-4 border rounded-lg
                        ${theme == "dark" ? "border-gray-700" : "border-gray-300"}
                        `}>
                        <Outlet />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CompanyDashboard
