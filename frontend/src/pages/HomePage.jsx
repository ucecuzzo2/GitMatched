import Header from '../components/Header';
import Footer from '../components/Footer';
//import pic1 from '../assets/pic1.png'; // Adjust the path to where pic1.png is located

const HomePage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow p-4">
                <h2 className="text-xl">Welcome to the Home Page</h2>
                <p>This is where your content will go.</p>
                
                
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
