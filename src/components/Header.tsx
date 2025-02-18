import quizyLogo from '../assets/quizy-logo.png';

const Header = () => {
    return (
        <header className="sticky top-0 left-0 right-0 p-2 sm:p-4 z-50">
            <div className="flex justify-center items-center">
                <img 
                    src={quizyLogo} 
                    alt="Quizy Logo" 
                    className="h-20 w-20 sm:h-32 sm:w-32"
                />
            </div>
        </header>
    );
};

export default Header; 