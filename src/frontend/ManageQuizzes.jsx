import React, { useState } from "react";
import { Card } from "react-bootstrap";

import FruitQuizAdmin from "./FruitQuizAdmin";
import VegetableQuizAdmin from "./VegetableQuizAdmin";
import ColorQuizAdmin from "./ColorQuizAdmin";
import VowelQuizAdmin from "./VowelQuizAdmin";
import ShapeQuizAdmin from "./ShapeQuizAdmin";
import CountingQuizAdmin from "./CountingQuizAdmin";
import BodyPartsQuizAdmin from "./BodyPartsQuizAdmin";

// 🎨 Theme Colors
const red = "#EF3349";
const green = "#2BCB9A";
const yellow = "#FFCF25";
const textDark = "#222";
const textMuted = "#6c757d";

const categories = [
  "Fruit Quiz",
  "Vegetable Quiz",
  "Color Quiz",
  "Vowel Quiz",
  "Shape Quiz",
  "Counting Quiz",
  "Body Parts Quiz",
];

const ManageQuizzes = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const renderQuiz = () => {
    switch (selectedCategory) {
      case "Fruit Quiz":
        return <FruitQuizAdmin />;
      case "Vegetable Quiz":
        return <VegetableQuizAdmin />;
      case "Color Quiz":
        return <ColorQuizAdmin />;
      case "Vowel Quiz":
        return <VowelQuizAdmin />;
      case "Shape Quiz":
        return <ShapeQuizAdmin />;
      case "Counting Quiz":
        return <CountingQuizAdmin />;
      case "Body Parts Quiz":
        return <BodyPartsQuizAdmin />;
      default:
        return (
          <p style={{ color: textMuted, fontSize: "1.1rem" }}>
            Select a quiz category to manage.
          </p>
        );
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "1200px" }}>
      {/* Dashboard Header */}
      <h2
        style={{
          fontWeight: "900",
          fontSize: "3rem",
          textAlign: "center",
          marginBottom: "50px",
          color: green,
          letterSpacing: "1px",
          textShadow: "1px 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        Quiz Management Dashboard
      </h2>

      {/* Options as Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)", // 4 cards per row
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        {categories.map((cat, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            style={{
              borderRadius: "16px",
              padding: "1.5rem",
              backgroundColor: selectedCategory === cat ? green : "#fff",
              color: selectedCategory === cat ? "#fff" : textDark,
              fontWeight: "600",
              fontSize: "1.1rem",
              cursor: "pointer",
              textAlign: "center",
              boxShadow:
                selectedCategory === cat
                  ? "0 10px 20px rgba(0,0,0,0.15)"
                  : "0 2px 8px rgba(0,0,0,0.08)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = green)}
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                selectedCategory === cat ? green : "#fff")
            }
          >
            {cat}
          </div>
        ))}
      </div>

      {/* Render Quiz Card */}
      {selectedCategory && (
        <Card
          className="p-4 shadow-lg"
          style={{
            borderRadius: "14px",
            borderLeft: `8px solid ${yellow}`,
            backgroundColor: "#fff",
            transition: "transform 0.3s",
          }}
        >
          {renderQuiz()}
        </Card>
      )}
    </div>
  );
};

export default ManageQuizzes;
