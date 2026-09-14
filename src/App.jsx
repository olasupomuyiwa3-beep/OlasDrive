
import { useState } from "react";
import "./App.css";

const cars = [
  {
    name: "Toyota Camry",
    year: "2013",
    transmission: "Automatic",
    location: "Port Harcourt, Nigeria",
    price: "₦12,000,000",
    condition: "Foreign Used, Everything working perfectly",
    images: [
      "/images/Toyota Camry 2013.jpeg",
      "/images/PICTURE 2 TC.jpeg",
      "/images/Pic 3 TC.jpeg",
      "/images/PIC 4TC.jpeg",
    ],
  },
  {
    name: "Lexus RX 350",
    year: "2018",
    transmission: "Automatic",
    location: "Port Harcourt, Nigeria",
    price: "₦30,000,000",
    condition: "Foreign Used, Everything working perfectly",
    images: [
      "/images/Lexus RX350.jpeg",
      "/images/Lexusrx3501.jpeg",
      "/images/Lexusrx3502.jpeg",
      "/images/Lexusrx3503.jpeg",
    ],
  },
  {
    name: "Mercedes-Benz C300",
    year: "2015",
    transmission: "Automatic",
    location: "Port Harcourt, Nigeria",
    price: "₦19,000,000",
    condition: "Foreign Used, Everything working perfectly",
    images: [
      "/images/Benc300.jpeg",
      "/images/Benc3002.jpeg",
      "/images/Benc3003.jpeg",
      "/images/Benc3004.jpeg",
    ],
  },
];

function CarCard({ car, onViewDetails, requireSignIn }) {
  const [activeImage, setActiveImage] = useState(0);
  const [saved, setSaved] = useState(false);

  return (
    <article className="car-card">
      <div className="main-car-image">
        <img
          src={car.images[activeImage]}
          alt={`${car.name} view ${activeImage + 1}`}
        />

        <div className="image-badges">
          <span className="condition-badge">
            {car.condition}
          </span>
        </div>

        <button
          className={`favorite ${saved ? "saved" : ""}`}
          onClick={() =>
            requireSignIn(() => setSaved(!saved))
          }
          aria-label="Save car"
        >
          {saved ? "♥" : "♡"}
        </button>

        <div className="image-count">
          📷 {car.images.length} photos
        </div>
      </div>

      <div className="thumbnail-row">
        {car.images.map((image, index) => (
          <button
            className={`thumbnail ${
              activeImage === index ? "active" : ""
            }`}
            key={image}
            onClick={() =>
              requireSignIn(() => setActiveImage(index))
            }
            aria-label={`View ${car.name} photo ${index + 1}`}
          >
            <img src={image} alt="" />
          </button>
        ))}
      </div>

      <div className="car-details">
        <div className="car-meta">
          <span>{car.year}</span>
          <span>•</span>
          <span>{car.transmission}</span>
        </div>

        <h3>{car.name}</h3>

        <p className="car-location">
          📍 {car.location}
        </p>

        <div className="price-row">
          <div>
            <small>Price</small>
            <strong>{car.price}</strong>
          </div>

          <button
            className="details-button"
            onClick={() =>
              requireSignIn(() => onViewDetails(car))
            }
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  );
}

function App() {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState("");

  // SIGN IN
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [searchPerformed, setSearchPerformed] = useState(false);

  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);

  // CONTACT SELLER
  const [buyerName, setBuyerName] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [buyerMessage, setBuyerMessage] = useState("");

  // SELL CAR
  const [showSellForm, setShowSellForm] = useState(false);
  const [sellerName, setSellerName] = useState("");
  const [sellerPhone, setSellerPhone] = useState("");
  const [carName, setCarName] = useState("");
  const [carYear, setCarYear] = useState("");
  const [carPrice, setCarPrice] = useState("");
  const [carLocation, setCarLocation] = useState("");
  const [carCondition, setCarCondition] = useState("");

  // PROTECT ACTIONS
  const requireSignIn = (action) => {
    if (!isSignedIn) {
      setShowSignIn(true);
      return;
    }

    action();
  };

  // SEARCH RESULTS
  const filteredCars = cars.filter((car) => {
    const matchesMake =
      !make ||
      car.name.toLowerCase().includes(make.toLowerCase());

    const matchesModel =
      !model ||
      car.name.toLowerCase().includes(model.toLowerCase());

    const matchesLocation =
      !location ||
      car.location.toLowerCase().includes(location.toLowerCase());

    let matchesBudget = true;

    const price = parseInt(
      car.price.replace(/[₦,]/g, ""),
      10
    );

    if (budget === "under10") {
      matchesBudget = price < 10000000;
    }

    if (budget === "10to20") {
      matchesBudget =
        price >= 10000000 && price <= 20000000;
    }

    if (budget === "20to50") {
      matchesBudget =
        price > 20000000 && price <= 50000000;
    }

    if (budget === "50plus") {
      matchesBudget = price > 50000000;
    }

    return (
      matchesMake &&
      matchesModel &&
      matchesLocation &&
      matchesBudget
    );
  });

  // SEARCH
  const handleSearch = () => {
    setSearchPerformed(true);

    document
      .getElementById("cars")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // VIEW DETAILS
  const handleViewDetails = (car) => {
    setSelectedCar(car);
    setSelectedImage(0);

    setTimeout(() => {
      document
        .getElementById("car-details")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // SIGN IN
  const handleSignIn = () => {
    if (!signInEmail || !signInPassword) {
      alert("Please enter your email and password.");
      return;
    }

    setIsSignedIn(true);
    setShowSignIn(false);

    setSignInEmail("");
    setSignInPassword("");
  };

  return (
    <div className="app">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">
          Olas<span>Drive</span>
        </div>

        <nav className="nav-links">
          <a
            href="#"
            className="active"
            onClick={(e) => {
              e.preventDefault();

              requireSignIn(() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              });
            }}
          >
            Home
          </a>

          <a
            href="#cars"
            onClick={(e) => {
              e.preventDefault();

              requireSignIn(() => {
                document
                  .getElementById("cars")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              });
            }}
          >
            Buy a Car
          </a>

          <a
            href="#sell"
            onClick={(e) => {
              e.preventDefault();

              requireSignIn(() => {
                document
                  .getElementById("sell")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              });
            }}
          >
            Sell a Car
          </a>

          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();

              requireSignIn(() => {
                document
                  .getElementById("about")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              });
            }}
          >
            About
          </a>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();

              requireSignIn(() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              });
            }}
          >
            Contact
          </a>
        </nav>

        <button
          className="sign-in"
          onClick={() => setShowSignIn(true)}
        >
          {isSignedIn ? "Signed In" : "Sign In"}
        </button>
      </header>

      {/* HERO */}
      <main>
        <section className="hero">
          <div className="hero-overlay"></div>

          <div className="hero-content">
            <div className="trust-badge">
              ✓ Trusted Car Marketplace
            </div>

            <p className="hero-small">
              FIND YOUR NEXT CAR
            </p>

            <h1>
              Find the right car
              <br />
              <span>
                for your next journey.
              </span>
            </h1>

            <p className="hero-description">
              Discover quality vehicles from trusted sellers.
              Compare cars, explore prices and find a vehicle
              that fits your needs.
            </p>

            <div className="hero-buttons">
              <button
                onClick={() =>
                  requireSignIn(() =>
                    document
                      .getElementById("cars")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  )
                }
              >
                Browse Cars
              </button>

              <span>→</span>

              <button
                onClick={() =>
                  requireSignIn(() =>
                    document
                      .getElementById("sell")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  )
                }
              >
                Sell Your Car
              </button>
            </div>

            <div className="hero-stats">
              <div>
                <strong>500+</strong>
                <span>Cars Listed</span>
              </div>

              <div>
                <strong>100+</strong>
                <span>Trusted Sellers</span>
              </div>

              <div>
                <strong>24/7</strong>
                <span>Support</span>
              </div>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="/images/Benz C400.jpeg"
              alt="Benz C400"
            />
          </div>
        </section>

        {/* SEARCH */}
        <section className="search-container">
          <div className="search-heading">
            <h2>
              Search for your next car
            </h2>

            <p>
              Find the vehicle that matches your
              budget and preference.
            </p>
          </div>

          <div className="search-box">
            <div className="search-field">
              <label>Make</label>

              <select
                value={make}
                onChange={(e) =>
                  setMake(e.target.value)
                }
              >
                <option value="">
                  Select make
                </option>

                <option value="Toyota">
                  Toyota
                </option>

                <option value="Lexus">
                  Lexus
                </option>

                <option value="Mercedes-Benz">
                  Mercedes-Benz
                </option>

                <option value="BMW">
                  BMW
                </option>

                <option value="Honda">
                  Honda
                </option>
              </select>
            </div>

            <div className="search-field">
              <label>Model</label>

              <select
                value={model}
                onChange={(e) =>
                  setModel(e.target.value)
                }
              >
                <option value="">
                  Select model
                </option>

                <option value="Camry">
                  Camry
                </option>

                <option value="RX 350">
                  RX 350
                </option>

                <option value="C300">
                  C300
                </option>
              </select>
            </div>

            <div className="search-field">
              <label>Budget</label>

              <select
                value={budget}
                onChange={(e) =>
                  setBudget(e.target.value)
                }
              >
                <option value="">
                  Any price
                </option>

                <option value="under10">
                  Under ₦10m
                </option>

                <option value="10to20">
                  ₦10m - ₦20m
                </option>

                <option value="20to50">
                  ₦20m - ₦50m
                </option>

                <option value="50plus">
                  ₦50m+
                </option>
              </select>
            </div>

            <div className="search-field">
              <label>Location</label>

              <select
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
              >
                <option value="">
                  Any location
                </option>

                <option value="Lagos">
                  Lagos
                </option>

                <option value="Abuja">
                  Abuja
                </option>

                <option value="Port Harcourt">
                  Port Harcourt
                </option>

                <option value="Rivers State">
                  Rivers State
                </option>
              </select>
            </div>

            <button
              className="search-button"
              onClick={() =>
                requireSignIn(handleSearch)
              }
            >
              <span>⌕</span>
              Search
            </button>
          </div>
        </section>

        {/* FEATURED CARS */}
        <section
          className="featured"
          id="cars"
        >
          <div className="section-header">
            <div>
              <p className="section-label">
                FEATURED VEHICLES
              </p>

              <h2>
                Top Picks for You
              </h2>

              <p className="section-description">
                Quality vehicles from sellers you can trust.
              </p>
            </div>

            <button
              className="view-all"
              onClick={() =>
                requireSignIn(() => {
                  setMake("");
                  setModel("");
                  setBudget("");
                  setLocation("");
                  setSearchPerformed(false);
                })
              }
            >
              View all cars →
            </button>
          </div>

          <div className="car-grid">
            {(searchPerformed
              ? filteredCars
              : cars
            ).map((car) => (
              <CarCard
                key={car.name}
                car={car}
                onViewDetails={handleViewDetails}
                requireSignIn={requireSignIn}
              />
            ))}
          </div>

          {searchPerformed &&
            filteredCars.length === 0 && (
              <div className="no-results">
                <h3>
                  No cars found
                </h3>

                <p>
                  Try changing your search filters
                  and search again.
                </p>
              </div>
            )}
        </section>

        {/* CAR DETAILS */}
        {selectedCar && (
          <section
            className="car-details-page"
            id="car-details"
          >
            <button
              className="back-button"
              onClick={() => {
                setSelectedCar(null);
                setSelectedImage(0);
              }}
            >
              ← Back to Cars
            </button>

            <div className="details-layout">
              {/* IMAGES */}
              <div className="details-images">
                <img
                  className="details-main-image"
                  src={
                    selectedCar.images[selectedImage]
                  }
                  alt={selectedCar.name}
                />

                <div className="details-thumbnails">
                  {selectedCar.images.map(
                    (image, index) => (
                      <button
                        key={image}
                        type="button"
                        className={`details-thumbnail ${
                          selectedImage === index
                            ? "active"
                            : ""
                        }`}
                        onClick={() =>
                          setSelectedImage(index)
                        }
                        aria-label={`View ${selectedCar.name} photo ${
                          index + 1
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${selectedCar.name} ${
                            index + 1
                          }`}
                        />
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* DETAILS INFORMATION */}
              <div className="details-info">
                <span className="details-condition">
                  {selectedCar.condition}
                </span>

                <h2>
                  {selectedCar.name}
                </h2>

                <p className="details-location">
                  📍 {selectedCar.location}
                </p>

                <div className="details-price">
                  <small>
                    Price
                  </small>

                  <strong>
                    {selectedCar.price}
                  </strong>
                </div>

                <div className="specifications">
                  <div>
                    <span>
                      Year
                    </span>

                    <strong>
                      {selectedCar.year}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Transmission
                    </span>

                    <strong>
                      {selectedCar.transmission}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Condition
                    </span>

                    <strong>
                      {selectedCar.condition}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Location
                    </span>

                    <strong>
                      {selectedCar.location}
                    </strong>
                  </div>
                </div>

                <button
                  className="contact-seller"
                  onClick={() =>
                    requireSignIn(() =>
                      setShowContactForm(true)
                    )
                  }
                >
                  Contact Seller
                </button>
              </div>
            </div>

            {/* CONTACT FORM */}
            {showContactForm && (
              <div className="contact-form-container">
                <div className="contact-form">
                  <button
                    className="close-contact"
                    onClick={() =>
                      setShowContactForm(false)
                    }
                  >
                    ×
                  </button>

                  <p className="section-label">
                    CONTACT SELLER
                  </p>

                  <h2>
                    Interested in this car?
                  </h2>

                  <p className="contact-description">
                    Send the seller a message about the{" "}
                    <strong>
                      {selectedCar.name}
                    </strong>.
                  </p>

                  <input
                    type="text"
                    placeholder="Your name"
                    value={buyerName}
                    onChange={(e) =>
                      setBuyerName(e.target.value)
                    }
                  />

                  <input
                    type="tel"
                    placeholder="Your phone number"
                    value={buyerPhone}
                    onChange={(e) =>
                      setBuyerPhone(e.target.value)
                    }
                  />

                  <textarea
                    placeholder={`I'm interested in the ${selectedCar.name}. Is it still available?`}
                    rows="5"
                    value={buyerMessage}
                    onChange={(e) =>
                      setBuyerMessage(e.target.value)
                    }
                  ></textarea>

                  <button
                    className="send-inquiry"
                    onClick={() => {
                      if (
                        !buyerName ||
                        !buyerPhone ||
                        !buyerMessage
                      ) {
                        alert(
                          "Please fill in all the fields."
                        );
                        return;
                      }

                      const message = `Hello, I am interested in the ${selectedCar.name} listed on OlasDrive.

Name: ${buyerName}
Phone: ${buyerPhone}

Message:
${buyerMessage}`;

                      const whatsappNumber =
                        "2348065356943";

                      const whatsappLink =
                        `https://wa.me/${whatsappNumber}?text=` +
                        encodeURIComponent(message);

                      window.open(
                        whatsappLink,
                        "_blank"
                      );
                    }}
                  >
                    Send Inquiry
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {/* SELL CTA */}
        <section
          className="sell-section"
          id="sell"
        >
          <div>
            <p className="section-label">
              SELL WITH OlasDrive
            </p>

            <h2>
              Have a car to sell?
            </h2>

            <p>
              Put your vehicle in front of serious
              buyers and reach more people with OlasDrive.
            </p>
          </div>

          <button
            onClick={() =>
              requireSignIn(() =>
                setShowSellForm(true)
              )
            }
          >
            List Your Car →
          </button>
        </section>

        {/* SELL FORM */}
        {showSellForm && (
          <section className="sell-form-section">
            <div className="sell-form">
              <button
                className="close-sell-form"
                onClick={() =>
                  setShowSellForm(false)
                }
              >
                ×
              </button>

              <p className="section-label">
                LIST YOUR CAR
              </p>

              <h2>
                Sell your car with OlasDrive
              </h2>

              <p>
                Fill in your car details and send the
                listing directly to our WhatsApp.
              </p>

              <input
                type="text"
                placeholder="Your name"
                value={sellerName}
                onChange={(e) =>
                  setSellerName(e.target.value)
                }
              />

              <input
                type="tel"
                placeholder="Your phone number"
                value={sellerPhone}
                onChange={(e) =>
                  setSellerPhone(e.target.value)
                }
              />

              <input
                type="text"
                placeholder="Car make and model"
                value={carName}
                onChange={(e) =>
                  setCarName(e.target.value)
                }
              />

              <input
                type="text"
                placeholder="Year"
                value={carYear}
                onChange={(e) =>
                  setCarYear(e.target.value)
                }
              />

              <input
                type="text"
                placeholder="Price e.g. ₦15,000,000"
                value={carPrice}
                onChange={(e) =>
                  setCarPrice(e.target.value)
                }
              />

              <input
                type="text"
                placeholder="Location"
                value={carLocation}
                onChange={(e) =>
                  setCarLocation(e.target.value)
                }
              />

              <textarea
                placeholder="Describe the condition of the car"
                rows="5"
                value={carCondition}
                onChange={(e) =>
                  setCarCondition(e.target.value)
                }
              ></textarea>

              <button
                className="submit-listing"
                onClick={() => {
                  if (
                    !sellerName ||
                    !sellerPhone ||
                    !carName ||
                    !carYear ||
                    !carPrice ||
                    !carLocation ||
                    !carCondition
                  ) {
                    alert(
                      "Please fill in all the fields."
                    );
                    return;
                  }

                  const message = `Hello OlasDrive👋

I would like to list my car for sale.

SELLER INFORMATION
Name: ${sellerName}
Phone: ${sellerPhone}

CAR INFORMATION
Car: ${carName}
Year: ${carYear}
Price: ${carPrice}
Location: ${carLocation}

Condition:
${carCondition}

I would like to sell this vehicle through OlasDrive.`;

                  const yourWhatsAppNumber =
                    "2348065356943";

                  const whatsappLink =
                    `https://wa.me/${yourWhatsAppNumber}?text=` +
                    encodeURIComponent(message);

                  window.open(
                    whatsappLink,
                    "_blank"
                  );
                }}
              >
                Submit Listing via WhatsApp
              </button>
            </div>
          </section>
        )}

        {/* SIGN IN POPUP */}
        {showSignIn && (
          <div className="signin-overlay">
            <div className="signin-box">
              <button
                className="signin-close"
                onClick={() =>
                  setShowSignIn(false)
                }
              >
                ×
              </button>

              <div className="signin-header">
                <h2>
                  Welcome to OlasDrive
                </h2>

                <p>
                  Please sign in to continue.
                </p>
              </div>

              <input
                type="email"
                placeholder="Email address"
                value={signInEmail}
                onChange={(e) =>
                  setSignInEmail(e.target.value)
                }
              />

              <input
                type="password"
                placeholder="Password"
                value={signInPassword}
                onChange={(e) =>
                  setSignInPassword(e.target.value)
                }
              />

              <button
                className="signin-submit"
                onClick={handleSignIn}
              >
                Sign In
              </button>

              <p className="signin-note">
                Don't have an account?
                Registration coming soon.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer id="contact">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              Olas<span>Drive</span>
            </div>

            <p>
              Connecting buyers and sellers,
              one car at a time.
            </p>
          </div>

          <div className="footer-column">
            <h4>
              Marketplace
            </h4>

            <a
              href="#cars"
              onClick={(e) => {
                e.preventDefault();

                requireSignIn(() => {
                  document
                    .getElementById("cars")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                });
              }}
            >
              Buy a Car
            </a>

            <a
              href="#sell"
              onClick={(e) => {
                e.preventDefault();

                requireSignIn(() => {
                  document
                    .getElementById("sell")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                });
              }}
            >
              Sell a Car
            </a>

            <a
              href="#cars"
              onClick={(e) => {
                e.preventDefault();

                requireSignIn(() => {
                  document
                    .getElementById("cars")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                });
              }}
            >
              Featured Cars
            </a>
          </div>

          <div
            className="footer-column"
            id="about"
          >
            <h4>
              Company
            </h4>

            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();

                requireSignIn(() => {
                  document
                    .getElementById("about")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                });
              }}
            >
              About Us
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();

                requireSignIn(() => {
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                });
              }}
            >
              Contact
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();

                requireSignIn(() => {
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                });
              }}
            >
              FAQs
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © 2026 OlasDrive. All rights reserved.
          </p>

          <p>
            Built for the future of car buying and selling.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
 