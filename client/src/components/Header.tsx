import React from 'react';

const Header = () => {
    return (
        <header className="grid grid-cols-[auto_auto_auto] p-6 sm:gird-cols-[auto_1fr] gap-6 justify-items-start items-center">
            <div>LOGO</div>
            <div>THIS THE MAIN PART</div>
            <div>THIS IS SECONDARY PART WITH SOME OPTIONS.</div>

        </header>
    );
};

export default Header;