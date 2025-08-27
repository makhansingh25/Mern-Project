import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/Auth";

const Newcar = () => {
  const [Property, setProperty] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [imageIndexes, setImageIndexes] = useState({});
  const [carCounts, setCarCounts] = useState({}); // Track count per car by id
  const { token } = useAuth();
  const getproperty = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${URL}/car/getcar`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "", // send Bearer token properly
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cars");
      }

      const data = await response.json();
      setProperty(data.car || []);

      // Initialize counts to zero for each car
      const initialCounts = {};
      (data.car || []).forEach((car) => {
        initialCounts[car._id] = 0;
      });
      setCarCounts(initialCounts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getproperty();
  }, []);

  useEffect(() => {
    const initialIndexes = {};
    Property.forEach((car) => {
      initialIndexes[car._id] = 0;
    });
    setImageIndexes(initialIndexes);
  }, [Property]);

  const handleNextImage = (carId, length) => {
    setImageIndexes((prev) => ({
      ...prev,
      [carId]: (prev[carId] + 1) % length,
    }));
  };

  const handlePrevImage = (carId, length) => {
    setImageIndexes((prev) => ({
      ...prev,
      [carId]: (prev[carId] - 1 + length) % length,
    }));
  };

  const incrementCount = (car) => {
    setCarCounts((prev) => {
      const newCount = (prev[car._id] || 0) + 1;
      setTotalPrice((total) => total + Number(car.price));
      return {
        ...prev,
        [car._id]: newCount,
      };
    });
  };

  const decrementCount = (car) => {
    setCarCounts((prev) => {
      const currentCount = prev[car._id] || 0;
      if (currentCount <= 0) return prev;
      const newCount = currentCount - 1;
      setTotalPrice((total) =>
        total - Number(car.price) >= 0 ? total - Number(car.price) : 0
      );
      return {
        ...prev,
        [car._id]: newCount,
      };
    });
  };

  return (
    <div>
      <style>
        {`
          .latest-container {
            background-color: #f3f4f6;
            padding: 2rem 1rem;
            min-height: 100vh;
          }

          .latestheading {
            text-align: center;
            font-size: 2rem;
            color: #3b82f6;
            margin-bottom: 2rem;
          }

          .property-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2rem;
          }

          .property-cards {
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
            overflow: hidden;
            transition: all 0.3s ease-in-out;
            display: flex;
            flex-direction: row;
            position: relative;
          }

          .property-cards:hover {
            transform: scale(1.02);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          }

          .property-images-container {
            width: 40%;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #e5e7eb;
          }

          .property-images {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            max-height: 250px;
          }

          .image-nav-buttons {
            position: absolute;
            bottom: 8px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
          }

          .image-nav-buttons button {
            background-color: rgba(0, 0, 0, 0.6);
            color: white;
            border: none;
            padding: 5px 10px;
            font-size: 1rem;
            cursor: pointer;
            border-radius: 4px;
            transition: background-color 0.3s ease;
          }

          .image-nav-buttons button:hover {
            background-color: rgba(0, 0, 0, 0.8);
          }

          .property-infos {
            padding: 1rem;
            width: 60%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .property-names {
            font-size: 1.25rem;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 0.5rem;
          }

          .prices {
            position: absolute;
            top: 10px;
            left: 10px;
            background-color: rgba(255, 255, 255, 0.9);
            padding: 4px 10px;
            border-radius: 10px;
            font-weight: bold;
            font-size: 1rem;
          }

          .price-controls {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin: 0.5rem 0;
          }

          .price-controls button {
            background-color: #3b82f6;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            cursor: pointer;
            font-size: 1rem;
            transition: background-color 0.3s ease;
          }

          .price-controls button:hover {
            background-color: #2563eb;
          }

          .total-section {
            margin-top: 0.5rem;
            font-weight: bold;
            color: #374151;
          }

          .detailbtn a {
            display: inline-block;
            margin-top: 0.5rem;
            text-decoration: none;
            background-color: #10b981;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            font-weight: 500;
            transition: background-color 0.3s ease;
          }

          .detailbtn a:hover {
            background-color: #059669;
          }
        `}
      </style>

      <div className="latest-container">
        <h3 className="latestheading">Latest Cars</h3>

        {Property.length === 0 ? (
          <p style={{ textAlign: "center", padding: "2rem", color: "#555" }}>
            No cars found.
          </p>
        ) : (
          <div className="property-content">
            {Property.map((car) => (
              <div className="property-cards" key={car._id}>
                <div className="property-images-container">
                  {car.image && car.image.length > 0 && (
                    <>
                      <img
                        src={`${import.meta.env.VITE_API_URL}/uploads/${
                          car.image[imageIndexes[car._id] || 0]
                        }`}
                        alt={car.name}
                        className="property-images"
                      />
                      {car.image.length > 1 && (
                        <div className="image-nav-buttons">
                          <button
                            onClick={() =>
                              handlePrevImage(car._id, car.image.length)
                            }
                          >
                            ‹
                          </button>

                          <button
                            onClick={() =>
                              handleNextImage(car._id, car.image.length)
                            }
                          >
                            ›
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <p className="prices">₹{car.price}</p>

                <div className="property-infos">
                  <h2 className="property-names">{car.name}</h2>

                  <div className="price-controls">
                    <button onClick={() => incrementCount(car)}>+</button>
                    <span>{carCounts[car._id] || 0}</span>
                    <button onClick={() => decrementCount(car)}>-</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          className="total-section"
          style={{ textAlign: "center", marginTop: "2rem" }}
        >
          Total Price: ₹{totalPrice}
        </div>
      </div>
    </div>
  );
};

export default Newcar;
