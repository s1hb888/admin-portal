import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";

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

      {/* Dropdown Card */}
      <Card
        className="p-4 shadow-sm mb-4"
        style={{
          borderRadius: "14px",
          borderLeft: `8px solid ${green}`,
          backgroundColor: "#fff",
        }}
      >
        <Form.Group>
          <Form.Label
            style={{
              fontWeight: "bold",
              color: textDark,
              fontSize: "1.4rem",
              marginBottom: "12px",
            }}
          >
            Select Quiz Category
          </Form.Label>

          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              borderRadius: "12px",
              border: `2px solid ${yellow}`,
              padding: "14px",
              fontWeight: "500",
              fontSize: "1.2rem",
              color: textDark,
              backgroundColor: "#fff",
              transition: "border 0.3s, box-shadow 0.3s",
              cursor: "pointer",
            }}
            onFocus={(e) => (e.target.style.boxShadow = `0 0 10px ${green}`)}
            onBlur={(e) => (e.target.style.boxShadow = "none")}
          >
            <option value="">-- Choose Category --</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Card>

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

