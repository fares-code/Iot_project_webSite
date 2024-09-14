import React from 'react';
import Header from './Headers.js';
import Sidebar from './SideBar.js';
import  { Toaster } from 'react-hot-toast';
export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="d-flex">
        {/* Sidebar */}
        <div  style={{color:"#2c2c2c"}} className="sidebar-container">
          <Sidebar />
        </div>
        
        {/* Main Content */}
        <main className="content-container main p-4" style={{ flexGrow: 1 }}>
          {children}
                 <Toaster/>

        </main>
      </div>
    </>
  );
}
